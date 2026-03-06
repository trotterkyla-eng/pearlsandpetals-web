"use client";

import { useState } from "react";

export default function SignupForm({ token }: { token: string }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const res = await fetch("/api/invites/accept", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          token,
          email,
          password,
          fullName,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setMessage(data.error || "Something went wrong.");
        setLoading(false);
        return;
      }

      window.location.href = "/garden";
    } catch {
      setMessage("Unable to create your account right now.");
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label className="mb-2 block text-sm text-ink/70">Full name</label>
        <input
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          className="w-full rounded-2xl border border-rose-100 px-4 py-3 outline-none"
          placeholder="Your full name"
          required
        />
      </div>

      <div>
        <label className="mb-2 block text-sm text-ink/70">Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full rounded-2xl border border-rose-100 px-4 py-3 outline-none"
          placeholder="you@example.com"
          required
        />
      </div>

      <div>
        <label className="mb-2 block text-sm text-ink/70">Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full rounded-2xl border border-rose-100 px-4 py-3 outline-none"
          placeholder="Create a password"
          required
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="rounded-full bg-rose-600 px-6 py-3 text-white disabled:opacity-60"
      >
        {loading ? "Creating account..." : "Enter the Garden"}
      </button>

      {message ? <p className="text-sm text-rose-600">{message}</p> : null}
    </form>
  );
}
