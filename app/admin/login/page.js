"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

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
        setError(data.error || "incorrect password.");
        return;
      }
      
      // on success, hard redirect to bypass Next.js client route cache
      window.location.href = "/admin";
      
    } catch {
      setError("network error, try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-cream px-6">
      <div className="w-full max-w-md p-8 md:p-12 bg-cream border-4 border-primary shadow-[12px_12px_0_0_#111]">
        <h1 className="font-display text-4xl font-black text-primary mb-2 uppercase tracking-tighter">
          Admin Login
        </h1>
        <p className="font-body text-sm text-primary/70 mb-10 font-bold uppercase tracking-widest border-l-4 border-accent pl-4">
          Students&apos; Senate, IIEST Shibpur
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="font-display font-bold text-sm text-primary uppercase tracking-widest block mb-2">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border-2 border-primary px-3 py-3 font-body text-base text-primary bg-primary/5 focus:outline-none focus:border-accent focus:bg-cream transition-colors shadow-[4px_4px_0_0_#111] focus:shadow-[2px_2px_0_0_#111] focus:translate-y-[2px] focus:translate-x-[2px]"
              placeholder="enter admin password"
              required
            />
          </div>
          
          {error && (
            <div className="bg-accent text-primary font-display font-bold text-sm uppercase tracking-widest px-4 py-2 border-2 border-primary">
              {error}
            </div>
          )}
          
          <button
            type="submit"
            disabled={loading}
            className="w-full btn-primary disabled:opacity-50 text-lg mt-4"
          >
            {loading ? "verifying..." : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  );
}
