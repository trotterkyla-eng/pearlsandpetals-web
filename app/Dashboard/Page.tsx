// app/dashboard/page.tsx
‘use client’

import { useEffect, useState } from ‘react’
import { useRouter } from ‘next/navigation’
import { createClient } from ‘@supabase/supabase-js’
import AtmosphereLayer from ‘@/components/AtmosphereLayer’

const supabase = createClient(
process.env.NEXT_PUBLIC_SUPABASE_URL!,
process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

const NAV = [
{ icon:‘🌿’, label:‘Garden’, tab:‘garden’ },
{ icon:‘🍯’, label:‘Hive’,   tab:‘hive’   },
{ icon:‘🕯️’, label:‘Events’, tab:‘events’ },
{ icon:‘💎’, label:‘Vault’,  tab:‘vault’  },
{ icon:‘🌸’, label:‘Profile’,tab:‘profile’},
]

const THREADS = [
{ avatar:‘🌸’, author:‘Camille R.’, text:“Has anyone tried the new pilates studio on Crescent? The founder is one of us — thought you should know. 🌿”, time:‘2 hours ago · 14 replies’, unread:true, a1:’#d4b0a0’, a2:’#8a5040’ },
{ avatar:‘💜’, author:‘Isadora M.’, text:‘The resource on emergency housing has been updated. Please share only within the garden walls.’, time:‘Yesterday · 7 replies’, unread:true, a1:’#c4a8b8’, a2:’#6a4060’ },
{ avatar:‘✨’, author:‘Nadia F.’,   text:“Reminder: the Spring Brunch is next Saturday. RSVP closes Thursday midnight. Dress: garden party.”, time:‘2 days ago · 22 replies’, unread:false, a1:’#c8b888’, a2:’#806830’ },
]

const EVENTS = [
{ month:‘Mar’, day:‘22’, name:‘Spring Brunch’,   where:‘The Orangerie, 11am’ },
{ month:‘Apr’, day:‘5’,  name:‘Healing Circle’,  where:‘Private · Sisters only’ },
{ month:‘Apr’, day:‘19’, name:‘Garden Pilates’,  where:‘Crescent Studio, 9am’ },
]

const RESOURCES = [
{ icon:‘🏠’, name:‘Emergency Housing Guide’,   cat:‘Safety · Updated Mar 2026’, badge:‘Updated’ },
{ icon:‘⚖️’, name:‘Legal Aid Directory’,        cat:‘Resources · 14 contacts’,   badge:’’ },
{ icon:‘💆’, name:‘Therapist Collective’,       cat:‘Wellness · Sisters-referred only’, badge:‘New’ },
{ icon:‘📋’, name:‘Financial Restart Workbook’, cat:‘Empowerment · Private PDF’,  badge:’’ },
]

type Member = { display_name: string; ring: string }

export default function DashboardPage() {
const router = useRouter()
const [activeTab, setActiveTab] = useState(‘garden’)
const [member, setMember] = useState<Member | null>(null)
const [sisterCount, setSisterCount] = useState(24)

useEffect(() => {
async function load() {
const { data: { user } } = await supabase.auth.getUser()
if (!user) { router.push(’/’); return }

```
  const { data } = await supabase
    .from('members')
    .select('display_name, ring')
    .eq('auth_user_id', user.id)
    .single()

  if (data) setMember(data)

  const { count } = await supabase
    .from('members')
    .select('*', { count: 'exact', head: true })
    .eq('status', 'active')

  setSisterCount(count ?? 24)
}
load()
```

}, [router])

const firstName = member?.display_name?.split(’ ’)[0] ?? ‘Sister’
const isFounder = member?.ring === ‘middle’
const ringLabel = isFounder ? ‘Founding Sister’ : ‘Sponsored Sister’

return (
<>
<AtmosphereLayer variant="aerial" />

```
  <div className="fixed inset-0 z-20 flex flex-col p-3 gap-2 overflow-y-auto">

    {/* Top bar */}
    <div className="top-bar">
      <div className="bar-left">
        <div className="bar-seal"><div className="bar-mono">P</div></div>
        <div>
          <div className="bar-name">Good evening, {firstName}</div>
          <div className="bar-sub">Pearls &amp; Petals · Chapter I</div>
        </div>
      </div>
      <div className="bar-right">
        <div className="bar-badge">{ringLabel}</div>
        <div className="notif">🔔<div className="notif-dot" /></div>
      </div>
    </div>

    {/* Main grid */}
    <div className="dash-grid">

      {/* Hive — wide */}
      <div className="panel panel-wide">
        <div className="panel-eyebrow">The Hive</div>
        <div className="panel-title">Sister Threads <span className="panel-icon">🍯</span></div>
        <div className="micro-rule" />
        {THREADS.map((t, i) => (
          <div key={i} className="thread">
            <div className="thread-avatar" style={{ background: `radial-gradient(circle at 35% 28%,${t.a1},${t.a2})` }}>
              {t.avatar}
            </div>
            <div className="thread-body">
              <div className="thread-author">{t.author}</div>
              <div className="thread-text">{t.text}</div>
              <div className="thread-time">{t.time}</div>
            </div>
            {t.unread && <div className="thread-unread" />}
          </div>
        ))}
      </div>

      {/* Ring status */}
      <div className="panel">
        <div className="panel-eyebrow">Your Ring</div>
        <div className="panel-title">Garden Status <span className="panel-icon">🌹</span></div>
        <div className="micro-rule" />
        <div className="ring-row">
          <div className="ring-icon">{isFounder ? '🌹' : '🌸'}</div>
          <div>
            <div className="r-name">{ringLabel}</div>
            <div className="r-pos">{isFounder ? 'Founding Circle' : 'Sponsored Circle'}</div>
          </div>
          <div className="sisters-count">
            <div className="sc-num">{sisterCount}</div>
            <div className="sc-lbl">sisters</div>
          </div>
        </div>
        <div className="arc-wrap">
          <svg width="80" height="80" style={{ transform: 'rotate(-90deg)' }}>
            <circle cx="40" cy="40" r="32" fill="none" stroke="rgba(201,149,42,.1)" strokeWidth="4" />
            <circle cx="40" cy="40" r="32" fill="none"
              stroke="url(#gold-grad)" strokeWidth="4"
              strokeDasharray="201"
              strokeDashoffset={201 - (201 * sisterCount / (isFounder ? 25 : 50))}
              strokeLinecap="round" />
            <defs>
              <linearGradient id="gold-grad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#e8c05a" />
                <stop offset="100%" stopColor="#c9952a" />
              </linearGradient>
            </defs>
            <text x="40" y="37" textAnchor="middle" fontFamily="Playfair Display, serif" fontSize="14" fill="#3a2408" fontStyle="italic" transform="rotate(90 40 40)">{sisterCount}</text>
            <text x="40" y="50" textAnchor="middle" fontFamily="Cinzel, serif" fontSize="6" fill="rgba(140,100,30,.5)" letterSpacing="1" transform="rotate(90 40 40)">of {isFounder ? 25 : 50}</text>
          </svg>
        </div>
        <p className="arc-note">One seat remains in<br />the founding chapter.</p>
      </div>

      {/* Events */}
      <div className="panel">
        <div className="panel-eyebrow">Gatherings</div>
        <div className="panel-title">Upcoming <span className="panel-icon">🕯️</span></div>
        <div className="micro-rule" />
        {EVENTS.map((e, i) => (
          <div key={i} className="event">
            <div className="event-date">
              <div className="event-month">{e.month}</div>
              <div className="event-day">{e.day}</div>
            </div>
            <div>
              <div className="event-name">{e.name}</div>
              <div className="event-where">{e.where}</div>
              <div className="event-rsvp">RSVP ✦</div>
            </div>
          </div>
        ))}
      </div>

      {/* Vault — wide */}
      <div className="panel panel-wide">
        <div className="panel-eyebrow">The Vault</div>
        <div className="panel-title">Private Resources <span className="panel-icon">💎</span></div>
        <div className="micro-rule" />
        {RESOURCES.map((r, i) => (
          <div key={i} className="resource">
            <div className="res-icon">{r.icon}</div>
            <div>
              <div className="res-name">{r.name}</div>
              <div className="res-cat">{r.cat}</div>
            </div>
            {r.badge && <div className="res-badge">{r.badge}</div>}
          </div>
        ))}
      </div>

    </div>

    {/* Bottom nav */}
    <div className="nav-bar">
      {NAV.map(n => (
        <div key={n.tab}
          className={`nav-item ${activeTab === n.tab ? 'active' : ''}`}
          onClick={() => setActiveTab(n.tab)}>
          <div className="nav-icon">{n.icon}</div>
          <div className="nav-label">{n.label}</div>
        </div>
      ))}
    </div>

  </div>

  <style>{DASH_STYLES}</style>
</>
```

)
}

const DASH_STYLES = `
@import url(‘https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,700;1,400&family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&family=Cinzel:wght@400;500&family=IM+Fell+English:ital@0;1&display=swap’);

@keyframes barIn  { from{opacity:0;transform:translateY(-14px)} to{opacity:1;transform:translateY(0)} }
@keyframes gridIn { from{opacity:0;transform:translateY(18px)} to{opacity:1;transform:translateY(0)} }
@keyframes navIn  { from{opacity:0;transform:translateY(14px)} to{opacity:1;transform:translateY(0)} }

.top-bar { display:flex; align-items:center; justify-content:space-between; padding:12px 16px; background:rgba(253,244,232,.92); border:1px solid rgba(201,149,42,.22); border-radius:4px; backdrop-filter:blur(12px); box-shadow:0 4px 24px rgba(0,0,0,.35),inset 0 1px 0 rgba(255,255,255,.5); animation:barIn 1.8s cubic-bezier(.16,1,.3,1) .3s both; flex-shrink:0; }
.bar-left { display:flex; align-items:center; gap:10px; }
.bar-seal { width:34px; height:34px; border-radius:50%; flex-shrink:0; background:radial-gradient(circle at 33% 27%,rgba(255,245,180,.3),rgba(201,149,42,.52) 46%,rgba(90,58,6,.95) 100%); border:1.5px solid rgba(201,149,42,.45); display:flex; align-items:center; justify-content:center; box-shadow:0 2px 8px rgba(0,0,0,.3),0 0 12px rgba(201,149,42,.15); }
.bar-mono { font-family:‘Cinzel’,serif; font-size:14px; color:rgba(245,228,168,.9); }
.bar-name { font-family:‘Playfair Display’,serif; font-style:italic; font-size:15px; color:#100e08; line-height:1; }
.bar-sub  { font-family:‘Cinzel’,serif; font-size:6.5px; letter-spacing:.18em; text-transform:uppercase; color:rgba(140,100,30,.55); margin-top:2px; }
.bar-right { display:flex; align-items:center; gap:8px; }
.bar-badge { padding:4px 10px; border:1px solid rgba(201,149,42,.25); border-radius:99px; font-family:‘Cinzel’,serif; font-size:7px; letter-spacing:.14em; text-transform:uppercase; color:rgba(140,100,30,.65); background:rgba(201,149,42,.06); }
.notif { width:28px; height:28px; border-radius:50%; border:1px solid rgba(201,149,42,.25); background:rgba(201,149,42,.05); display:flex; align-items:center; justify-content:center; font-size:12px; cursor:pointer; position:relative; }
.notif-dot { position:absolute; top:-2px; right:-2px; width:7px; height:7px; border-radius:50%; background:#c47878; border:1.5px solid #fdf4e8; box-shadow:0 0 6px rgba(196,120,120,.5); }

.dash-grid { display:grid; grid-template-columns:1fr 1fr; gap:10px; flex:1; min-height:0; animation:gridIn 2s cubic-bezier(.16,1,.3,1) .5s both; }
.panel { background:rgba(253,244,232,.9); border:1px solid rgba(201,149,42,.18); border-radius:4px; backdrop-filter:blur(14px); box-shadow:0 4px 20px rgba(0,0,0,.3),inset 0 1px 0 rgba(255,255,255,.55); padding:14px; position:relative; overflow:hidden; }
.panel::before { content:’’; position:absolute; top:0; left:0; right:0; height:1px; background:linear-gradient(90deg,transparent,rgba(201,149,42,.3),transparent); }
.panel-wide { grid-column:span 2; }
.panel-eyebrow { font-family:‘Cinzel’,serif; font-size:6.5px; letter-spacing:.22em; text-transform:uppercase; color:rgba(140,100,30,.5); margin-bottom:5px; }
.panel-title { font-family:‘Playfair Display’,serif; font-style:italic; font-size:15px; color:#100e08; margin-bottom:10px; display:flex; align-items:center; justify-content:space-between; }
.panel-icon { font-size:14px; filter:drop-shadow(0 0 5px rgba(201,149,42,.35)); }
.micro-rule { height:1px; background:linear-gradient(90deg,rgba(201,149,42,.25),transparent); margin-bottom:10px; }

.thread { display:flex; gap:10px; padding:7px 0; border-bottom:1px solid rgba(201,149,42,.08); }
.thread:last-child { border-bottom:none; padding-bottom:0; }
.thread-avatar { width:28px; height:28px; border-radius:50%; flex-shrink:0; border:1.5px solid rgba(201,149,42,.2); display:flex; align-items:center; justify-content:center; font-size:11px; }
.thread-body { flex:1; }
.thread-author { font-family:‘Cinzel’,serif; font-size:7px; letter-spacing:.1em; color:rgba(120,80,30,.7); text-transform:uppercase; }
.thread-text { font-family:‘IM Fell English’,serif; font-style:italic; font-size:12px; color:rgba(40,26,8,.68); line-height:1.5; margin-top:1px; }
.thread-time { font-family:‘Cinzel’,serif; font-size:6px; letter-spacing:.08em; color:rgba(140,100,40,.35); margin-top:3px; }
.thread-unread { width:6px; height:6px; border-radius:50%; background:#c87878; flex-shrink:0; margin-top:4px; box-shadow:0 0 5px rgba(200,120,120,.5); }

.ring-row { display:flex; align-items:center; gap:8px; margin-bottom:8px; }
.ring-icon { font-size:18px; filter:drop-shadow(0 0 6px rgba(201,149,42,.4)); }
.r-name { font-family:‘Playfair Display’,serif; font-style:italic; font-size:14px; color:#100e08; }
.r-pos  { font-family:‘Cinzel’,serif; font-size:7px; letter-spacing:.14em; color:rgba(140,100,30,.5); text-transform:uppercase; }
.sisters-count { margin-left:auto; text-align:right; }
.sc-num { font-family:‘Playfair Display’,serif; font-size:22px; color:rgba(160,110,40,.45); line-height:1; }
.sc-lbl { font-family:‘Cinzel’,serif; font-size:6px; letter-spacing:.14em; color:rgba(140,100,30,.38); text-transform:uppercase; }
.arc-wrap { display:flex; justify-content:center; margin:4px 0 6px; }
.arc-note { font-family:‘IM Fell English’,serif; font-style:italic; font-size:11px; color:rgba(80,55,20,.48); text-align:center; line-height:1.6; }

.event { display:flex; gap:10px; align-items:flex-start; padding:7px 0; border-bottom:1px solid rgba(201,149,42,.08); }
.event:last-child { border-bottom:none; padding-bottom:0; }
.event-date { flex-shrink:0; text-align:center; width:32px; padding:4px; background:linear-gradient(135deg,rgba(201,149,42,.1),rgba(201,149,42,.06)); border:1px solid rgba(201,149,42,.2); border-radius:2px; }
.event-month { font-family:‘Cinzel’,serif; font-size:6px; letter-spacing:.12em; color:rgba(160,110,30,.65); text-transform:uppercase; }
.event-day   { font-family:‘Playfair Display’,serif; font-size:16px; color:#100e08; line-height:1.1; }
.event-name  { font-family:‘Playfair Display’,serif; font-style:italic; font-size:13px; color:#100e08; }
.event-where { font-family:‘IM Fell English’,serif; font-style:italic; font-size:11px; color:rgba(80,55,20,.5); margin-top:2px; }
.event-rsvp  { margin-top:4px; display:inline-block; font-family:‘Cinzel’,serif; font-size:6.5px; letter-spacing:.14em; text-transform:uppercase; color:rgba(160,110,30,.55); border:1px solid rgba(201,149,42,.22); padding:2px 8px; border-radius:99px; cursor:pointer; }

.resource { display:flex; align-items:center; gap:9px; padding:6px 0; border-bottom:1px solid rgba(201,149,42,.08); }
.resource:last-child { border-bottom:none; padding-bottom:0; }
.res-icon { font-size:16px; flex-shrink:0; filter:drop-shadow(0 0 4px rgba(201,149,42,.3)); }
.res-name { font-family:‘Playfair Display’,serif; font-style:italic; font-size:12.5px; color:#100e08; }
.res-cat  { font-family:‘Cinzel’,serif; font-size:6px; letter-spacing:.12em; color:rgba(140,100,30,.45); text-transform:uppercase; margin-top:1px; }
.res-badge { margin-left:auto; font-family:‘Cinzel’,serif; font-size:6px; letter-spacing:.1em; text-transform:uppercase; color:#c47878; background:rgba(196,120,120,.1); border:1px solid rgba(196,120,120,.25); padding:2px 7px; border-radius:99px; flex-shrink:0; }

.nav-bar { display:flex; justify-content:space-around; align-items:center; padding:10px 0 8px; background:rgba(253,244,232,.93); border:1px solid rgba(201,149,42,.2); border-radius:4px; backdrop-filter:blur(12px); box-shadow:0 -2px 16px rgba(0,0,0,.2),inset 0 1px 0 rgba(255,255,255,.5); flex-shrink:0; animation:navIn 1.8s cubic-bezier(.16,1,.3,1) .7s both; }
.nav-item { display:flex; flex-direction:column; align-items:center; gap:3px; cursor:pointer; padding:0 12px; transition:all .25s; opacity:.45; }
.nav-item.active { opacity:1; }
.nav-icon { font-size:18px; }
.nav-item.active .nav-icon { filter:drop-shadow(0 0 6px rgba(201,149,42,.5)); }
.nav-label { font-family:‘Cinzel’,serif; font-size:6px; letter-spacing:.14em; text-transform:uppercase; color:rgba(100,70,22,.65); }
.nav-item.active .nav-label { color:rgba(140,95,25,.85); }
`
