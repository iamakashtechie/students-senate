"use client";

import { useState, useEffect } from "react";

// admin panel is fully client-side
// authentication: password -> receive api key -> stored in sessionStorage
export default function AdminPage() {
  const [key, setKey] = useState(null);
  const [tab, setTab] = useState("notifications");

  // rehydrate session key on mount (client-only)
  useEffect(() => {
    const stored = sessionStorage.getItem("admin_key");
    if (stored) setKey(stored);
  }, []);

  // invalidate session on tab/browser close
  useEffect(() => {
    const handleUnload = () => {
      const k = sessionStorage.getItem("admin_key");
      if (k) {
        navigator.sendBeacon(
          "/api/admin/logout",
          new Blob([JSON.stringify({ token: k })], {
            type: "application/json",
          }),
        );
      }
    };
    window.addEventListener("beforeunload", handleUnload);
    return () => window.removeEventListener("beforeunload", handleUnload);
  }, []);

  async function handleLogout() {
    const k = sessionStorage.getItem("admin_key");
    if (k) {
      await fetch("/api/admin/logout", {
        method: "POST",
        headers: { "x-admin-key": k },
      });
    }
    sessionStorage.removeItem("admin_key");
    setKey(null);
  }

  if (!key) {
    return (
      <LoginGate
        onLogin={(k) => {
          setKey(k);
          sessionStorage.setItem("admin_key", k);
        }}
      />
    );
  }

  return (
    <div className="min-h-screen pt-16 bg-cream">
      {/* admin topbar */}
      <div className="bg-primary text-cream px-8 py-4 flex items-center justify-between">
        <div>
          <h1 className="font-display font-bold text-lg">Admin Panel</h1>
          <p className="font-body text-xs text-cream/50">
            Students&apos; Senate, IIEST Shibpur
          </p>
        </div>
        <button
          onClick={handleLogout}
          className="font-body text-xs text-cream/60 hover:text-accent transition-colors border border-cream/20 px-3 py-1.5"
        >
          Logout
        </button>
      </div>

      {/* tabs */}
      <div className="border-b border-secondary bg-cream sticky top-16 z-40">
        <div className="max-w-6xl mx-auto px-8 flex gap-0">
          {[
            { id: "notifications", label: "Notifications" },
            { id: "resolution", label: "Resolution" },
            { id: "members", label: "Members" },
          ].map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`font-body text-sm font-medium px-5 py-4 border-b-2 transition-colors ${
                tab === t.id
                  ? "border-accent text-accent"
                  : "border-transparent text-primary/50 hover:text-primary"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {/* tab content */}
      <div className="max-w-6xl mx-auto px-8 py-10">
        {tab === "notifications" && <NotificationsPanel adminKey={key} />}
        {tab === "resolution" && <ResolutionPanel adminKey={key} />}
        {tab === "members" && <MembersPanel adminKey={key} />}
      </div>
    </div>
  );
}

/* login gate */
function LoginGate({ onLogin }) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError("incorrect password.");
        return;
      }
      onLogin(data.key);
    } catch {
      setError("network error, try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-cream pt-16">
      <div className="w-full max-w-sm px-8 py-10 bg-white border border-secondary">
        <h1 className="font-display text-2xl font-bold text-primary mb-1">
          Admin Login
        </h1>
        <p className="font-body text-xs text-primary/50 mb-8">
          Students&apos; Senate, IIEST Shibpur
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="font-body text-xs text-primary/60 uppercase tracking-wide block mb-1">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-secondary px-3 py-2 font-body text-sm text-primary bg-cream focus:outline-none focus:border-primary"
              placeholder="enter admin password"
            />
          </div>
          {error && <p className="font-body text-xs text-accent">{error}</p>}
          <button
            type="submit"
            disabled={loading}
            className="w-full btn-primary disabled:opacity-50"
          >
            {loading ? "verifying..." : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  );
}

/* notifications management panel */
function NotificationsPanel({ adminKey }) {
  const [notifications, setNotifications] = useState([]);
  const [form, setForm] = useState({
    title: "",
    description: "",
    date: "",
    important: false,
  });
  const [files, setFiles] = useState([]);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState("");

  useEffect(() => {
    fetch("/api/notifications")
      .then((r) => r.json())
      .then((data) => setNotifications(data));
  }, []);

  async function loadNotifications() {
    const res = await fetch("/api/notifications");
    const data = await res.json();
    setNotifications(data);
  }

  async function handleAdd(e) {
    e.preventDefault();
    setSaving(true);
    setMsg("");

    const fd = new FormData();
    fd.append("title", form.title);
    fd.append("description", form.description);
    fd.append("date", form.date);
    fd.append("important", form.important.toString());
    files.forEach((f) => fd.append("files", f));

    const res = await fetch("/api/notifications", {
      method: "POST",
      headers: { "x-admin-key": adminKey },
      body: fd,
    });

    if (res.ok) {
      setMsg("notification added.");
      setForm({ title: "", description: "", date: "", important: false });
      setFiles([]);
      loadNotifications();
    } else {
      setMsg("failed to add notification.");
    }
    setSaving(false);
  }

  async function handleDelete(id) {
    if (!confirm("delete this notification?")) return;
    const res = await fetch(`/api/notifications/${id}`, {
      method: "DELETE",
      headers: { "x-admin-key": adminKey },
    });
    if (!res.ok) {
      setMsg("failed to delete notification.");
      return;
    }
    loadNotifications();
  }

  return (
    <div className="space-y-10">
      {/* add form */}
      <div>
        <h2 className="font-display text-2xl font-bold text-primary mb-6">
          Add Notification
        </h2>
        <form
          onSubmit={handleAdd}
          className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl"
        >
          <div className="md:col-span-2">
            <label className="admin-label">Title *</label>
            <input
              className="admin-input"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              required
            />
          </div>
          <div>
            <label className="admin-label">Date *</label>
            <input
              type="date"
              className="admin-input"
              value={form.date}
              onChange={(e) => setForm({ ...form, date: e.target.value })}
              required
            />
          </div>
          <div className="flex items-end gap-2">
            <label className="flex items-center gap-2 font-body text-sm text-primary cursor-pointer">
              <input
                type="checkbox"
                checked={form.important}
                onChange={(e) =>
                  setForm({ ...form, important: e.target.checked })
                }
                className="accent-accent"
              />
              Mark as Important
            </label>
          </div>
          <div className="md:col-span-2">
            <label className="admin-label">Description</label>
            <textarea
              className="admin-input h-24 resize-none"
              value={form.description}
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
            />
          </div>
          <div className="md:col-span-2">
            <label className="admin-label">Attachments (PDF or image)</label>
            <input
              type="file"
              multiple
              accept=".pdf,image/*"
              onChange={(e) => setFiles(Array.from(e.target.files))}
              className="font-body text-sm text-primary/70 file:mr-3 file:py-1 file:px-3 file:border file:border-primary/30 file:text-xs file:font-body file:text-primary file:bg-transparent file:cursor-pointer"
            />
            {files.length > 0 && (
              <p className="font-body text-xs text-primary/50 mt-1">
                {files.length} file(s) selected
              </p>
            )}
          </div>
          <div className="md:col-span-2 flex items-center gap-4">
            <button
              type="submit"
              disabled={saving}
              className="btn-primary disabled:opacity-50"
            >
              {saving ? "saving..." : "Add Notification"}
            </button>
            {msg && <p className="font-body text-xs text-accent">{msg}</p>}
          </div>
        </form>
      </div>

      {/* existing notifications */}
      <div>
        <h2 className="font-display text-2xl font-bold text-primary mb-6">
          Existing Notifications
        </h2>
        {notifications.length === 0 && (
          <p className="font-body text-sm text-primary/40">
            no notifications yet.
          </p>
        )}
        <div className="space-y-3 max-w-2xl">
          {notifications.map((n) => (
            <div
              key={n.id}
              className={`flex items-start justify-between gap-4 p-4 border ${
                n.important
                  ? "border-l-4 border-l-accent border-secondary"
                  : "border-secondary"
              } bg-cream`}
            >
              <div className="flex-1 min-w-0">
                <p className="font-body text-sm font-medium text-primary truncate">
                  {n.title}
                </p>
                <p className="font-body text-xs text-primary/40 mt-0.5">
                  {n.date}
                </p>
                {n.attachments?.length > 0 && (
                  <p className="font-body text-xs text-secondary mt-1">
                    {n.attachments.length} attachment(s)
                  </p>
                )}
              </div>
              <button
                onClick={() => handleDelete(n.id)}
                className="font-body text-xs text-accent hover:underline shrink-0 mt-0.5"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}

/* resolution management panel */
function ResolutionPanel({ adminKey }) {
  const [text, setText] = useState("");
  const [year, setYear] = useState("2025-26");
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState("");

  useEffect(() => {
    fetch("/api/resolution")
      .then((r) => r.json())
      .then((d) => {
        setText(d.text);
        setYear(d.year);
      });
  }, []);

  async function handleSave(e) {
    e.preventDefault();
    setSaving(true);
    setMsg("");
    const res = await fetch("/api/resolution", {
      method: "PUT",
      headers: { "Content-Type": "application/json", "x-admin-key": adminKey },
      body: JSON.stringify({ text, year }),
    });
    setMsg(res.ok ? "resolution updated." : "failed to update.");
    setSaving(false);
  }

  return (
    <div className="max-w-2xl">
      <h2 className="font-display text-2xl font-bold text-primary mb-6">
        Edit Resolution
      </h2>
      <form onSubmit={handleSave} className="space-y-4">
        <div>
          <label className="block font-body text-xs text-primary/50 uppercase tracking-wide mb-1">
            Academic Year
          </label>
          <input
            className="w-full border border-secondary px-3 py-2 font-body text-sm text-primary bg-cream focus:outline-none focus:border-primary"
            value={year}
            onChange={(e) => setYear(e.target.value)}
          />
        </div>
        <div>
          <label className="block font-body text-xs text-primary/50 uppercase tracking-wide mb-1">
            Resolution Text
          </label>
          <textarea
            className="w-full border border-secondary px-3 py-2 font-body text-sm text-primary bg-cream focus:outline-none focus:border-primary h-48 resize-none"
            value={text}
            onChange={(e) => setText(e.target.value)}
            required
          />
        </div>
        <div className="flex items-center gap-4">
          <button
            type="submit"
            disabled={saving}
            className="btn-primary disabled:opacity-50"
          >
            {saving ? "saving..." : "Save Resolution"}
          </button>
          {msg && <p className="font-body text-xs text-accent">{msg}</p>}
        </div>
      </form>
    </div>
  );
}

/* members management panel */
function MembersPanel({ adminKey }) {
  const [members, setMembers] = useState({
    professors: [],
    executiveSecretariat: [],
    generalCouncil: [],
  });
  const [section, setSection] = useState("generalCouncil");
  const [form, setForm] = useState({
    name: "",
    rollNo: "",
    role: "",
    department: "",
    year: "",
  });
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState("");

  useEffect(() => {
    fetch("/api/members")
      .then((r) => r.json())
      .then((data) => setMembers(data));
  }, []);

  async function loadMembers() {
    const res = await fetch("/api/members");
    const data = await res.json();
    setMembers(data);
  }

  async function handleAdd(e) {
    e.preventDefault();
    setSaving(true);
    setMsg("");
    const res = await fetch("/api/members", {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-admin-key": adminKey },
      body: JSON.stringify({ ...form, section }),
    });
    if (res.ok) {
      setMsg("member added.");
      setForm({ name: "", rollNo: "", role: "", department: "", year: "" });
      loadMembers();
    } else {
      setMsg("failed to add member.");
    }
    setSaving(false);
  }

  async function handleDelete(id) {
    if (!confirm("remove this member?")) return;
    const res = await fetch(`/api/members/${id}`, {
      method: "DELETE",
      headers: { "x-admin-key": adminKey },
    });
    if (!res.ok) {
      setMsg("failed to remove member.");
      return;
    }
    loadMembers();
  }

  // all members flat list for display
  const allMembers = [
    ...members.professors.map((m) => ({ ...m, _section: "professors" })),
    ...members.executiveSecretariat.map((m) => ({
      ...m,
      _section: "executiveSecretariat",
    })),
    ...members.generalCouncil.map((m) => ({
      ...m,
      _section: "generalCouncil",
    })),
  ];

  const sectionLabels = {
    professors: "Professor",
    executiveSecretariat: "Executive Secretariat",
    generalCouncil: "General Council",
  };

  return (
    <div className="space-y-10">
      {/* add form */}
      <div>
        <h2 className="font-display text-2xl font-bold text-primary mb-6">
          Add Member
        </h2>
        <form
          onSubmit={handleAdd}
          className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl"
        >
          <div>
            <label className="admin-label">Section</label>
            <select
              className="admin-input"
              value={section}
              onChange={(e) => setSection(e.target.value)}
            >
              <option value="generalCouncil">General Council</option>
              <option value="executiveSecretariat">
                Executive Secretariat
              </option>
              <option value="professors">Professors</option>
            </select>
          </div>
          <div>
            <label className="admin-label">Full Name *</label>
            <input
              className="admin-input"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
            />
          </div>
          <div>
            <label className="admin-label">Roll No.</label>
            <input
              className="admin-input"
              value={form.rollNo}
              onChange={(e) => setForm({ ...form, rollNo: e.target.value })}
            />
          </div>
          <div>
            <label className="admin-label">Role / Post</label>
            <input
              className="admin-input"
              value={form.role}
              onChange={(e) => setForm({ ...form, role: e.target.value })}
            />
          </div>
          <div>
            <label className="admin-label">Department / Unit *</label>
            <input
              className="admin-input"
              value={form.department}
              onChange={(e) => setForm({ ...form, department: e.target.value })}
              required
            />
          </div>
          <div>
            <label className="admin-label">Year</label>
            <input
              className="admin-input"
              placeholder="e.g. 3rd Year UG"
              value={form.year}
              onChange={(e) => setForm({ ...form, year: e.target.value })}
            />
          </div>
          <div className="md:col-span-2 flex items-center gap-4">
            <button
              type="submit"
              disabled={saving}
              className="btn-primary disabled:opacity-50"
            >
              {saving ? "saving..." : "Add Member"}
            </button>
            {msg && <p className="font-body text-xs text-accent">{msg}</p>}
          </div>
        </form>
      </div>

      {/* existing members */}
      <div>
        <h2 className="font-display text-2xl font-bold text-primary mb-6">
          All Members
        </h2>
        <div className="space-y-2 max-w-2xl">
          {allMembers.map((m) => (
            <div
              key={m.id}
              className="flex items-center justify-between gap-4 p-3 border border-secondary bg-cream"
            >
              <div className="flex-1 min-w-0">
                <p className="font-body text-sm font-medium text-primary truncate">
                  {m.name}
                </p>
                <p className="font-body text-xs text-primary/40">
                  {sectionLabels[m._section]} &mdash; {m.department}
                </p>
              </div>
              <button
                onClick={() => handleDelete(m.id)}
                className="font-body text-xs text-accent hover:underline shrink-0"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
