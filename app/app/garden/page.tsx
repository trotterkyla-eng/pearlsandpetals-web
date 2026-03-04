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
      <h1 className="font-serif text-4xl">The Garden</h1>
      <p className="mt-2 text-ink/70">
        Members-only content will live here.
      </p>
    </div>
  );
}
