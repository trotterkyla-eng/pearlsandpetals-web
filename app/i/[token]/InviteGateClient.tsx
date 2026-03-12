// app/i/[token]/InviteGateClient.tsx
‘use client’

import { useState } from ‘react’
import { useRouter } from ‘next/navigation’
import AtmosphereLayer from ‘@/components/AtmosphereLayer’

export default function InviteGateClient({ tokenSlug }: { tokenSlug: string }) {
const router = useRouter()
const [scrollOpen, setScrollOpen] = useState(false)
const [bursting, setBursting] = useState(false)

function acceptCovenant() {
setBursting(true)
setTimeout(() => {
router.push(`/invite/join?token=${tokenSlug}`)
}, 1800)
}

return (
<>
<AtmosphereLayer variant="ballroom" />

```
  {/* ── Invitation Card ── */}
  <div className="fixed inset-0 z-20 flex items-center justify-center p-4">
    <div className="invite-card">
      <CardFrame />
      <CornerOrnaments color="rgba(201,149,42" />

      <div className="card-surface">
        <PearlString />

        <div className="card-body">
          <p className="eyebrow">Pearls &amp; Petals · Est. MMXXIV</p>
          <Seal onClick={() => setScrollOpen(true)} />
          <GoldRule />
          <h1 className="main-title">You Have Been<br /><em>Called</em> to the Garden</h1>
          <p className="subtitle">
            A sister spoke your name in candlelight.<br />
            The garden heard. And so it opens — for you.
          </p>
          <DiamondRow />
          <p className="inv-text">
            This invitation belongs to <strong>you alone</strong>.<br />
            It blooms once, then seals — like all things<br />
            worth having in this world.
          </p>
          <button className="btn-primary" onClick={() => setScrollOpen(true)}>
            ✦ &nbsp; View Your Invitation &nbsp; ✦
          </button>
          <button className="btn-secondary">I require more time to consider</button>
        </div>

        <div className="card-footer">
          <span className="footer-txt">bloomsoftly.org</span>
          <DiamondRow small />
          <span className="footer-txt">Chapter I</span>
        </div>
      </div>
    </div>
  </div>

  {/* ── Covenant Scroll ── */}
  {scrollOpen && (
    <CovenantScroll
      onAccept={acceptCovenant}
      onClose={() => setScrollOpen(false)}
      bursting={bursting}
    />
  )}

  <style>{STYLES}</style>
</>
```

)
}

/* ── Sub-components ── */

function CardFrame() {
return (
<div style={{
position: ‘absolute’, inset: ‘-2px’, borderRadius: ‘5px’,
background: `conic-gradient(rgba(245,228,168,.9) 0deg,rgba(160,110,20,.6) 45deg, rgba(245,228,168,.95) 90deg,rgba(180,130,30,.5) 135deg, rgba(245,228,168,.9) 180deg,rgba(160,110,20,.6) 225deg, rgba(245,228,168,.95) 270deg,rgba(180,130,30,.5) 315deg, rgba(245,228,168,.9) 360deg)`,
animation: ‘frameSpin 12s linear infinite’,
WebkitMask: ‘linear-gradient(#fff 0 0) content-box,linear-gradient(#fff 0 0)’,
WebkitMaskComposite: ‘xor’,
maskComposite: ‘exclude’,
padding: ‘2px’,
zIndex: 2,
}} />
)
}

function CornerOrnaments({ color }: { color: string }) {
const path = `M1,1 L26,1 Q37,1 37,12 L37,18 L34,18 Q34,9 26,7 L1,7Z`
const bar  = `M1,1 L3,1 L3,39 L1,39Z`
function Corner({ style }: { style: React.CSSProperties }) {
return (
<div style={{ position: ‘absolute’, zIndex: 5, pointerEvents: ‘none’, width: 40, height: 40, …style }}>
<svg viewBox="0 0 40 40">
<path d={path}  fill={`${color},.48)`} />
<path d={bar}   fill={`${color},.52)`} />
<circle cx=“16” cy=“14” r=“3.5” fill=“none” stroke={`${color},.4)`} strokeWidth=”.8” />
<circle cx=“16” cy=“14” r=“1.2” fill={`${color},.45)`} />
<path d=“M7,24 L10,20 L13,24 L10,28Z” fill={`${color},.35)`} />
</svg>
</div>
)
}
return <>
<Corner style={{ top: -1, left: -1 }} />
<Corner style={{ top: -1, right: -1, transform: ‘scaleX(-1)’ }} />
<Corner style={{ bottom: -1, left: -1, transform: ‘scaleY(-1)’ }} />
<Corner style={{ bottom: -1, right: -1, transform: ‘scale(-1,-1)’ }} />
</>
}

function Seal({ onClick }: { onClick: () => void }) {
return (
<div className="seal-wrap" onClick={onClick}>
<div className="seal-halo" />
<div className="seal-ring1" />
<div className="seal-ring2" />
<div className="seal-disc">
<div className="seal-mono">P</div>
<div className="seal-sub">& P</div>
</div>
</div>
)
}

function PearlString() {
const pearls = [
{ size: 7, period: 5.2, delay: .5 },
{ size: 8.5, period: 4.6, delay: .9 },
{ size: 10, period: 4, delay: 0 },
{ clasp: true },
{ size: 10, period: 3.8, delay: .3 },
{ size: 8.5, period: 4.9, delay: .7 },
{ size: 7, period: 5.4, delay: 1.1 },
] as const
return (
<div className="pearl-string">
{pearls.map((p, i) =>
‘clasp’ in p
? <div key={i} className="pearl-clasp" />
: <div key={i} className=“pearl”
style={{ ‘–ps’: `${p.size}px`, ‘–pp’: `${p.period}s`, ‘–pd’: `${p.delay}s` } as React.CSSProperties} />
)}
</div>
)
}

function GoldRule() {
return (
<div className="gold-rule">
<div className="gr-line" />
<div className="gr-diamond" />
<div className="gr-line" />
</div>
)
}

function DiamondRow({ small }: { small?: boolean }) {
return (
<div className=“diamond-row” style={{ margin: small ? 0 : undefined, gap: small ? 6 : undefined }}>
{[0, .4, .8, .2, .6].slice(0, small ? 3 : 5).map((dd, i) => (
<span key={i} className=“dia”
style={{ ‘–ds’: `${[3.2,2.8,3.5,2.6,3.1][i]}s`, ‘–dd’: `${dd}s`, fontSize: small ? 7 : 10 } as React.CSSProperties}>
{i % 2 === 0 ? ‘◆’ : ‘◇’}
</span>
))}
</div>
)
}

function CovenantScroll({ onAccept, onClose, bursting }: {
onAccept: () => void
onClose: () => void
bursting: boolean
}) {
const covenants = [
{ n: ‘Ⅰ’, title: ‘Sacred Silence’, text: ‘What blooms here stays here. Full stop. No screenshots, no whispers, no receipts.’ },
{ n: ‘Ⅱ’, title: ‘The Honour of the Invitation’, text: ‘A sister vouched for you. That is not a small thing. Carry it accordingly.’ },
{ n: ‘Ⅲ’, title: ‘A Garden Beyond the Veil’, text: “Every sister’s identity and story is sacred. We protect each other — always.” },
{ n: ‘Ⅳ’, title: ‘Love Is the Only Currency’, text: ‘We uplift. We celebrate. We do not compete or diminish. Ever.’ },
{ n: ‘Ⅴ’, title: ‘This Bloom Is Yours Alone’, text: ‘This invitation may not be forwarded. The garden calls its own.’ },
]
return (
<div className=“scroll-overlay” onClick={e => e.target === e.currentTarget && onClose()}>
<div className={`scroll-card ${bursting ? 'fading' : ''}`}>
<div className="rod top" />
<div className="scroll-body">
<div className="wax"><div className="wax-mono">P</div></div>
<span className="s-eyebrow">Royal Decree · Anno Domini MMXXIV</span>
<div className="s-title">The Garden <em>Covenant</em></div>
<p className="s-chapter">Pearls & Petals · Chapter the First</p>
<div className="s-rule"><div className="s-rule-gem">◆   ◇   ◆</div></div>
<div className="s-intro">
<div className="drop-cap">B</div>
e it known: you were not stumbled upon. A sister carried your name with intention and placed it before this garden. What follows are not rules — they are roots. The kind that hold everything worth keeping.
</div>
{covenants.map(c => (
<div key={c.n} className="covenant">
<span className="cov-n">{c.n}</span>
<span className="cov-t"><strong>{c.title}</strong>{c.text}</span>
</div>
))}
<div className="oath">
<p className="oath-t">By crossing this threshold, you carry these words as a living promise — not to the garden, but to every sister who dwells within it.</p>
</div>
<div className="s-sig">
<div className="s-sig-txt">Sealed by<span>The Founder</span></div>
<div className="s-sig-bar" />
<div className="s-sig-rose">🌸</div>
<div className="s-sig-bar" />
<div className=“s-sig-txt” style={{ textAlign: ‘right’ }}>Witnessed by<span>The Garden</span></div>
</div>
<div className="s-cta">
<button className="s-btn" onClick={onAccept}>✦   I Accept — Enter the Garden   ✦</button>
<span className="s-note">Upon accepting, this scroll dissolves as all good secrets do</span>
</div>
<div className="s-bot">◆   ◇   ◆</div>
</div>
<div className="rod bot" />
</div>
</div>
)
}

/* ── Styles ── */
const STYLES = `
@import url(‘https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,700;1,400;1,500&family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&family=Cinzel:wght@400;500&family=IM+Fell+English:ital@1&display=swap’);

:root {
–champagne:#f7e8c8; –gold:#c9952a; –gold-pale:#f5e4a8;
–pearl:#faf6f0; –cream:#f9f0e0; –ink:#140c06;
–blush-deep:#d4847a;
}

@keyframes frameSpin   { to { rotate: 360deg } }
@keyframes sealFloat   { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-6px)} }
@keyframes haloBreath  { 0%,100%{opacity:.6;transform:scale(1)} 50%{opacity:1;transform:scale(1.12)} }
@keyframes pearlGlow   { 0%,100%{box-shadow:inset -1px -1px 3px rgba(0,0,0,.12),inset 1px 1px 2px rgba(255,255,255,.6),0 1px 4px rgba(0,0,0,.18)} 50%{box-shadow:inset -1px -1px 3px rgba(0,0,0,.1),inset 1px 1px 2px rgba(255,255,255,.8),0 1px 4px rgba(0,0,0,.18),0 0 10px rgba(255,245,220,.5)} }
@keyframes diaFlash    { 0%,100%{opacity:.45;transform:scale(.88)} 50%{opacity:1;transform:scale(1.18);filter:drop-shadow(0 0 9px rgba(201,149,42,.75))} }
@keyframes cardReveal  { from{opacity:0;transform:translateY(32px) scale(.93);filter:blur(12px)} to{opacity:1;transform:translateY(0) scale(1);filter:blur(0)} }

.invite-card {
width: min(375px, 88vw);
position: relative;
animation: cardReveal 2.4s cubic-bezier(.16,1,.3,1) .8s both;
filter: drop-shadow(0 24px 80px rgba(0,0,0,.7)) drop-shadow(0 4px 20px rgba(0,0,0,.5));
}
.card-surface {
position: relative; z-index: 2; border-radius: 4px; overflow: hidden;
background:
repeating-linear-gradient(0deg,transparent,transparent 22px,rgba(160,120,50,.016) 22px,rgba(160,120,50,.016) 23px),
radial-gradient(ellipse 65% 45% at 28% 18%,rgba(255,245,210,.22) 0%,transparent 60%),
linear-gradient(158deg,#fdf7eb 0%,#faf1de 30%,#f7e8c8 68%,#faeedd 100%);
box-shadow: inset 14px 0 28px rgba(180,140,60,.06), inset -14px 0 28px rgba(180,140,60,.06);
}
.pearl-string { display:flex; justify-content:center; align-items:center; padding:16px 0 0; gap:0; }
.pearl {
width: var(–ps,9px); height: var(–ps,9px); border-radius: 50%;
background: radial-gradient(circle at 32% 26%,rgba(255,255,255,.95) 0%,rgba(245,235,215,.8) 30%,rgba(210,190,160,.6) 70%,rgba(180,160,130,.4) 100%);
box-shadow: inset -1px -1px 3px rgba(0,0,0,.12),inset 1px 1px 2px rgba(255,255,255,.6),0 1px 4px rgba(0,0,0,.18),0 0 0 1px rgba(180,160,120,.18);
margin: 0 2px;
animation: pearlGlow var(–pp,4s) ease-in-out infinite var(–pd,0s);
}
.pearl-clasp {
width:13px; height:13px; border-radius:50%; margin:0 5px;
background: radial-gradient(circle at 35% 28%,#f8e898,#d4a010 50%,#7a4c00 100%);
box-shadow: 0 0 8px rgba(201,149,42,.5),0 1px 3px rgba(0,0,0,.3);
}
.card-body { padding: 8px 28px 24px; text-align: center; }
.eyebrow { font-family:‘Cinzel’,serif; font-size:7.5px; letter-spacing:.3em; text-transform:uppercase; color:rgba(160,110,30,.65); margin-bottom:10px; display:block; }
.seal-wrap { width:62px; height:62px; margin:0 auto 12px; position:relative; cursor:pointer; animation:sealFloat 5s ease-in-out infinite; filter:drop-shadow(0 4px 16px rgba(0,0,0,.35)) drop-shadow(0 0 20px rgba(201,149,42,.2)); }
.seal-halo { position:absolute; inset:-12px; border-radius:50%; background:radial-gradient(circle,rgba(201,149,42,.12) 0%,transparent 70%); animation:haloBreath 3.5s ease-in-out infinite; }
.seal-ring1 { position:absolute; inset:-5px; border-radius:50%; border:1px solid rgba(201,149,42,.3); }
.seal-ring2 { position:absolute; inset:0; border-radius:50%; border:1.5px solid rgba(201,149,42,.55); }
.seal-disc { position:absolute; inset:0; border-radius:50%; background:radial-gradient(circle at 33% 26%,rgba(255,245,180,.35) 0%,rgba(210,160,40,.55) 45%,rgba(100,65,8,.95) 100%); display:flex; align-items:center; justify-content:center; flex-direction:column; box-shadow:0 4px 14px rgba(0,0,0,.4),inset 0 1px 0 rgba(255,240,180,.35); }
.seal-mono { font-family:‘Cinzel’,serif; font-size:20px; font-weight:500; color:#f5e4a8; line-height:1; text-shadow:0 1px 0 rgba(0,0,0,.5); }
.seal-sub  { font-family:‘Cinzel’,serif; font-size:5.5px; letter-spacing:.18em; color:rgba(245,228,168,.65); margin-top:1px; }
.gold-rule { display:flex; align-items:center; gap:8px; margin:11px 0; }
.gr-line   { flex:1; height:1px; background:linear-gradient(90deg,transparent,rgba(201,149,42,.45),transparent); }
.gr-diamond { width:6px; height:6px; background:linear-gradient(135deg,#f5e4a8,#c9952a); transform:rotate(45deg); box-shadow:0 0 6px rgba(201,149,42,.35); flex-shrink:0; }
.main-title { font-family:‘Playfair Display’,serif; font-weight:700; font-size:clamp(21px,5.5vw,28px); line-height:1.22; color:var(–ink); margin-bottom:5px; }
.main-title em { font-style:italic; color:var(–blush-deep); }
.subtitle { font-family:‘IM Fell English’,serif; font-style:italic; font-size:13.5px; line-height:1.86; color:rgba(55,32,12,.62); margin-bottom:14px; }
.diamond-row { display:flex; justify-content:center; align-items:center; gap:10px; margin:9px 0; }
.dia { font-size:10px; color:rgba(201,149,42,.5); filter:drop-shadow(0 0 3px rgba(201,149,42,.3)); animation:diaFlash var(–ds,3s) ease-in-out infinite var(–dd,0s); }
.inv-text { font-family:‘Cormorant Garamond’,serif; font-size:13.5px; line-height:1.92; color:rgba(40,22,8,.68); margin-bottom:14px; }
.inv-text strong { font-family:‘Playfair Display’,serif; font-weight:500; font-size:14px; color:var(–ink); }
.btn-primary { display:block; width:100%; padding:14px; border:none; cursor:pointer; background:linear-gradient(160deg,#1c1008 0%,#281604 45%,#1c1008 100%); color:var(–champagne); font-family:‘Cinzel’,serif; font-size:9.5px; letter-spacing:.26em; text-transform:uppercase; position:relative; overflow:hidden; box-shadow:0 2px 8px rgba(0,0,0,.35),0 0 0 1px rgba(201,149,42,.3); margin-bottom:8px; }
.btn-secondary { background:none; border:none; cursor:pointer; display:block; width:100%; font-family:‘Cormorant Garamond’,serif; font-style:italic; font-size:12.5px; color:rgba(55,32,12,.38); letter-spacing:.05em; }
.card-footer { padding:11px 24px 17px; border-top:1px solid rgba(201,149,42,.1); display:flex; justify-content:space-between; align-items:center; }
.footer-txt { font-family:‘Cinzel’,serif; font-size:6px; letter-spacing:.18em; color:rgba(100,65,22,.3); text-transform:uppercase; }

/* Scroll */
.scroll-overlay { position:fixed; inset:0; z-index:80; display:flex; align-items:center; justify-content:center; background:rgba(8,4,2,.68); backdrop-filter:blur(8px); animation:fadeIn .55s ease; }
@keyframes fadeIn { from{opacity:0} to{opacity:1} }
.scroll-card { width:min(365px,90vw); filter:drop-shadow(0 32px 80px rgba(0,0,0,.8)); }
.scroll-card.fading { animation:fadeAway 1.8s ease forwards; }
@keyframes fadeAway { to{opacity:0;transform:scale(.96)} }
.rod { height:19px; position:relative; z-index:3; background:linear-gradient(180deg,#fdf2c4 0%,#d4a820 9%,#f0cc38 23%,#8a6a08 40%,#e0b828 54%,#c49408 68%,#fdf2c4 100%); box-shadow:0 4px 12px rgba(0,0,0,.5),0 0 16px rgba(201,149,42,.18); }
.rod.top { border-radius:4px 4px 0 0; }
.rod.bot { border-radius:0 0 4px 4px; }
.rod::before,.rod::after { content:’’; position:absolute; top:50%; transform:translateY(-50%); width:26px; height:26px; border-radius:50%; z-index:4; background:radial-gradient(circle at 33% 28%,#fef8d4,#d8a812 50%,#6e4600 84%); box-shadow:0 2px 8px rgba(0,0,0,.5); }
.rod::before { left:-9px; } .rod::after { right:-9px; }
.scroll-body { padding:34px 26px 28px; background:linear-gradient(160deg,#fdf7ec 0%,#faf2df 32%,#f5e9ca 68%,#f9eedb 100%); border-left:1px solid rgba(160,110,38,.25); border-right:1px solid rgba(160,110,38,.25); position:relative; }
.wax { position:absolute; top:-21px; left:50%; transform:translateX(-50%); width:44px; height:44px; border-radius:50%; z-index:10; background:radial-gradient(circle at 33% 27%,rgba(255,180,170,.2),#8c1818 46%,#4c0c0c 82%,#280606 100%); border:1.5px solid rgba(190,80,80,.35); box-shadow:0 0 0 2px rgba(201,149,42,.28),0 5px 14px rgba(0,0,0,.55); display:flex; align-items:center; justify-content:center; }
.wax-mono { font-family:‘Cinzel’,serif; font-size:15px; color:rgba(255,225,185,.85); }
.s-eyebrow { font-family:‘Cinzel’,serif; font-size:7px; letter-spacing:.26em; color:rgba(120,78,18,.6); text-transform:uppercase; display:block; text-align:center; margin-bottom:6px; }
.s-title { font-family:‘Playfair Display’,serif; font-size:18px; font-weight:700; color:#140c06; text-align:center; margin-bottom:2px; }
.s-title em { font-style:italic; color:#d4847a; }
.s-chapter { font-family:‘IM Fell English’,serif; font-style:italic; font-size:11px; color:rgba(80,48,18,.52); text-align:center; margin-bottom:2px; }
.s-rule { display:flex; align-items:center; gap:8px; margin:11px 0; }
.s-rule::before,.s-rule::after { content:’’; flex:1; height:1px; background:linear-gradient(90deg,transparent,rgba(160,108,38,.4),transparent); }
.s-rule-gem { font-size:8px; color:rgba(201,149,42,.65); letter-spacing:6px; }
.drop-cap { float:left; margin:3px 8px 0 0; width:40px; height:40px; border:1px solid rgba(180,128,38,.4); border-radius:2px; display:flex; align-items:center; justify-content:center; background:linear-gradient(135deg,rgba(245,225,155,.22),rgba(201,149,42,.1)); font-family:‘Playfair Display’,serif; font-size:25px; font-weight:700; font-style:italic; color:#8a5a0e; }
.s-intro { font-family:‘IM Fell English’,serif; font-style:italic; font-size:12px; line-height:1.84; color:#3c2408; overflow:hidden; margin-bottom:8px; }
.covenant { display:flex; align-items:flex-start; gap:10px; margin:6px 0; padding:6px 10px; background:rgba(201,149,42,.04); border-left:2px solid rgba(201,149,42,.22); border-radius:0 3px 3px 0; }
.cov-n { font-family:‘Cinzel’,serif; font-size:7.5px; color:rgba(160,108,18,.75); min-width:18px; margin-top:1px; letter-spacing:.1em; }
.cov-t { font-size:11.5px; line-height:1.76; color:#3c2408; font-family:‘IM Fell English’,serif; }
.cov-t strong { font-family:‘Cinzel’,serif; font-size:7.5px; letter-spacing:.08em; color:#5c3012; display:block; margin-bottom:1px; text-transform:uppercase; }
.oath { margin-top:12px; padding:10px 14px; border:1px solid rgba(201,149,42,.18); background:linear-gradient(135deg,rgba(245,225,155,.06),rgba(201,149,42,.03)); text-align:center; }
.oath-t { font-family:‘IM Fell English’,serif; font-style:italic; font-size:12px; line-height:1.8; color:#4c2e10; }
.s-sig { display:flex; align-items:flex-end; justify-content:space-between; gap:8px; margin-top:13px; }
.s-sig-txt { font-family:‘IM Fell English’,serif; font-style:italic; font-size:10px; color:rgba(100,62,18,.65); line-height:1.5; }
.s-sig-txt span { display:block; color:rgba(48,26,6,.82); font-size:11px; }
.s-sig-bar { flex:1; height:1px; background:rgba(160,108,38,.25); align-self:center; }
.s-sig-rose { font-size:17px; }
.s-cta { margin-top:15px; text-align:center; }
.s-btn { display:inline-block; padding:12px 28px; border:none; cursor:pointer; background:linear-gradient(148deg,#1c1008,#2a1804,#1c1008); color:#f7e8c8; font-family:‘Cinzel’,serif; font-size:9px; letter-spacing:.24em; text-transform:uppercase; box-shadow:0 0 0 1px rgba(201,149,42,.32),0 4px 14px rgba(0,0,0,.32); }
.s-note { display:block; margin-top:7px; font-family:‘IM Fell English’,serif; font-style:italic; font-size:11px; color:rgba(80,48,18,.38); }
.s-bot { text-align:center; margin-top:10px; font-family:‘Cinzel’,serif; font-size:7px; letter-spacing:.2em; color:rgba(160,108,38,.28); }
`
