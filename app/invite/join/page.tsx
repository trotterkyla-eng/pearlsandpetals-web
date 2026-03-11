"use client";

import { useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

const GOLD = "#b8965a";
const GOLD_LIGHT = "#d4b07a";
const BARK = "#6b4c3b";
const BLUSH = "#f2ddd5";
const DUSTY = "#c8a5a5";
const CREAM = "#fdf6f0";

type Step = 1 | 2 | 3 | 4;

interface FormData {
  displayName: string;
  email: string;
  password: string;
  phone: string;
  city: string;
  bio: string;
  skills: string;
  sponsorName: string;
  draws: string;
  season: string;
}

const empty: FormData = {
  displayName: "",
  email: "",
  password: "",
  phone: "",
  city: "",
  bio: "",
  skills: "",
  sponsorName: "",
  draws: "",
  season: "",
};

function ProgressDots({ step }: { step: Step }) {
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, marginBottom: 28 }}>
      {([1, 2, 3] as const).map((s) => (
        <div
          key={s}
          style={{
            width: step === s ? 24 : 8,
            height: 8,
            borderRadius: 4,
            background: step > s ? GOLD : step === s ? GOLD : "rgba(184,150,90,0.2)",
            transition: "all 0.4s ease",
          }}
        />
      ))}
    </div>
  );
}

function Label({ children }: { children: React.ReactNode }) {
  return (
    <label style={{
      display: "block", fontSize: 10, letterSpacing: "0.18em",
      textTransform: "uppercase" as const, color: DUSTY,
      fontFamily: "Cinzel, serif", marginBottom: 6,
    }}>
      {children}
    </label>
  );
}

function Input({ type = "text", value, onChange, placeholder }: {
  type?: string; value: string; onChange: (v: string) => void; placeholder?: string;
}) {
  return (
    <input type={type} value={value} onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      style={{
        width: "100%", padding: "10px 14px", borderRadius: 12,
        border: "1px solid rgba(184,150,90,0.25)",
        background: "rgba(253,246,240,0.7)", color: BARK,
        fontSize: 14, fontFamily: "Cormorant Garamond, serif",
        outline: "none", boxSizing: "border-box" as const,
      }}
    />
  );
}

function Textarea({ value, onChange, placeholder, rows = 3 }: {
  value: string; onChange: (v: string) => void; placeholder?: string; rows?: number;
}) {
  return (
    <textarea value={value} onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder} rows={rows}
      style={{
        width: "100%", padding: "10px 14px", borderRadius: 12,
        border: "1px solid rgba(184,150,90,0.25)",
        background: "rgba(253,246,240,0.7)", color: BARK,
        fontSize: 14, fontFamily: "Cormorant Garamond, serif",
        outline: "none", resize: "none" as const, boxSizing: "border-box" as const,
      }}
    />
  );
}

function GoldButton({ onClick, children, disabled }: {
  onClick: () => void; children: React.ReactNode; disabled?: boolean;
}) {
  return (
    <button onClick={onClick} disabled={disabled} style={{
      width: "100%", padding: "14px 24px", borderRadius: 99, border: "none",
      background: disabled ? "rgba(184,150,90,0.3)" : `linear-gradient(135deg, ${GOLD}, ${GOLD_LIGHT}, ${GOLD})`,
      color: "white", fontSize: 11, letterSpacing: "0.18em",
      textTransform: "uppercase" as const, fontFamily: "Cinzel, serif",
      cursor: disabled ? "not-allowed" : "pointer",
      boxShadow: disabled ? "none" : "0 4px 16px rgba(184,150,90,0.3)",
      transition: "all 0.2s ease",
    }}>
      {children}
    </button>
  );
}

function GhostButton({ onClick, children }: { onClick: () => void; children: React.ReactNode }) {
  return (
    <button onClick={onClick} style={{
      width: "100%", padding: "12px 24px", borderRadius: 99,
      border: "1px solid rgba(184,150,90,0.3)", background: "transparent",
      color: DUSTY, fontSize: 11, letterSpacing: "0.18em",
      textTransform: "uppercase" as const, fontFamily: "Cinzel, serif",
      cursor: "pointer", marginTop: 10,
    }}>
      {children}
    </button>
  );
}

function Divider() {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 12, margin: "16px 0" }}>
      <span style={{ flex: 1, height: 1, background: "linear-gradient(to right, transparent, rgba(184,150,90,0.3))" }} />
      <span style={{ color: "rgba(184,150,90,0.4)", fontSize: 10 }}>✦</span>
      <span style={{ flex: 1, height: 1, background: "linear-gradient(to left, transparent, rgba(184,150,90,0.3))" }} />
    </div>
  );
}

function JoinForm() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get("token") ?? "";

  const [step, setStep] = useState<Step>(1);
  const [form, setForm] = useState<FormData>(empty);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const set = (field: keyof FormData) => (v: string) =>
    setForm((f) => ({ ...f, [field]: v }));

  const cardStyle = {
    background: "linear-gradient(145deg, rgba(255,255,255,0.92), rgba(242,221,213,0.75))",
    border: "1px solid rgba(184,150,90,0.25)",
    boxShadow: "0 8px 40px rgba(107,76,59,0.08), inset 0 1px 0 rgba(255,255,255,0.8)",
    borderRadius: 20,
    padding: "32px 28px",
    position: "relative" as const,
  };

  async function handleSubmit() {
    setLoading(true);
    setError("");
    try {
      const { count } = await supabase
        .from("members")
        .select("*", { count: "exact", head: true });

      if ((count ?? 0) >= 50) {
        setError("The garden has reached its capacity for this chapter.");
        setLoading(false);
        return;
      }

      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: form.email,
        password: form.password,
      });

      if (authError) throw authError;

      const ring = (count ?? 0) < 25 ? "middle" : "outer";

      const { error: memberError } = await supabase.from("members").insert({
        display_name: form.displayName,
        email: form.email,
        phone: form.phone,
        city: form.city,
        bio: form.bio,
        skills: form.skills,
        ring,
        status: "pending",
        auth_user_id: authData.user?.id,
        admin_notes: JSON.stringify({
          sponsor: form.sponsorName,
          draws: form.draws,
          season: form.season,
          token,
        }),
      });

      if (memberError) throw memberError;

      router.push("/invite/welcome");
    } catch (e: any) {
      setError(e.message ?? "Something went wrong. Please try again.");
    }
    setLoading(false);
  }

  const titles: Record<Step, [string, string]> = {
    1: ["Your Bloom Begins", "Create your account"],
    2: ["Tell Us About You", "Help us know your heart"],
    3: ["Your Application", "Speak freely, sister"],
    4: ["Review & Submit", "Almost home"],
  };

  return (
    <main style={{
      minHeight: "100vh", display: "flex", alignItems: "center",
      justifyContent: "center", padding: "32px 20px",
      background: `linear-gradient(135deg, ${CREAM} 0%, ${BLUSH} 50%, ${CREAM} 100%)`,
      position: "relative", overflow: "hidden",
    }}>
      {/* Ambient sparkles */}
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
        {[...Array(12)].map((_, i) => (
          <span key={i} style={{
            position: "absolute", width: 4, height: 4, borderRadius: "50%",
            background: "rgba(184,150,90,0.25)",
            left: `${(i * 23 + 7) % 100}%`,
            top: `${(i * 17 + 11) % 100}%`,
          }} />
        ))}
      </div>

      <div style={{ width: "100%", maxWidth: 400, position: "relative", zIndex: 10 }}>
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: 24 }}>
          <p style={{ fontFamily: "Cinzel, serif", fontSize: 10, letterSpacing: "0.25em", textTransform: "uppercase" as const, color: GOLD, marginBottom: 6 }}>
            Pearls &amp; Petals
          </p>
          <h1 style={{ fontFamily: "Cinzel, serif", fontSize: 22, color: BARK, letterSpacing: "0.06em", fontWeight: 400, marginBottom: 4 }}>
            {titles[step][0]}
          </h1>
          <p style={{ fontFamily: "Cormorant Garamond, serif", fontSize: 14, color: DUSTY, fontStyle: "italic" }}>
            {titles[step][1]}
          </p>
        </div>

        {step < 4 && <ProgressDots step={step} />}

        <div style={cardStyle}>
          {/* Corner marks */}
          {["top:14px;left:18px", "top:14px;right:18px", "bottom:14px;left:18px", "bottom:14px;right:18px"].map((pos, i) => {
            const [v, h] = pos.split(";");
            const [vk, vv] = v.split(":");
            const [hk, hv] = h.split(":");
            return <span key={i} style={{ position: "absolute", [vk]: vv, [hk]: hv, color: "rgba(184,150,90,0.3)", fontSize: 10 }}>✦</span>;
          })}

          {/* Step 1 */}
          {step === 1 && (
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              <div><Label>Your Name in the Garden</Label><Input value={form.displayName} onChange={set("displayName")} placeholder="How sisters will know you" /></div>
              <div><Label>Email Address</Label><Input type="email" value={form.email} onChange={set("email")} placeholder="your@email.com" /></div>
              <div><Label>Create a Password</Label><Input type="password" value={form.password} onChange={set("password")} placeholder="8+ characters" /></div>
              <div><Label>Phone Number</Label><Input type="tel" value={form.phone} onChange={set("phone")} placeholder="(000) 000-0000" /></div>
              <div><Label>City</Label><Input value={form.city} onChange={set("city")} placeholder="Where you're rooted" /></div>
              <Divider />
              <GoldButton onClick={() => setStep(2)} disabled={!form.displayName || !form.email || !form.password}>
                Continue →
              </GoldButton>
            </div>
          )}

          {/* Step 2 */}
          {step === 2 && (
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              <div><Label>A Little About You</Label><Textarea value={form.bio} onChange={set("bio")} placeholder="Your story, in your own words..." rows={3} /></div>
              <div><Label>What You Bring to the Sisterhood</Label><Textarea value={form.skills} onChange={set("skills")} placeholder="Skills, gifts, offerings..." rows={3} /></div>
              <div><Label>Who Invited You</Label><Input value={form.sponsorName} onChange={set("sponsorName")} placeholder="Your sponsor's name" /></div>
              <Divider />
              <GoldButton onClick={() => setStep(3)} disabled={!form.bio || !form.sponsorName}>Continue →</GoldButton>
              <GhostButton onClick={() => setStep(1)}>← Back</GhostButton>
            </div>
          )}

          {/* Step 3 */}
          {step === 3 && (
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              <div><Label>What Draws You to This Garden?</Label><Textarea value={form.draws} onChange={set("draws")} placeholder="What called you here..." rows={3} /></div>
              <div><Label>Why Is This Your Season to Bloom?</Label><Textarea value={form.season} onChange={set("season")} placeholder="Speak from your heart..." rows={4} /></div>
              <Divider />
              <GoldButton onClick={() => setStep(4)} disabled={!form.draws || !form.season}>Review Application →</GoldButton>
              <GhostButton onClick={() => setStep(2)}>← Back</GhostButton>
            </div>
          )}

          {/* Step 4 — Review */}
          {step === 4 && (
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {([["Name", form.displayName], ["Email", form.email], ["Phone", form.phone], ["City", form.city], ["Sponsor", form.sponsorName]] as [string, string][]).map(([label, value]) => (
                <div key={label} style={{ display: "flex", justifyContent: "space-between", gap: 12 }}>
                  <span style={{ fontFamily: "Cinzel, serif", fontSize: 9, letterSpacing: "0.15em", color: DUSTY, textTransform: "uppercase" as const, minWidth: 60, paddingTop: 2 }}>{label}</span>
                  <span style={{ fontFamily: "Cormorant Garamond, serif", fontSize: 14, color: BARK, textAlign: "right" as const, flex: 1 }}>{value}</span>
                </div>
              ))}
              <Divider />
              <p style={{ fontFamily: "Cormorant Garamond, serif", fontSize: 13, color: DUSTY, fontStyle: "italic", lineHeight: 1.7, textAlign: "center" }}>
                Your application will be reviewed by the founding sisters.<br />
                You'll receive a quiet word when your bloom is approved.
              </p>
              {error && (
                <p style={{ color: "#c0392b", fontFamily: "Cormorant Garamond, serif", fontSize: 13, textAlign: "center", fontStyle: "italic" }}>{error}</p>
              )}
              <Divider />
              <GoldButton onClick={handleSubmit} disabled={loading}>
                {loading ? "Planting your bloom..." : "Submit Application ✦"}
              </GoldButton>
              <GhostButton onClick={() => setStep(3)}>← Back</GhostButton>
            </div>
          )}
        </div>

        <p style={{ textAlign: "center", fontFamily: "Cormorant Garamond, serif", fontSize: 11, color: "rgba(200,165,165,0.4)", marginTop: 20, fontStyle: "italic" }}>
          Chapter I · Est. 2024 · By invitation only
        </p>
      </div>
    </main>
  );
}

export default function JoinPage() {
  return (
    <Suspense fallback={
      <main style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#fdf6f0" }}>
        <p style={{ fontFamily: "Cinzel, serif", color: "#b8965a", fontSize: 12, letterSpacing: "0.2em" }}>Opening the garden...</p>
      </main>
    }>
      <JoinForm />
    </Suspense>
  );
}
