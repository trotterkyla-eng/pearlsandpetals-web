"use client";

import { useState } from "react";

export default function GardenAdminPage() {
  const [name, setName] = useState("");
  const [link, setLink] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function createInvite() {
    setLoading(true);
    setError("");
    setLink("");

    try {
      const res = await fetch("/api/invites/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to create invite");
      }

      setLink(data.link);
      setName("");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="mx-auto max-w-2xl px-6 py-12">
      <h1 className="text-4xl font-serif text-ink">Garden Keeper</h1>
      <p className="mt-3 text-ink/70">
        Create a private invitation link for a guest.
      </p>

      <div className="mt-8 rounded-2xl border border-rose-100 bg-white/70 p-6">
        <label className="block text-sm text-ink/70">Guest name</label>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="First Guest"
          className="mt-2 w-full rounded-xl border border-rose-100 px-4 py-3 outline-none"
        />

        <button
          onClick={createInvite}
          disabled={loading}
          className="btn-primary mt-4"
        >
          {loading ? "Creating..." : "Create Invite"}
        </button>

        {error ? (
          <p className="mt-4 text-sm text-red-600">{error}</p>
        ) : null}

        {link ? (
          <div className="mt-6 rounded-xl border border-rose-100 bg-rose-50/60 p-4">
            <p className="text-sm text-ink/70">Invite link</p>
            <p className="mt-2 break-all text-ink">{link}</p>
          </div>
        ) : null}
      </div>
    </main>
  );
}
