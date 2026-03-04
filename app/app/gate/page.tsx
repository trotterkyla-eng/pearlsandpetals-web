"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function GatePage() {
  const router = useRouter();
  const [code, setCode] = useState("");

  useEffect(() => {
    const ok = localStorage.getItem("pp_access") === "granted";
    if (ok) router.replace("/garden");
  }, [router]);

  function submit() {
    // temporary: simple code gate (we’ll upgrade to real auth next)
    if (code.trim().toLowerCase() === "pearlpink") {
      localStorage.setItem("pp_access", "granted");
      router.push("/garden");
    } else {
      alert("Access code not recognized.");
    }
  }

  return (
    <div className="min-h-screen bg-pearl-50 flex items-center justify-center p-6">
      <div className="w-full max-w-md rounded-2xl border border-pearl-100 bg-white/80 p-6 shadow-soft">
        <h1 className="font-serif text-3xl">Enter the Garden</h1>
        <p className="mt-2 text-ink/70">
          This space is invitation-only.
        </p>

        <input
          className="mt-4 w-full rounded-xl border border-pearl-200 bg-white p-3"
          placeholder="Access code"
          value={code}
          onChange={(e) => setCode(e.target.value)}
        />

        <button
          className="mt-4 w-full rounded-full bg-rose-500 py-3 text-white"
          onClick={submit}
        >
          Continue
        </button>

        <p className="mt-3 text-xs text-ink/60">
          (We’ll replace this with real sign-in + Stripe membership next.)
        </p>
      </div>
    </div>
  );
}
