"use client";

import { useEffect, useState } from "react";

export default function DiscreetToggle() {
  const [discreet, setDiscreet] = useState(false);

  useEffect(() => {
    setDiscreet(localStorage.getItem("pp_discreet") === "on");
  }, []);

  function toggle() {
    const next = !discreet;
    setDiscreet(next);
    localStorage.setItem("pp_discreet", next ? "on" : "off");
    window.location.reload();
  }

  return (
    <button
      onClick={toggle}
      className="rounded-full border border-pearl-200 bg-white/70 px-4 py-2 text-sm"
    >
      Discreet Mode: {discreet ? "On" : "Off"}
    </button>
  );
}
