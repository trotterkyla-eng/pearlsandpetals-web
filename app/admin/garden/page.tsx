"use client";

import { useState } from "react";

export default function GardenAdminPage() {
  const [name, setName] = useState("");
  const [link, setLink] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

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
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main style={{ padding: 40 }}>
      <h1>Garden Keeper</h1>
      <p>Create a private invitation link for a guest.</p>

      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Guest name"
        style={{ padding: 10, width: 250 }}
      />

      <br />
      <br />

      <button onClick={createInvite} disabled={loading}>
        {loading ? "Creating..." : "Create Invite"}
      </button>

      {link && (
        <>
          <p>Invite link:</p>
          <a href={link}>{link}</a>
        </>
      )}

      {error && <p style={{ color: "red" }}>{error}</p>}
    </main>
  );
}
