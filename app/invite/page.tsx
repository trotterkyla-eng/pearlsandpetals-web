'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabaseClient'

const supabase = createClient()

type InviteState = 'loading' | 'gate' | 'reveal' | 'expired'

interface InviteToken {
  slug: string
  assigned_to: string | null
  expires_at: string
  use_limit: number
  use_count: number
  status: string
  grants_ring: string
}

export default function InviteGatePage() {
  const { token } = useParams<{ token: string }>()
  const router = useRouter()
  const [state, setState] = useState<InviteState>('loading')
  const [invite, setInvite] = useState<InviteToken | null>(null)
  const [secondsLeft, setSecondsLeft] = useState(0)
  const [tapped, setTapped] = useState(false)

  // Load invite on mount
  useEffect(() => {
    async function loadInvite() {
      const { data, error } = await supabase
        .from('invite_tokens')
        .select('*')
        .eq('slug', token)
        .single()

      if (error || !data) {
        setState('expired')
        return
      }

      const isExpired =
        new Date(data.expires_at) < new Date() ||
        data.use_count >= data.use_limit ||
        data.status !== 'active'

      if (isExpired) {
        setState('expired')
        return
      }

      setInvite(data)
      setState('gate')
    }
    loadInvite()
  }, [token])

  // Countdown timer once revealed
  useEffect(() => {
    if (state !== 'reveal' || !invite) return

    const end = new Date(invite.expires_at).getTime()
    function tick() {
      const remaining = Math.max(0, Math.floor((end - Date.now()) / 1000))
      setSecondsLeft(remaining)
      if (remaining === 0) {
        router.replace(`/i/${token}/closed`)
      }
    }
    tick()
    const interval = setInterval(tick, 1000)
    return () => clearInterval(interval)
  }, [state, invite, token, router])

  function formatTime(s: number) {
    const m = Math.floor(s / 60)
    const sec = s % 60
    return `${m}:${sec.toString().padStart(2, '0')}`
  }

  async function handleAccept() {
    if (!invite) return
    // Mark token as used
    await supabase
      .from('invite_tokens')
      .update({
        use_count: invite.use_count + 1,
        status: invite.use_count + 1 >= invite.use_limit ? 'used' : 'active',
      })
      .eq('slug', token)

    router.push(`/invite/join?token=${token}&ring=${invite.grants_ring}`)
  }

  function handleNeedMoreTime() {
    router.push(`/i/${token}/hold`)
  }

  // ── LOADING ──────────────────────────────
  if (state === 'loading') {
    return (
      <Shell>
        <div className="flex flex-col items-center gap-4">
          <div className="w-16 h-16 rounded-full border border-gold/30 animate-pulse" />
          <p className="text-dusty font-garamond italic text-sm">
            The garden stirs…
          </p>
        </div>
      </Shell>
    )
  }

  // ── EXPIRED ──────────────────────────────
  if (state === 'expired') {
    return (
      <Shell>
        <OrnateCard>
          <div className="text-4xl mb-6 opacity-40">🌿</div>
          <h1 className="font-cinzel text-lg text-bark mb-2">
            The Garden has Closed.
          </h1>
          <Divider />
          <p className="font-garamond italic text-dusty text-sm leading-relaxed mb-8">
            This invitation bloomed once<br />
            and has returned to the soil.<br /><br />
            Ask your sponsor<br />for another bloom.
          </p>
          <button
            onClick={() => router.push('/')}
            className="btn-primary"
          >
            Return
          </button>
        </OrnateCard>
      </Shell>
    )
  }

  // ── GATE (before tap) ─────────────────────
  if (state === 'gate') {
    return (
      <Shell>
        <OrnateCard>
          <h1 className="font-cinzel text-lg tracking-widest text-bark mb-1">
            Invitation Gate
          </h1>
          <p className="font-cinzel text-[10px] tracking-[0.2em] text-rose uppercase mb-8">
            Pearls & Petals
          </p>

          {/* Crest */}
          <button
            onClick={() => { setTapped(true); setState('reveal') }}
            className={`w-28 h-28 rounded-full mx-auto mb-8 flex items-center justify-center
              bg-gradient-to-br from-gold/10 to-gold/20 border border-gold/40
              hover:scale-105 transition-transform duration-300 relative
              ${tapped ? 'scale-105' : ''}`}
          >
            {/* Pulse rings */}
            <span className="absolute inset-0 rounded-full border border-gold/20 animate-ping" />
            <span className="w-20 h-20 rounded-full bg-gradient-to-br from-cream to-blush
              border border-gold/50 flex items-center justify-center text-4xl shadow-inner">
              🐝
            </span>
          </button>

          <Divider />

          <p className="font-garamond italic text-dusty text-sm leading-relaxed mb-8">
            This invitation blooms once.<br />
            Tap the crest to enter.
          </p>

          <button onClick={() => { setTapped(true); setState('reveal') }} className="btn-primary">
            Tap to Enter
          </button>

          <p className="text-dusty/50 font-garamond text-[11px] mt-6 tracking-wide">
            pearlsandpetals.org/i/{token}
          </p>
        </OrnateCard>
      </Shell>
    )
  }

  // ── REVEAL (countdown) ────────────────────
  return (
    <Shell>
      <OrnateCard>
        <h1 className="font-cinzel text-lg tracking-widest text-bark mb-1">
          The Hidden Garden
        </h1>
        <p className="font-cinzel text-[10px] tracking-[0.2em] text-rose uppercase mb-6">
          Your Invitation
        </p>

        <Divider />

        {/* Event details */}
        <div className="w-full bg-white/40 border border-gold/20 rounded-xl p-5 mb-6 text-left">
          <p className="font-cinzel text-[9px] tracking-[0.2em] text-gold uppercase mb-1">
            Location
          </p>
          <p className="font-garamond text-base text-bark mb-4">
            123 Rosewood Lane<br />Atlanta, Georgia 30327
          </p>
          <p className="font-cinzel text-[9px] tracking-[0.2em] text-gold uppercase mb-1">
            Date & Time
          </p>
          <p className="font-garamond text-base text-bark">
            Saturday, June 12 · 6:30 PM
          </p>
        </div>

        {/* Countdown */}
        <div className="mb-2">
          <p className="font-cinzel text-5xl text-bark tracking-wide">
            {formatTime(secondsLeft)}
          </p>
          <p className="font-garamond italic text-rose text-xs mt-1 tracking-wide">
            When the vines close, this invite is gone.
          </p>
        </div>

        <div className="h-6" />

        <button onClick={handleAccept} className="btn-primary">
          Accept Invitation
        </button>
        <button onClick={handleNeedMoreTime} className="btn-ghost mt-3">
          I need more time
        </button>
      </OrnateCard>
    </Shell>
  )
}

// ── SHARED SUB-COMPONENTS ──────────────────

function Shell({ children }: { children: React.ReactNode }) {
  return (
    <main className="min-h-screen bg-cream flex items-center justify-center px-5 py-12
      bg-gradient-to-br from-cream via-blush/30 to-cream relative overflow-hidden">
      <SparkleField />
      <div className="relative z-10 w-full max-w-sm">
        {children}
      </div>
    </main>
  )
}

function OrnateCard({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-full bg-gradient-to-br from-white/90 to-blush/70
      border border-gold/25 rounded-2xl px-8 py-10 text-center
      shadow-[0_8px_40px_rgba(107,76,59,0.08),inset_0_1px_0_rgba(255,255,255,0.8)]
      relative overflow-hidden">
      <span className="absolute top-4 left-5 text-gold/30 text-xs">✦</span>
      <span className="absolute top-4 right-5 text-gold/30 text-xs">✦</span>
      <span className="absolute bottom-4 left-5 text-gold/30 text-xs">✦</span>
      <span className="absolute bottom-4 right-5 text-gold/30 text-xs">✦</span>
      {children}
    </div>
  )
}

function Divider() {
  return (
    <div className="flex items-center gap-3 my-5 text-gold/40 text-xs">
      <span className="flex-1 h-px bg-gradient-to-r from-transparent to-gold/30" />
      <span>✦</span>
      <span className="flex-1 h-px bg-gradient-to-l from-transparent to-gold/30" />
    </div>
  )
}

function SparkleField() {
  return (
    <div className="absolute inset-0 pointer-events-none">
      {Array.from({ length: 16 }).map((_, i) => (
        <span
          key={i}
          className="absolute w-1 h-1 rounded-full bg-gold/40 animate-pulse"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${i * 0.3}s`,
            animationDuration: `${2 + (i % 3)}s`,
          }}
        />
      ))}
    </div>
  )
}
