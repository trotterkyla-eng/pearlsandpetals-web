// app/invite/welcome/page.tsx
‘use client’

import { useEffect, useState } from ‘react’
import { useRouter } from ‘next/navigation’
import { createClient } from ‘@supabase/supabase-js’
import AtmosphereLayer from ‘@/components/AtmosphereLayer’

const supabase = createClient(
process.env.NEXT_PUBLIC_SUPABASE_URL!,
process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

const LINKS = [
{ icon: ‘🍯’, name: ‘The Hive’,    desc: ‘Sister threads’,   href: ‘/dashboard#hive’ },
{ icon: ‘🕯️’, name: ‘Gatherings’, desc: ‘Events & circles’, href: ‘/dashboard#events’ },
{ icon: ‘💎’, name: ‘The Vault’,   desc: ‘Private resources’,href: ‘/dashboard#vault’ },
{ icon: ‘🌿’, name: ‘My Garden’,   desc: ‘Your sanctuary’,   href: ‘/dashboard’ },
]

export default function WelcomePage() {
const router = useRouter()
const [memberNum, setMemberNum] = useState<number | null>(null)
const [ring, setRing] = useState<‘middle’ | ‘outer’>(‘middle’)

useEffect(() => {
async function loadMember() {
const { data: { user } } = await supabase.auth.getUser()
if (!user) { router.push(’/’); return }

```
  const { data } = await supabase
    .from('members')
    .select('ring')
    .eq('auth_user_id', user.id)
    .single()

  if (data) setRing(data.ring)

  const { count } = await supabase
    .from('members')
    .select('*', { count: 'exact', head: true })
    .eq('status', 'active')

  setMemberNum(count ?? null)
}
loadMember()
```

}, [router])

const isFounder = ring === ‘middle’

return (
<>
<AtmosphereLayer variant="garden" />

```
  <div className="fixed inset-0 z-20 flex items-center justify-center p-4">
    <div className="welcome-card">
      <div className="card-frame" />
      <WelcomeCorners />

      <div className="card-surface">

        {/* Hero */}
        <div className="card-hero">
          <PearlString />
          <div className="seal-wrap">
            <div className="seal-halo" />
            <div className="seal-ring1" />
            <div className="seal-ring2" />
            <div className="seal-disc">
              <div className="seal-mono">P</div>
              <div className="seal-sub">&amp; P</div>
            </div>
          </div>
          <p className="eyebrow">Pearls &amp; Petals · Est. MMXXIV</p>
          <h1 className="welcome-title">Welcome to<br />the <em>Garden</em>, Sister</h1>
          <p className="welcome-sub">
            The gate is behind you now.<br />
            What blooms here is yours to tend.
          </p>
        </div>

        {/* Ring badge */}
        <div className="ring-section">
          <p className="ring-label">Your Place in the Garden</p>
          <div className="ring-badge">
            <div className="ring-icon">{isFounder ? '🌹' : '🌸'}</div>
            <div className="ring-info">
              <span className="ring-name">{isFounder ? 'Founding Sister' : 'Sponsored Sister'}</span>
              <span className="ring-desc">
                {isFounder
                  ? 'You are among the first 25.\nThe garden remembers its roots.'
                  : 'A sister carried you here.\nThe garden welcomes you fully.'}
              </span>
            </div>
            {memberNum !== null && (
              <div className="ring-num">
                <div className="ring-n">#{memberNum}</div>
                <div className="ring-ntxt">of {isFounder ? '25' : '50'}</div>
              </div>
            )}
          </div>
          <div className="rose-rule">
            {['🌸','🌸','🌸'].map((r,i) => (
              <span key={i} className="rr-rose">{r}</span>
            ))}
          </div>
        </div>

        {/* Links */}
        <div className="links-section">
          <p className="links-label">Your Garden Awaits</p>
          <div className="link-grid">
            {LINKS.map(l => (
              <div key={l.name} className="link-tile" onClick={() => router.push(l.href)}>
                <span className="link-icon">{l.icon}</span>
                <div className="link-name">{l.name}</div>
                <div className="link-desc">{l.desc}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="card-footer">
          <span className="footer-txt">bloomsoftly.org</span>
          <div className="dia-row">
            {['◆','◇','◆'].map((d,i) => <span key={i} className="dia">{d}</span>)}
          </div>
          <span className="footer-txt">Chapter I</span>
        </div>

      </div>
    </div>
  </div>

  <style>{WELCOME_STYLES}</style>
</>
```

)
}

function PearlString() {
const pearls = [
{size:7,pp:5.2,pd:.5},{size:8.5,pp:4.6,pd:.9},{size:10,pp:4,pd:0},
{clasp:true},
{size:10,pp:3.8,pd:.3},{size:8.5,pp:4.9,pd:.7},{size:7,pp:5.4,pd:1.1},
] as const
return (
<div className="pearl-string">
{pearls.map((p,i) => ‘clasp’ in p
? <div key={i} className="pearl-clasp" />
: <div key={i} className=“pearl” style={{’–ps’:`${p.size}px`,’–pp’:`${p.pp}s`,’–pd’:`${p.pd}s`} as React.CSSProperties} />
)}
</div>
)
}

function WelcomeCorners() {
return <>
{[{s:{top:-1,left:-1}},{s:{top:-1,right:-1,transform:‘scaleX(-1)’}},{s:{bottom:-1,left:-1,transform:‘scaleY(-1)’}},{s:{bottom:-1,right:-1,transform:‘scale(-1,-1)’}}].map((c,i)=>(
<div key={i} style={{position:‘absolute’,zIndex:5,pointerEvents:‘none’,width:40,height:40,…c.s}}>
<svg viewBox="0 0 40 40">
<path d="M1,1 L26,1 Q37,1 37,12 L37,18 L34,18 Q34,9 26,7 L1,7Z" fill="rgba(196,120,100,.46)"/>
<path d="M1,1 L3,1 L3,39 L1,39Z" fill="rgba(196,120,100,.5)"/>
<circle cx="16" cy="14" r="3.5" fill="none" stroke="rgba(196,120,100,.38)" strokeWidth=".8"/>
<path d="M7,24 L10,20 L13,24 L10,28Z" fill="rgba(196,120,100,.3)"/>
</svg>
</div>
))}
</>
}

const WELCOME_STYLES = `
@import url(‘https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,700;1,400&family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&family=Cinzel:wght@400;500&family=IM+Fell+English:ital@0;1&display=swap’);

@keyframes frameSpin  { to{rotate:360deg} }
@keyframes cardIn     { from{opacity:0;transform:translateY(30px) scale(.93);filter:blur(12px)} to{opacity:1;transform:translateY(0) scale(1);filter:blur(0)} }
@keyframes sealFloat  { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-6px)} }
@keyframes haloBreath { 0%,100%{opacity:.6;transform:scale(1)} 50%{opacity:1;transform:scale(1.14)} }
@keyframes pearlSheen { 0%,100%{box-shadow:inset -1px -1px 3px rgba(0,0,0,.1),inset 1px 1px 2px rgba(255,255,255,.6),0 1px 4px rgba(0,0,0,.16)} 50%{box-shadow:inset -1px -1px 3px rgba(0,0,0,.08),inset 1px 1px 2px rgba(255,255,255,.85),0 1px 4px rgba(0,0,0,.16),0 0 10px rgba(255,235,220,.5)} }
@keyframes roseGlow   { 0%,100%{opacity:.45;transform:scale(.9)} 50%{opacity:.85;transform:scale(1.12)} }
@keyframes diaFlash   { 0%,100%{opacity:.35;transform:scale(.85)} 50%{opacity:.85;transform:scale(1.18)} }

.welcome-card { width:min(380px,90vw); position:relative; animation:cardIn 2.2s cubic-bezier(.16,1,.3,1) .6s both; filter:drop-shadow(0 28px 80px rgba(0,0,0,.72)); }
.card-frame { position:absolute; inset:-2px; border-radius:5px; animation:frameSpin 15s linear infinite; -webkit-mask:linear-gradient(#fff 0 0) content-box,linear-gradient(#fff 0 0); -webkit-mask-composite:xor; mask-composite:exclude; padding:2px; background:conic-gradient(rgba(220,160,140,.9) 0deg,rgba(160,90,70,.55) 55deg,rgba(225,170,150,.95) 110deg,rgba(180,100,80,.5) 165deg,rgba(215,155,135,.9) 220deg,rgba(155,85,65,.55) 275deg,rgba(220,160,140,.9) 330deg); }
.card-surface { position:relative; z-index:2; border-radius:4px; overflow:hidden; background:radial-gradient(ellipse 62% 42% at 26% 16%,rgba(255,240,225,.24) 0%,transparent 58%),linear-gradient(162deg,#fefaf4 0%,#fbf2e8 28%,#f8ede0 62%,#faf1e6 100%); }
.card-hero { padding:28px 26px 20px; text-align:center; border-bottom:1px solid rgba(180,110,90,.12); }
.pearl-string { display:flex; justify-content:center; align-items:center; margin-bottom:16px; }
.pearl { width:var(–ps,9px); height:var(–ps,9px); border-radius:50%; background:radial-gradient(circle at 33% 27%,rgba(255,255,255,.95),rgba(240,225,215,.8) 35%,rgba(210,185,175,.55) 72%,rgba(185,155,145,.4) 100%); box-shadow:inset -1px -1px 3px rgba(0,0,0,.1),inset 1px 1px 2px rgba(255,255,255,.65),0 1px 4px rgba(0,0,0,.16); margin:0 2px; animation:pearlSheen var(–pp,4s) ease-in-out infinite var(–pd,0s); }
.pearl-clasp { width:12px; height:12px; border-radius:50%; margin:0 5px; background:radial-gradient(circle at 35% 28%,#f0c8b8,#c47868 50%,#7a3828 100%); box-shadow:0 0 8px rgba(196,120,104,.45); }
.seal-wrap { width:68px; height:68px; margin:0 auto 12px; position:relative; animation:sealFloat 5s ease-in-out infinite; filter:drop-shadow(0 4px 16px rgba(0,0,0,.3)) drop-shadow(0 0 22px rgba(180,100,80,.25)); }
.seal-halo { position:absolute; inset:-14px; border-radius:50%; background:radial-gradient(circle,rgba(200,110,90,.15) 0%,transparent 70%); animation:haloBreath 4s ease-in-out infinite; }
.seal-ring1 { position:absolute; inset:-5px; border-radius:50%; border:1px solid rgba(196,120,100,.28); }
.seal-ring2 { position:absolute; inset:0; border-radius:50%; border:1.5px solid rgba(196,120,100,.5); }
.seal-disc { position:absolute; inset:0; border-radius:50%; background:radial-gradient(circle at 33% 27%,rgba(255,220,200,.3),rgba(196,132,120,.52) 46%,rgba(90,40,35,.95) 100%); display:flex; align-items:center; justify-content:center; flex-direction:column; box-shadow:0 4px 14px rgba(0,0,0,.38); }
.seal-mono { font-family:‘Cinzel’,serif; font-size:22px; font-weight:500; color:rgba(255,232,220,.9); line-height:1; }
.seal-sub  { font-family:‘Cinzel’,serif; font-size:5.5px; letter-spacing:.18em; color:rgba(255,225,210,.6); margin-top:1px; }
.eyebrow { font-family:‘Cinzel’,serif; font-size:7.5px; letter-spacing:.28em; text-transform:uppercase; color:rgba(160,90,70,.6); margin-bottom:8px; display:block; }
.welcome-title { font-family:‘Playfair Display’,serif; font-weight:700; font-size:clamp(22px,5.8vw,30px); line-height:1.2; color:#140c06; margin-bottom:5px; }
.welcome-title em { font-style:italic; color:#a04848; }
.welcome-sub { font-family:‘IM Fell English’,serif; font-style:italic; font-size:13.5px; line-height:1.88; color:rgba(55,30,20,.6); }
.ring-section { padding:16px 26px; border-bottom:1px solid rgba(180,110,90,.1); }
.ring-label { font-family:‘Cinzel’,serif; font-size:7px; letter-spacing:.24em; text-transform:uppercase; color:rgba(140,85,65,.55); margin-bottom:10px; text-align:center; display:block; }
.ring-badge { display:flex; align-items:center; gap:12px; padding:12px 14px; background:linear-gradient(135deg,rgba(200,120,100,.07),rgba(180,100,80,.04)); border:1px solid rgba(196,120,100,.2); border-radius:3px; }
.ring-icon { font-size:24px; flex-shrink:0; filter:drop-shadow(0 0 8px rgba(196,120,100,.5)); }
.ring-name { font-family:‘Playfair Display’,serif; font-style:italic; font-size:16px; color:#140c06; display:block; }
.ring-desc { font-family:‘IM Fell English’,serif; font-style:italic; font-size:11.5px; color:rgba(80,45,30,.55); line-height:1.5; white-space:pre-line; }
.ring-num { margin-left:auto; text-align:right; flex-shrink:0; }
.ring-n { font-family:‘Playfair Display’,serif; font-size:22px; color:rgba(180,100,80,.35); line-height:1; }
.ring-ntxt { font-family:‘Cinzel’,serif; font-size:6px; letter-spacing:.15em; color:rgba(140,80,60,.4); text-transform:uppercase; }
.rose-rule { display:flex; justify-content:center; gap:8px; margin-top:10px; }
.rr-rose { font-size:10px; animation:roseGlow 3s ease-in-out infinite; }
.links-section { padding:16px 26px; }
.links-label { font-family:‘Cinzel’,serif; font-size:7px; letter-spacing:.24em; text-transform:uppercase; color:rgba(140,85,65,.55); margin-bottom:10px; display:block; }
.link-grid { display:grid; grid-template-columns:1fr 1fr; gap:8px; }
.link-tile { padding:11px 10px; border:1px solid rgba(196,120,100,.15); border-radius:3px; background:rgba(255,255,255,.22); cursor:pointer; text-align:center; transition:all .28s; }
.link-tile:hover { border-color:rgba(196,120,100,.35); transform:translateY(-2px); box-shadow:0 6px 20px rgba(0,0,0,.1); }
.link-icon { font-size:20px; display:block; margin-bottom:5px; filter:drop-shadow(0 0 5px rgba(196,120,100,.35)); }
.link-name { font-family:‘Cinzel’,serif; font-size:7.5px; letter-spacing:.1em; text-transform:uppercase; color:rgba(100,55,40,.65); }
.link-desc { font-family:‘IM Fell English’,serif; font-style:italic; font-size:10.5px; color:rgba(120,70,50,.42); margin-top:2px; }
.card-footer { padding:12px 26px 18px; border-top:1px solid rgba(180,110,90,.1); display:flex; justify-content:space-between; align-items:center; }
.footer-txt { font-family:‘Cinzel’,serif; font-size:6px; letter-spacing:.18em; color:rgba(120,70,50,.3); text-transform:uppercase; }
.dia-row { display:flex; align-items:center; gap:7px; }
.dia { font-size:8px; color:rgba(196,120,100,.4); animation:diaFlash 3s ease-in-out infinite; }
`
