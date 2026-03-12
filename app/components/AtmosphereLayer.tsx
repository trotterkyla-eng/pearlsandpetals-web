‘use client’
import { useEffect, useRef } from ‘react’

type AtmosphereVariant = ‘ballroom’ | ‘conservatory’ | ‘garden’ | ‘aerial’

interface AtmosphereLayerProps {
variant: AtmosphereVariant
}

export default function AtmosphereLayer({ variant }: AtmosphereLayerProps) {
const bokehRef   = useRef<HTMLCanvasElement>(null)
const grainRef   = useRef<HTMLCanvasElement>(null)
const extraRef   = useRef<HTMLCanvasElement>(null) // petals / pollen / nothing

/* ── Film grain ── */
useEffect(() => {
const canvas = grainRef.current
if (!canvas) return
const ctx = canvas.getContext(‘2d’)!
let raf: number
function resize() { canvas.width = innerWidth; canvas.height = innerHeight }
function tick() {
const img = ctx.createImageData(canvas.width, canvas.height)
const d = img.data
const opacity = variant === ‘aerial’ ? 14 : variant === ‘garden’ ? 16 : 18
for (let i = 0; i < d.length; i += 4) {
const v = (Math.random() * 255) | 0
d[i] = d[i + 1] = d[i + 2] = v; d[i + 3] = opacity
}
ctx.putImageData(img, 0, 0)
raf = requestAnimationFrame(tick)
}
resize(); tick()
addEventListener(‘resize’, resize)
return () => { cancelAnimationFrame(raf); removeEventListener(‘resize’, resize) }
}, [variant])

/* ── Bokeh ── */
useEffect(() => {
const canvas = bokehRef.current
if (!canvas) return
const ctx = canvas.getContext(‘2d’)!
let raf: number, BT = 0

```
const PALETTES: Record<AtmosphereVariant, number[][]> = {
  ballroom:     [[255,220,140],[255,200,110],[245,175,100],[240,190,160],[220,160,130],[255,230,180]],
  conservatory: [[220,200,130],[200,185,110],[215,195,120],[185,200,120],[200,210,130],[195,175,105]],
  garden:       [[255,200,140],[240,170,110],[255,190,130],[230,165,140],[220,150,130],[255,210,160]],
  aerial:       [[200,210,200],[185,200,190],[210,215,205],[220,210,180],[240,210,160],[180,200,215]],
}
const PAL = PALETTES[variant]

function resize() { canvas.width = innerWidth; canvas.height = innerHeight }

type Bokeh = { x:number; y:number; r:number; a:number; vx:number; vy:number; aV:number; col:number[]; phase:number; ring:boolean }
let particles: Bokeh[] = []

function init() {
  particles = Array.from({ length: 50 }, () => {
    const col = PAL[Math.floor(Math.random() * PAL.length)]
    return {
      x: Math.random() * canvas.width, y: Math.random() * canvas.height,
      r: 12 + Math.random() * 55, a: 0.008 + Math.random() * 0.06,
      vx: (Math.random() - .5) * .15, vy: -.04 - Math.random() * .13,
      aV: (Math.random() > .5 ? 1 : -1) * (.0007 + Math.random() * .002),
      col, phase: Math.random() * Math.PI * 2, ring: Math.random() > .5,
    }
  })
}

function tick() {
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  for (const p of particles) {
    p.x += p.vx + Math.sin(BT * .38 + p.phase) * .1
    p.y += p.vy; p.a += p.aV
    if (p.a > .072 || p.a < .005) p.aV *= -1
    if (p.y < -p.r * 2) { p.y = canvas.height + p.r; p.x = Math.random() * canvas.width }
    if (p.x < -p.r * 2) p.x = canvas.width + p.r
    if (p.x > canvas.width + p.r * 2) p.x = -p.r
    const [r, g, b] = p.col, alpha = Math.max(0, Math.min(.11, p.a))
    const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r)
    grad.addColorStop(0,   `rgba(${r},${g},${b},${alpha * .3})`)
    grad.addColorStop(.55, `rgba(${r},${g},${b},${alpha * .58})`)
    grad.addColorStop(.85, `rgba(${r},${g},${b},${alpha})`)
    grad.addColorStop(.94, `rgba(${r},${g},${b},${alpha * .65})`)
    grad.addColorStop(1,   `rgba(${r},${g},${b},0)`)
    ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
    ctx.fillStyle = grad; ctx.fill()
    if (p.ring && alpha > .022) {
      ctx.beginPath(); ctx.arc(p.x, p.y, p.r * .88, 0, Math.PI * 2)
      ctx.strokeStyle = `rgba(${r},${g},${b},${alpha * .45})`
      ctx.lineWidth = .65; ctx.stroke()
    }
  }
  BT += .008; raf = requestAnimationFrame(tick)
}
resize(); init(); tick()
addEventListener('resize', () => { resize(); init() })
return () => { cancelAnimationFrame(raf) }
```

}, [variant])

/* ── Petals (garden) / Pollen (conservatory) ── */
useEffect(() => {
const canvas = extraRef.current
if (!canvas || variant === ‘ballroom’ || variant === ‘aerial’) return
const ctx = canvas.getContext(‘2d’)!
let raf: number, T = 0

```
function resize() { canvas.width = innerWidth; canvas.height = innerHeight }

if (variant === 'garden') {
  const PCOLS = [[220,140,130,.6],[200,120,115,.5],[230,160,145,.55],[215,130,120,.5]]
  const petals = Array.from({ length: 28 }, (_, i) => ({
    x: Math.random() * innerWidth, y: Math.random() * innerHeight,
    r: 2 + Math.random() * 4, vx: (Math.random() - .5) * .35,
    vy: .18 + Math.random() * .4, rot: Math.random() * Math.PI * 2,
    rotV: (Math.random() - .5) * .025, sway: Math.random() * Math.PI * 2,
    swayS: .008 + Math.random() * .015, col: PCOLS[i % PCOLS.length], a: Math.random() * .7,
  }))
  function tick() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    for (const p of petals) {
      p.sway += p.swayS; p.x += p.vx + Math.sin(p.sway) * .4
      p.y += p.vy; p.rot += p.rotV
      if (p.y > canvas.height + 10) { p.y = -10; p.x = Math.random() * canvas.width; p.a = Math.random() * .7 }
      if (p.x < -10) p.x = canvas.width + 10; if (p.x > canvas.width + 10) p.x = -10
      const [r, g, b, baseA] = p.col
      ctx.save(); ctx.translate(p.x, p.y); ctx.rotate(p.rot)
      ctx.globalAlpha = p.a * baseA
      const pg = ctx.createRadialGradient(0, -p.r * .3, 0, 0, 0, p.r * 1.2)
      pg.addColorStop(0, `rgba(255,220,210,.9)`)
      pg.addColorStop(.4, `rgba(${r},${g},${b},.85)`)
      pg.addColorStop(1, `rgba(${r},${g},${b},0)`)
      ctx.fillStyle = pg
      ctx.beginPath(); ctx.ellipse(0, 0, p.r * .6, p.r, 0, 0, Math.PI * 2); ctx.fill()
      ctx.restore()
    }
    T += .01; raf = requestAnimationFrame(tick)
  }
  resize(); tick()
} else {
  // conservatory pollen
  const pollen = Array.from({ length: 35 }, () => ({
    x: Math.random() * innerWidth, y: Math.random() * innerHeight,
    r: .25 + Math.random() * .55, a: Math.random() * .35,
    vx: (Math.random() - .5) * .08, vy: -.025 - Math.random() * .07,
    aD: Math.random() > .5 ? 1 : -1, aS: .001 + Math.random() * .003,
  }))
  function tick() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    for (const p of pollen) {
      p.x += p.vx; p.y += p.vy; p.a += p.aS * p.aD
      if (p.a > .38 || p.a < 0) p.aD *= -1
      if (p.y < -4) p.y = canvas.height + 4
      if (p.x < -4) p.x = canvas.width + 4; if (p.x > canvas.width + 4) p.x = -4
      const g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 5)
      g.addColorStop(0, `rgba(220,200,120,${Math.max(0, p.a)})`)
      g.addColorStop(1, 'rgba(220,200,120,0)')
      ctx.fillStyle = g; ctx.beginPath(); ctx.arc(p.x, p.y, p.r * 5, 0, Math.PI * 2); ctx.fill()
    }
    T += .01; raf = requestAnimationFrame(tick)
  }
  resize(); tick()
}
addEventListener('resize', resize)
return () => { cancelAnimationFrame(raf); removeEventListener('resize', resize) }
```

}, [variant])

const BASE_STYLES: Record<AtmosphereVariant, React.CSSProperties> = {
ballroom: {
background: ‘linear-gradient(180deg,#080402 0%,#100804 40%,#0c0602 100%)’,
},
conservatory: {
background: ‘linear-gradient(170deg,#060504 0%,#0e0b06 45%,#080604 100%)’,
},
garden: {
background: ‘linear-gradient(180deg,#0a0604 0%,#160a04 18%,#241008 38%,#180c06 65%,#0e0804 100%)’,
},
aerial: {
background: ‘linear-gradient(160deg,#04060a 0%,#060a06 35%,#08080a 65%,#060806 100%)’,
},
}

return (
<>
{/* Base room */}
<div className="fixed inset-0 z-0" style={BASE_STYLES[variant]} />

```
  {/* Variant-specific CSS layers */}
  {variant === 'ballroom' && <BallroomLayers />}
  {variant === 'conservatory' && <ConservatoryLayers />}
  {variant === 'garden' && <GardenLayers />}
  {variant === 'aerial' && <AerialLayers />}

  {/* Bokeh */}
  <canvas ref={bokehRef} className="fixed inset-0 pointer-events-none" style={{ zIndex: 7 }} />

  {/* Extra (petals/pollen) */}
  <canvas ref={extraRef} className="fixed inset-0 pointer-events-none" style={{ zIndex: 8 }} />

  {/* Vignette */}
  <div className="fixed inset-0 pointer-events-none" style={{
    zIndex: 9,
    background: 'radial-gradient(ellipse 70% 72% at 50% 52%,transparent 30%,rgba(5,2,1,.72) 76%,rgba(2,1,0,.96) 100%)',
  }} />

  {/* Film grain */}
  <canvas ref={grainRef} className="fixed inset-0 pointer-events-none"
    style={{ zIndex: 18, opacity: variant === 'aerial' ? .28 : variant === 'garden' ? .3 : .32,
      animation: 'grainShift .085s steps(1) infinite' }} />

  <style>{`
    @keyframes grainShift {
      0%   { transform: translate(0,0) }
      25%  { transform: translate(-1px,1px) }
      50%  { transform: translate(1px,-1px) }
      75%  { transform: translate(-1px,-1px) }
      100% { transform: translate(1px,1px) }
    }
  `}</style>
</>
```

)
}

/* ── Per-variant CSS atmosphere layers ── */

function BallroomLayers() {
return <>
<div className=“fixed inset-0 pointer-events-none” style={{ zIndex:1, mixBlendMode:‘screen’,
background:`radial-gradient(ellipse 38% 55% at 50% 8%,rgba(255,230,160,.28) 0%,rgba(255,200,100,.12) 30%,transparent 65%), radial-gradient(ellipse 22% 35% at 50% 4%,rgba(255,245,200,.55) 0%,rgba(255,220,140,.2) 40%,transparent 70%), radial-gradient(ellipse 10% 18% at 50% 1%,rgba(255,255,240,.7) 0%,rgba(255,240,180,.4) 50%,transparent 100%)`,
animation:‘bloomBreathe 7s ease-in-out infinite’ }} />
<div className=“fixed pointer-events-none” style={{ zIndex:1, top:0, left:0, width:‘28%’, height:‘75%’,
background:`linear-gradient(108deg,transparent 0%,rgba(255,220,150,.07) 30%,rgba(255,210,130,.04) 60%,transparent 100%)`,
animation:‘shaftFlicker 9s ease-in-out infinite’ }} />
<div className=“fixed pointer-events-none” style={{ zIndex:1, top:0, right:0, width:‘28%’, height:‘75%’,
background:`linear-gradient(252deg,transparent 0%,rgba(255,220,150,.07) 30%,rgba(255,210,130,.04) 60%,transparent 100%)`,
animation:‘shaftFlicker 11s ease-in-out 2s infinite’ }} />
<div className=“fixed inset-0 pointer-events-none” style={{ zIndex:2,
background:`radial-gradient(ellipse 35% 45% at 8% 55%,rgba(220,150,50,.12) 0%,transparent 65%), radial-gradient(ellipse 30% 40% at 92% 50%,rgba(215,145,45,.1) 0%,transparent 62%), radial-gradient(ellipse 40% 25% at 50% 100%,rgba(180,110,30,.14) 0%,transparent 60%)`,
animation:‘ambientPulse 13s ease-in-out infinite’ }} />
<div className=“fixed pointer-events-none” style={{ zIndex:6, bottom:‘12%’, left:‘50%’, transform:‘translateX(-50%)’,
width:‘2px’, height:‘80%’, mixBlendMode:‘screen’,
background:‘linear-gradient(180deg,transparent 0%,rgba(255,210,100,.12) 30%,rgba(255,220,120,.22) 50%,rgba(255,210,100,.1) 70%,transparent 100%)’ }} />
<style>{`@keyframes bloomBreathe { 0%,100%{opacity:.85} 45%{opacity:1} 70%{opacity:.9} } @keyframes shaftFlicker  { 0%,100%{opacity:.7} 25%{opacity:.9} 50%{opacity:.75} 75%{opacity:1} } @keyframes ambientPulse  { 0%,100%{opacity:.8} 33%{opacity:1} 66%{opacity:.85} }`}</style>
</>
}

function ConservatoryLayers() {
return <>
<div className=“fixed pointer-events-none” style={{ zIndex:1, top:0, left:0, right:0, height:‘60%’, mixBlendMode:‘screen’,
background:`radial-gradient(ellipse 55% 70% at 50% -5%,rgba(220,200,140,.32) 0%,rgba(200,175,110,.14) 35%,transparent 70%), radial-gradient(ellipse 25% 65% at 18% -2%,rgba(210,190,130,.18) 0%,rgba(190,165,100,.08) 40%,transparent 72%), radial-gradient(ellipse 25% 65% at 82% -2%,rgba(210,190,130,.18) 0%,rgba(190,165,100,.08) 40%,transparent 72%)`,
animation:‘ceilingBreathe 10s ease-in-out infinite’ }} />
<div className=“fixed pointer-events-none” style={{ zIndex:2, top:0, left:0, right:0, height:‘42%’, opacity:.7,
transform:‘perspective(800px) rotateX(22deg)’, transformOrigin:‘top center’,
background:`repeating-linear-gradient(90deg,transparent 0px,transparent calc(12.5% - 1.5px),rgba(8,6,4,.55) calc(12.5% - 1.5px),rgba(8,6,4,.55) calc(12.5% + 1.5px),transparent calc(12.5% + 1.5px),transparent 12.5%), repeating-linear-gradient(180deg,transparent 0px,transparent calc(22% - 1px),rgba(8,6,4,.4) calc(22% - 1px),rgba(8,6,4,.4) calc(22% + 1px),transparent calc(22% + 1px),transparent 22%)` }} />
<div className=“fixed inset-0 pointer-events-none” style={{ zIndex:3,
background:`radial-gradient(ellipse 28% 22% at 6% 18%,rgba(4,8,4,.55) 0%,transparent 70%), radial-gradient(ellipse 32% 26% at 92% 12%,rgba(4,8,4,.5) 0%,transparent 70%), radial-gradient(ellipse 40% 25% at 8% 25%,rgba(20,35,12,.22) 0%,transparent 60%), radial-gradient(ellipse 35% 22% at 90% 20%,rgba(18,32,10,.2) 0%,transparent 58%)` }} />
<div className=“fixed inset-0 pointer-events-none” style={{ zIndex:4,
background:`radial-gradient(ellipse 14% 18% at 8% 72%,rgba(220,160,50,.14) 0%,transparent 60%), radial-gradient(ellipse 12% 16% at 92% 68%,rgba(215,155,45,.12) 0%,transparent 58%), radial-gradient(ellipse 18% 12% at 50% 95%,rgba(180,130,35,.1) 0%,transparent 55%)`,
animation:‘candleFlicker 6s ease-in-out infinite’ }} />
<style>{`@keyframes ceilingBreathe { 0%,100%{opacity:.85} 45%{opacity:1} 70%{opacity:.9} } @keyframes candleFlicker  { 0%,100%{opacity:.8} 22%{opacity:1} 38%{opacity:.75} 60%{opacity:.95} 82%{opacity:.7} }`}</style>
</>
}

function GardenLayers() {
return <>
<div className=“fixed pointer-events-none” style={{ zIndex:1, bottom:0, left:0, right:0, height:‘75%’,
background:`radial-gradient(ellipse 55% 28% at 50% 100%,rgba(255,200,80,.55) 0%,rgba(240,160,40,.28) 35%,transparent 65%), radial-gradient(ellipse 100% 45% at 50% 100%,rgba(220,140,40,.22) 0%,rgba(200,110,30,.1) 45%,transparent 70%), radial-gradient(ellipse 130% 55% at 50% 100%,rgba(200,110,80,.18) 0%,rgba(180,90,60,.08) 50%,transparent 72%)`,
animation:‘horizonGlow 12s ease-in-out infinite’ }} />
<div className=“fixed inset-0 pointer-events-none” style={{ zIndex:1,
background:`linear-gradient(180deg,rgba(40,18,30,.95) 0%,rgba(80,32,45,.75) 22%,rgba(140,70,60,.45) 48%,rgba(200,120,60,.2) 68%,transparent 100%)`,
mixBlendMode:‘multiply’ }} />
<div className=“fixed pointer-events-none” style={{ zIndex:2, bottom:‘12%’, left:‘50%’, transform:‘translateX(-50%)’,
width:‘600px’, height:‘400px’,
background:`radial-gradient(ellipse 25% 35% at 50% 85%,rgba(255,230,140,.45) 0%,rgba(255,200,80,.18) 40%,transparent 70%), radial-gradient(ellipse 45% 55% at 50% 90%,rgba(255,180,80,.18) 0%,rgba(240,140,50,.07) 55%,transparent 75%)`,
animation:‘sunPulse 8s ease-in-out infinite’ }} />
<div className=“fixed inset-0 pointer-events-none” style={{ zIndex:3,
background:`linear-gradient(165deg,transparent 0%,rgba(255,210,100,.04) 28%,transparent 60%), linear-gradient(152deg,transparent 15%,rgba(255,200,90,.035) 38%,transparent 68%), linear-gradient(140deg,transparent 25%,rgba(240,190,80,.028) 46%,transparent 62%)`,
animation:‘raysDrift 18s ease-in-out infinite’ }} />
<div className=“fixed pointer-events-none” style={{ zIndex:5, inset:0,
background:`radial-gradient(ellipse 50% 30% at 15% 45%,rgba(180,80,90,.08) 0%,transparent 60%), radial-gradient(ellipse 40% 25% at 85% 40%,rgba(170,75,85,.07) 0%,transparent 58%)`,
animation:‘hazeDrift 16s ease-in-out infinite’ }} />
<style>{`@keyframes horizonGlow { 0%,100%{opacity:.88} 45%{opacity:1} 70%{opacity:.92} } @keyframes sunPulse     { 0%,100%{opacity:.85} 50%{opacity:1} } @keyframes raysDrift    { 0%,100%{opacity:.7;transform:rotate(0deg)} 50%{opacity:1;transform:rotate(.3deg)} } @keyframes hazeDrift    { 0%,100%{opacity:.65} 50%{opacity:1} }`}</style>
</>
}

function AerialLayers() {
return <>
<div className=“fixed inset-0 pointer-events-none” style={{ zIndex:1,
background:`radial-gradient(ellipse 55% 50% at 78% 8%,rgba(220,225,255,.22) 0%,rgba(200,210,240,.1) 35%,transparent 65%), radial-gradient(ellipse 90% 60% at 65% 5%,rgba(180,190,220,.1) 0%,rgba(160,175,210,.04) 45%,transparent 70%)`,
animation:‘moonBreathe 14s ease-in-out infinite’ }} />
<div className=“fixed inset-0 pointer-events-none” style={{ zIndex:2, opacity:.75,
background:`repeating-linear-gradient(0deg,transparent 0px,transparent 68px,rgba(4,8,4,.45) 68px,rgba(4,8,4,.45) 76px,transparent 76px,transparent 90px,rgba(4,8,4,.3) 90px,rgba(4,8,4,.3) 96px), repeating-linear-gradient(90deg,transparent 0px,transparent 72px,rgba(4,8,4,.42) 72px,rgba(4,8,4,.42) 80px,transparent 80px,transparent 95px,rgba(4,8,4,.28) 95px,rgba(4,8,4,.28) 100px), repeating-linear-gradient(0deg,rgba(160,175,200,.025) 0px,rgba(160,175,200,.025) 1px,transparent 1px,transparent 68px)`,
animation:‘hedgeSway 20s ease-in-out infinite’ }} />
<div className=“fixed inset-0 pointer-events-none” style={{ zIndex:3,
background:`radial-gradient(ellipse 8% 5% at 22% 28%,rgba(180,80,90,.22) 0%,transparent 65%), radial-gradient(ellipse 6% 4% at 68% 18%,rgba(170,75,85,.18) 0%,transparent 60%), radial-gradient(ellipse 7% 5% at 82% 55%,rgba(185,85,95,.2) 0%,transparent 62%), radial-gradient(ellipse 5% 4% at 35% 72%,rgba(175,80,90,.17) 0%,transparent 58%), radial-gradient(ellipse 8% 5% at 55% 85%,rgba(180,82,92,.19) 0%,transparent 62%)`,
animation:‘roseGlow 9s ease-in-out infinite’ }} />
<div className=“fixed pointer-events-none” style={{ zIndex:4,
top:‘50%’, left:‘50%’, transform:‘translate(-50%,-50%)’, width:‘280px’, height:‘180px’,
background:`radial-gradient(ellipse 55% 60% at 50% 50%,rgba(180,195,230,.16) 0%,rgba(160,178,215,.08) 45%,transparent 72%)`,
animation:‘fountainShimmer 7s ease-in-out infinite’ }} />
<div className=“fixed inset-0 pointer-events-none” style={{ zIndex:5,
background:`radial-gradient(circle 8px at 15% 90%,rgba(255,200,80,.28) 0%,transparent 100%), radial-gradient(circle 8px at 28% 90%,rgba(255,195,75,.22) 0%,transparent 100%), radial-gradient(circle 8px at 41% 90%,rgba(255,200,80,.25) 0%,transparent 100%), radial-gradient(circle 8px at 60% 90%,rgba(255,195,75,.24) 0%,transparent 100%), radial-gradient(circle 7px at 8% 38%,rgba(255,200,80,.2) 0%,transparent 100%), radial-gradient(circle 7px at 92% 55%,rgba(255,196,76,.2) 0%,transparent 100%)`,
animation:‘lanternFlicker 5s ease-in-out infinite’ }} />
<style>{`@keyframes moonBreathe     { 0%,100%{opacity:.85} 50%{opacity:1} } @keyframes hedgeSway       { 0%,100%{opacity:.75} 50%{opacity:.88} } @keyframes roseGlow        { 0%,100%{opacity:.7} 45%{opacity:1} 70%{opacity:.8} } @keyframes fountainShimmer { 0%,100%{opacity:.7} 50%{opacity:1} } @keyframes lanternFlicker  { 0%,100%{opacity:.75} 20%{opacity:1} 45%{opacity:.65} 70%{opacity:.95} }`}</style>
</>
}
