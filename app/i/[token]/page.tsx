import Link from "next/link";
import { getInviteStatus } from "@/lib/invites";

export default async function InvitePage({
  params,
}: {
  params: { token: string };
}) {
  const status = await getInviteStatus(params.token);
  const isValid = status === "ok";

  return (
    <main className="min-h-screen flex items-center justify-center px-5 py-12 relative overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #fdf6f0 0%, #f2ddd5 50%, #fdf6f0 100%)' }}>

      {/* Sparkle dots */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(16)].map((_, i) => (
          <span key={i} className="absolute w-1 h-1 rounded-full animate-pulse"
            style={{
              background: 'rgba(184,150,90,0.4)',
              left: `${(i * 23 + 7) % 100}%`,
              top: `${(i * 17 + 11) % 100}%`,
              animationDelay: `${i * 0.3}s`,
              animationDuration: `${2 + (i % 3)}s`,
            }} />
        ))}
      </div>

      <div className="relative z-10 w-full max-w-sm">

        {/* ORNATE CARD */}
        <div className="w-full rounded-2xl px-8 py-10 text-center relative overflow-hidden"
          style={{
            background: 'linear-gradient(145deg, rgba(255,255,255,0.92), rgba(242,221,213,0.75))',
            border: '1px solid rgba(184,150,90,0.25)',
            boxShadow: '0 8px 40px rgba(107,76,59,0.08), inset 0 1px 0 rgba(255,255,255,0.8)',
          }}>

          {/* Corner flourishes */}
          <span className="absolute top-4 left-5 text-xs" style={{ color: 'rgba(184,150,90,0.3)' }}>✦</span>
          <span className="absolute top-4 right-5 text-xs" style={{ color: 'rgba(184,150,90,0.3)' }}>✦</span>
          <span className="absolute bottom-4 left-5 text-xs" style={{ color: 'rgba(184,150,90,0.3)' }}>✦</span>
          <span className="absolute bottom-4 right-5 text-xs" style={{ color: 'rgba(184,150,90,0.3)' }}>✦</span>

          {isValid ? (
            /* ── VALID INVITE: Show the gate ── */
            <>
              <h1 className="font-serif tracking-widest text-lg mb-1"
                style={{ color: '#6b4c3b', fontFamily: 'Cinzel, serif' }}>
                Invitation Gate
              </h1>
              <p className="text-xs tracking-widest uppercase mb-8"
                style={{ color: '#d4a0a0', fontFamily: 'Cinzel, serif', letterSpacing: '0.2em' }}>
                Pearls &amp; Petals
              </p>

              {/* Bee Crest */}
              <div className="w-28 h-28 rounded-full mx-auto mb-8 flex items-center justify-center relative"
                style={{ background: 'linear-gradient(135deg, rgba(184,150,90,0.1), rgba(184,150,90,0.2))', border: '1px solid rgba(184,150,90,0.4)' }}>
                <span className="absolute inset-0 rounded-full animate-ping"
                  style={{ border: '1px solid rgba(184,150,90,0.2)' }} />
                <div className="w-20 h-20 rounded-full flex items-center justify-center text-4xl"
                  style={{ background: 'linear-gradient(145deg, #fdf6f0, #f2ddd5)', border: '1px solid rgba(184,150,90,0.5)' }}>
                  🐝
                </div>
              </div>

              {/* Divider */}
              <div className="flex items-center gap-3 my-5" style={{ color: 'rgba(184,150,90,0.4)' }}>
                <span className="flex-1 h-px" style={{ background: 'linear-gradient(to right, transparent, rgba(184,150,90,0.3))' }} />
                <span className="text-xs">✦</span>
                <span className="flex-1 h-px" style={{ background: 'linear-gradient(to left, transparent, rgba(184,150,90,0.3))' }} />
              </div>

              <p className="italic text-sm leading-relaxed mb-8"
                style={{ color: '#c8a5a5', fontFamily: 'Cormorant Garamond, serif' }}>
                This invitation blooms once.<br />
                Tap the crest to enter.
              </p>

              {/* Accept button */}
              <Link href={`/join?token=${params.token}`}
                className="block w-full py-3.5 px-6 rounded-full text-white text-xs tracking-widest uppercase text-center transition-all duration-300 hover:-translate-y-px"
                style={{
                  background: 'linear-gradient(135deg, #b8965a, #d4b07a, #b8965a)',
                  boxShadow: '0 4px 16px rgba(184,150,90,0.3)',
                  fontFamily: 'Cinzel, serif',
                  letterSpacing: '0.18em',
                }}>
                Tap to Enter
              </Link>

              {/* Need more time */}
              <Link href={`/i/${params.token}/hold`}
                className="block mt-4 italic text-sm underline underline-offset-4 transition-colors"
                style={{ color: '#c8a5a5', fontFamily: 'Cormorant Garamond, serif' }}>
                I need more time
              </Link>

              <p className="mt-6 text-xs" style={{ color: 'rgba(200,165,165,0.5)', fontFamily: 'EB Garamond, serif' }}>
                pearlsandpetals.org/i/{params.token}
              </p>
            </>
          ) : (
            /* ── INVALID/EXPIRED: Garden Closed ── */
            <>
              <div className="text-4xl mb-6 opacity-40">🌿</div>

              <h1 className="font-serif text-lg mb-2"
                style={{ color: '#6b4c3b', fontFamily: 'Cinzel, serif', letterSpacing: '0.05em' }}>
                The Garden has Closed.
              </h1>

              {/* Divider */}
              <div className="flex items-center gap-3 my-5" style={{ color: 'rgba(184,150,90,0.4)' }}>
                <span className="flex-1 h-px" style={{ background: 'linear-gradient(to right, transparent, rgba(184,150,90,0.3))' }} />
                <span className="text-xs">✦</span>
                <span className="flex-1 h-px" style={{ background: 'linear-gradient(to left, transparent, rgba(184,150,90,0.3))' }} />
              </div>

              <p className="italic text-sm leading-relaxed mb-8"
                style={{ color: '#c8a5a5', fontFamily: 'Cormorant Garamond, serif' }}>
                This invitation bloomed once<br />
                and has returned to the soil.<br /><br />
                Ask your sponsor<br />for another bloom.
              </p>

              <Link href="/"
                className="block w-full py-3.5 px-6 rounded-full text-white text-xs tracking-widest uppercase text-center transition-all duration-300 hover:-translate-y-px"
                style={{
                  background: 'linear-gradient(135deg, #b8965a, #d4b07a, #b8965a)',
                  boxShadow: '0 4px 16px rgba(184,150,90,0.3)',
                  fontFamily: 'Cinzel, serif',
                  letterSpacing: '0.18em',
                }}>
                Return
              </Link>
            </>
          )}
        </div>
      </div>
    </main>
  );
}
