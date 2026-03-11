import Link from "next/link";
import { createClient } from "@supabase/supabase-js";

export const revalidate = 0;
export const dynamic = "force-dynamic";

async function getInvite(token: string) {
  try {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!url || !key) return null;

    const supabase = createClient(url, key);
    const { data, error } = await supabase
      .from("invite_tokens")
      .select("slug, status, expires_at, use_count, use_limit")
      .eq("slug", token)
      .maybeSingle();

    if (error || !data) return null;
    if (data.status !== "active") return null;
    if (new Date(data.expires_at) < new Date()) return null;
    if (data.use_count >= data.use_limit) return null;

    return data;
  } catch {
    return null;
  }
}

export default async function InvitePage({
  params,
}: {
  params: { token: string };
}) {
  const invite = await getInvite(params.token);

  return (
    <main
      className="min-h-screen flex items-center justify-center px-5 py-12 relative overflow-hidden"
      style={{
        background:
          "linear-gradient(135deg, #fdf6f0 0%, #f2ddd5 50%, #fdf6f0 100%)",
      }}
    >
      {/* Sparkles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(16)].map((_, i) => (
          <span
            key={i}
            className="absolute w-1 h-1 rounded-full animate-pulse"
            style={{
              background: "rgba(184,150,90,0.4)",
              left: `${(i * 23 + 7) % 100}%`,
              top: `${(i * 17 + 11) % 100}%`,
              animationDelay: `${i * 0.3}s`,
              animationDuration: `${2 + (i % 3)}s`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 w-full max-w-sm">
        <div
          className="w-full rounded-2xl px-8 py-10 text-center relative overflow-hidden"
          style={{
            background:
              "linear-gradient(145deg, rgba(255,255,255,0.92), rgba(242,221,213,0.75))",
            border: "1px solid rgba(184,150,90,0.25)",
            boxShadow:
              "0 8px 40px rgba(107,76,59,0.08), inset 0 1px 0 rgba(255,255,255,0.8)",
          }}
        >
          <span className="absolute top-4 left-5 text-xs" style={{ color: "rgba(184,150,90,0.3)" }}>✦</span>
          <span className="absolute top-4 right-5 text-xs" style={{ color: "rgba(184,150,90,0.3)" }}>✦</span>
          <span className="absolute bottom-4 left-5 text-xs" style={{ color: "rgba(184,150,90,0.3)" }}>✦</span>
          <span className="absolute bottom-4 right-5 text-xs" style={{ color: "rgba(184,150,90,0.3)" }}>✦</span>

          {invite ? (
            <>
              <h1 className="text-lg mb-1" style={{ color: "#6b4c3b", fontFamily: "Cinzel, serif", letterSpacing: "0.12em" }}>
                Invitation Gate
              </h1>
              <p className="text-xs uppercase mb-8" style={{ color: "#d4a0a0", fontFamily: "Cinzel, serif", letterSpacing: "0.2em" }}>
                Pearls &amp; Petals
              </p>

              <div className="w-28 h-28 rounded-full mx-auto mb-8 flex items-center justify-center relative"
                style={{ background: "linear-gradient(135deg, rgba(184,150,90,0.1), rgba(184,150,90,0.2))", border: "1px solid rgba(184,150,90,0.4)" }}>
                <span className="absolute inset-0 rounded-full animate-ping" style={{ border: "1px solid rgba(184,150,90,0.2)" }} />
                <div className="w-20 h-20 rounded-full flex items-center justify-center text-4xl"
                  style={{ background: "linear-gradient(145deg, #fdf6f0, #f2ddd5)", border: "1px solid rgba(184,150,90,0.5)" }}>
                  🐝
                </div>
              </div>

              <div className="flex items-center gap-3 my-5">
                <span className="flex-1 h-px" style={{ background: "linear-gradient(to right, transparent, rgba(184,150,90,0.3))" }} />
                <span className="text-xs" style={{ color: "rgba(184,150,90,0.4)" }}>✦</span>
                <span className="flex-1 h-px" style={{ background: "linear-gradient(to left, transparent, rgba(184,150,90,0.3))" }} />
              </div>

              <p className="italic text-sm leading-relaxed mb-8" style={{ color: "#c8a5a5", fontFamily: "Cormorant Garamond, serif" }}>
                This invitation blooms once.<br />
                Tap the crest to enter.
              </p>

              <Link href={`/invite/join?token=${params.token}`}
                className="block w-full py-3.5 px-6 rounded-full text-white text-xs tracking-widest uppercase text-center"
                style={{ background: "linear-gradient(135deg, #b8965a, #d4b07a, #b8965a)", fontFamily: "Cinzel, serif", letterSpacing: "0.18em", boxShadow: "0 4px 16px rgba(184,150,90,0.3)" }}>
                Tap to Enter
              </Link>

              <Link href={`/i/${params.token}/hold`}
                className="block mt-4 italic text-sm underline underline-offset-4"
                style={{ color: "#c8a5a5", fontFamily: "Cormorant Garamond, serif" }}>
                I need more time
              </Link>

              <p className="mt-6 text-xs" style={{ color: "rgba(200,165,165,0.5)" }}>
                bloomsoftly.org/i/{params.token}
              </p>
            </>
          ) : (
            <>
              <div className="text-4xl mb-6 opacity-40">🌿</div>
              <h1 className="text-lg mb-2" style={{ color: "#6b4c3b", fontFamily: "Cinzel, serif", letterSpacing: "0.05em" }}>
                The Garden has Closed.
              </h1>
              <div className="flex items-center gap-3 my-5">
                <span className="flex-1 h-px" style={{ background: "linear-gradient(to right, transparent, rgba(184,150,90,0.3))" }} />
                <span className="text-xs" style={{ color: "rgba(184,150,90,0.4)" }}>✦</span>
                <span className="flex-1 h-px" style={{ background: "linear-gradient(to left, transparent, rgba(184,150,90,0.3))" }} />
              </div>
              <p className="italic text-sm leading-relaxed mb-8" style={{ color: "#c8a5a5", fontFamily: "Cormorant Garamond, serif" }}>
                This invitation bloomed once<br />
                and has returned to the soil.<br /><br />
                Ask your sponsor<br />for another bloom.
              </p>
              <Link href="/"
                className="block w-full py-3.5 px-6 rounded-full text-white text-xs tracking-widest uppercase text-center"
                style={{ background: "linear-gradient(135deg, #b8965a, #d4b07a, #b8965a)", fontFamily: "Cinzel, serif", letterSpacing: "0.18em", boxShadow: "0 4px 16px rgba(184,150,90,0.3)" }}>
                Return
              </Link>
            </>
          )}
        </div>
      </div>
    </main>
  );
}
