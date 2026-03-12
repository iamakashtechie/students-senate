"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

// admin panel is fully client-side but protected by middleware
// authentication happens via http-only cookies
export default function AdminPage() {
  const [tab, setTab] = useState("notifications");
  const router = useRouter();

  async function handleLogout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  }

  // helper to pass to panels so they can intercept 401s if the session expires mid-edit
  function handleApiError(res) {
    if (res.status === 401) {
      router.push("/admin/login");
      router.refresh();
      return true;
    }
    return false;
  }

  return (
    <div className="min-h-screen pt-16 bg-cream">
      {/* admin topbar */}
      <div className="bg-primary text-cream px-8 py-4 flex items-center justify-between border-b-4 border-primary-dark">
        <div>
          <h1 className="font-display font-black text-xl uppercase tracking-widest">Admin Panel</h1>
          <p className="font-body text-xs font-bold text-cream/70 uppercase tracking-widest mt-1">
            Students&apos; Senate, IIEST Shibpur
          </p>
        </div>
        <button
          onClick={handleLogout}
          className="font-display font-bold text-xs uppercase tracking-widest text-primary bg-accent hover:bg-cream transition-colors border-2 border-primary px-4 py-2 shadow-[2px_2px_0_0_#111] hover:shadow-[1px_1px_0_0_#111] hover:translate-y-[1px] hover:translate-x-[1px]"
        >
          Logout
        </button>
      </div>

      {/* tabs */}
      <div className="border-b-4 border-primary bg-primary sticky top-16 z-40 shadow-[0_4px_0_0_#111]">
        <div className="max-w-6xl mx-auto px-8 flex gap-2 pt-2">
          {[
            { id: "notifications", label: "Notifications" },
            { id: "resolution", label: "Resolution" },
            { id: "members", label: "Members" },
          ].map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`font-display text-sm font-bold uppercase tracking-widest px-6 py-3 border-t-2 border-l-2 border-r-2 border-b-0 transition-colors ${
                tab === t.id
                  ? "bg-cream text-primary border-primary"
                  : "bg-primary text-cream border-transparent hover:bg-primary-light"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {/* tab content */}
      <div className="max-w-6xl mx-auto px-8 py-10">
        {tab === "notifications" && <NotificationsPanel onApiError={handleApiError} />}
        {tab === "resolution" && <ResolutionPanel onApiError={handleApiError} />}
        {tab === "members" && <MembersPanel onApiError={handleApiError} />}
      </div>
    </div>
  );
}

/* notifications management panel */
function NotificationsPanel({ onApiError }) {
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
      body: fd,
    });

    if (onApiError(res)) return;

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
    });
    
    if (onApiError(res)) return;
    
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
            <label className="admin-label" htmlFor="notif-title">Title *</label>
            <input
              id="notif-title"
              className="admin-input"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              required
            />
          </div>
          <div>
            <label className="admin-label" htmlFor="notif-date">Date *</label>
            <input
              id="notif-date"
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
            <label className="admin-label" htmlFor="notif-desc">Description</label>
            <textarea
              id="notif-desc"
              className="admin-input h-24 resize-none"
              value={form.description}
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
            />
          </div>
          <div className="md:col-span-2">
            <label className="admin-label" htmlFor="notif-files">Attachments (PDF or image)</label>
            <input
              id="notif-files"
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
function ResolutionPanel({ onApiError }) {
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
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text, year }),
    });
    
    if (onApiError(res)) return;
    
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
          <label className="block font-body text-xs text-primary/50 uppercase tracking-wide mb-1" htmlFor="res-year">
            Academic Year
          </label>
          <input
            id="res-year"
            className="w-full border border-secondary px-3 py-2 font-body text-sm text-primary bg-cream focus:outline-none focus:border-primary"
            value={year}
            onChange={(e) => setYear(e.target.value)}
          />
        </div>
        <div>
          <label className="block font-body text-xs text-primary/50 uppercase tracking-wide mb-1" htmlFor="res-text">
            Resolution Text
          </label>
          <textarea
            id="res-text"
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
function MembersPanel({ onApiError }) {
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
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...form, section }),
    });
    
    if (onApiError(res)) return;
    
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
    });
    
    if (onApiError(res)) return;
    
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
            <label className="admin-label" htmlFor="member-section">Section</label>
            <select
              id="member-section"
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
            <label className="admin-label" htmlFor="member-name">Full Name *</label>
            <input
              id="member-name"
              className="admin-input"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
            />
          </div>
          <div>
            <label className="admin-label" htmlFor="member-roll">Roll No.</label>
            <input
              id="member-roll"
              className="admin-input"
              value={form.rollNo}
              onChange={(e) => setForm({ ...form, rollNo: e.target.value })}
            />
          </div>
          <div>
            <label className="admin-label" htmlFor="member-role">Role / Post</label>
            <input
              id="member-role"
              className="admin-input"
              value={form.role}
              onChange={(e) => setForm({ ...form, role: e.target.value })}
            />
          </div>
          <div>
            <label className="admin-label" htmlFor="member-dept">Department / Unit *</label>
            <input
              id="member-dept"
              className="admin-input"
              value={form.department}
              onChange={(e) => setForm({ ...form, department: e.target.value })}
              required
            />
          </div>
          <div>
            <label className="admin-label" htmlFor="member-year">Year</label>
            <input
              id="member-year"
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
