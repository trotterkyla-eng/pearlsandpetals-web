"use client";

import { useEffect, useState } from "react";

export default function AppSplash() {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setShow(false), 1500); // 1.5s splash
    return () => clearTimeout(t);
  }, []);

  if (!show) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-pearl-50">
      <div className="text-center">
        <div className="mx-auto h-24 w-24 rounded-full border border-pearl-200 bg-white/70 shadow-soft flex items-center justify-center">
          {/* replace with your crest image later if you want */}
          <span className="font-serif text-3xl text-ink">P</span>
        </div>
        <div className="mt-4 text-xs tracking-[0.3em] uppercase text-ink/60">
          Pearls & Petals
        </div>
      </div>
    </div>
  );
}
