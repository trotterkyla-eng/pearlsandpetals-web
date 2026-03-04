import DiscreetToggle from "@/components/DiscreetToggle";
"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function GardenHome() {
  const router = useRouter();

  useEffect(() => {
    const ok = localStorage.getItem("pp_access") === "granted";
    if (!ok) router.replace("/gate");
  }, [router]);

 return (
  <div className="min-h-screen bg-pearl-50 p-8">
    <div className="flex items-center justify-between">
      <h1 className="font-serif text-4xl">The Garden</h1>
      <DiscreetToggle />
    </div>

    <DiscreetContent />
  </div>
);

function DiscreetContent() {
  const discreet =
    typeof window !== "undefined" && localStorage.getItem("pp_discreet") === "on";

  if (discreet) {
    return (
      <div className="mt-6 rounded-2xl border border-pearl-100 bg-white/70 p-6 shadow-soft">
        <div className="text-xs tracking-[0.3em] uppercase text-ink/60">
          Daily Ritual
        </div>
        <h2 className="mt-2 font-serif text-2xl">Pearl Warm</h2>
        <p className="mt-2 text-ink/70">
          A calm space for notes, resources, and gentle routines.
        </p>
      </div>
    );
  }

  return (
    <div className="mt-6 rounded-2xl border border-pearl-100 bg-white/70 p-6 shadow-soft">
      <div className="text-xs tracking-[0.3em] uppercase text-ink/60">
        Members Area
      </div>
      <h2 className="mt-2 font-serif text-2xl">Resources + Chapters</h2>
      <p className="mt-2 text-ink/70">
        SOS, referrals, events, and private guidance will live here.
      </p>
    </div>
  );
}
