// app/invite/join/page.tsx
‘use client’

import { useState } from ‘react’
import { useRouter, useSearchParams } from ‘next/navigation’
import { createClient } from ‘@supabase/supabase-js’
import AtmosphereLayer from ‘@/components/AtmosphereLayer’

const supabase = createClient(
process.env.NEXT_PUBLIC_SUPABASE_URL!,
process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

const STEP_NAMES = [‘Your Credentials’, ‘Your Portrait’, ‘Your Answers’, ‘Review & Submit’]

type FormData = {
displayName: string
email: string
password: string
password2: string
phone: string
city: string
bio: string
skills: string
sponsorName: string
q1: string
q2: string
}

export default function JoinPage() {
const router = useRouter()
const params = useSearchParams()
const tokenSlug = params.get(‘token’) ?? ‘’

const [step, setStep] = useState(1)
const [loading, setLoading] = useState(false)
const [error, setError] = useState(’’)
const [success, setSuccess] = useState(false)

const [form, setForm] = useState<FormData>({
displayName: ‘’, email: ‘’, password: ‘’, password2: ‘’,
phone: ‘’, city: ‘’, bio: ‘’, skills: ‘’,
sponsorName: ‘’, q1: ‘’, q2: ‘’,
})

function set(k: keyof FormData, v: string) {
setForm(f => ({ …f, [k]: v }))
}

async function submit() {
setLoading(true); setError(’’)
try {
const { data: auth, error: authErr } = await supabase.auth.signUp({
email: form.email, password: form.password,
})
if (authErr) throw authErr

```
  // Count existing members to determine ring
  const { count } = await supabase.from('members').select('*', { count: 'exact', head: true })
  const memberCount = count ?? 0
  const ring = memberCount < 25 ? 'middle' : 'outer'

  const { error: memberErr } = await supabase.from('members').insert({
    auth_user_id: auth.user!.id,
    display_name: form.displayName,
    email: form.email,
    phone: form.phone || null,
    city: form.city || null,
    bio: form.bio || null,
    skills: form.skills || null,
    sponsor_name: form.sponsorName || null,
    application_q1: form.q1 || null,
    application_q2: form.q2 || null,
    ring,
    status: 'pending',
    invite_token: tokenSlug,
  })
  if (memberErr) throw memberErr

  await supabase.rpc('increment_token_use', { token_slug: tokenSlug })
  setSuccess(true)
  setTimeout(() => router.push('/invite/welcome'), 2200)
} catch (e: unknown) {
  setError(e instanceof Error ? e.message : 'Something went wrong. Please try again.')
} finally {
  setLoading(false)
}
```

}

const pct = `${step * 25}%`

return (
<>
<AtmosphereLayer variant="conservatory" />

```
  <div className="fixed inset-0 z-20 flex items-center justify-center p-4 overflow-y-auto">
    <div className="form-card">
      <div className="card-frame" />

      {/* Corners */}
      <ConservatoryCorners />

      <div className="card-surface">

        {/* Header */}
        <div className="card-header">
          <div className="header-seal"><div className="hs-ring"/><div className="hs-disc"><div className="hs-mono">P</div></div></div>
          <p className="header-eyebrow">Pearls &amp; Petals · Your Petition to Bloom</p>
          <h1 className="header-title">The <em>Application</em></h1>
          <p className="header-sub">Four steps. Four truths. Tell us who you are.</p>
        </div>

        {/* Progress */}
        {!success && (
          <div className="progress-wrap">
            <div className="progress-label">
              <span className="prog-txt">Step {step} of 4</span>
              <span className="prog-txt">{STEP_NAMES[step - 1]}</span>
            </div>
            <div className="progress-track">
              <div className="progress-fill" style={{ width: pct }} />
            </div>
            <div className="step-dots">
              {[1,2,3,4].map(n => (
                <div key={n} className={`dot ${n === step ? 'active' : n < step ? 'done' : ''}`} />
              ))}
            </div>
          </div>
        )}

        {/* Steps */}
        <div className="form-body">
          {!success ? <>
            {step === 1 && (
              <div className="step-panel">
                <div className="step-title"><span className="step-num">I</span>Your Credentials</div>
                <Field label="Your Name in the Garden"><input className="field-input" placeholder="How sisters will know you…" value={form.displayName} onChange={e => set('displayName', e.target.value)} /></Field>
                <Field label="Your Private Correspondence"><input className="field-input" type="email" placeholder="Your email address" value={form.email} onChange={e => set('email', e.target.value)} /></Field>
                <div className="field-row">
                  <Field label="A Secret Word"><input className="field-input" type="password" placeholder="Password" value={form.password} onChange={e => set('password', e.target.value)} /></Field>
                  <Field label="Confirm It"><input className="field-input" type="password" placeholder="Once more" value={form.password2} onChange={e => set('password2', e.target.value)} /></Field>
                </div>
              </div>
            )}
            {step === 2 && (
              <div className="step-panel">
                <div className="step-title"><span className="step-num">II</span>Your Portrait</div>
                <div className="field-row">
                  <Field label="Your City"><input className="field-input" placeholder="Where you bloom" value={form.city} onChange={e => set('city', e.target.value)} /></Field>
                  <Field label="Your Phone"><input className="field-input" type="tel" placeholder="Optional" value={form.phone} onChange={e => set('phone', e.target.value)} /></Field>
                </div>
                <Field label="Who You Are"><textarea className="field-input" placeholder="A few sentences. What would a sister know about you at first glance?" value={form.bio} onChange={e => set('bio', e.target.value)} /></Field>
                <Field label="What You Bring to the Garden"><input className="field-input" placeholder="Your gifts, your craft, your calling…" value={form.skills} onChange={e => set('skills', e.target.value)} /></Field>
              </div>
            )}
            {step === 3 && (
              <div className="step-panel">
                <div className="step-title"><span className="step-num">III</span>Your Answers</div>
                <Field label="Who Carried Your Name Here?" hint="The sister who extended your invitation."><input className="field-input" placeholder="Your sponsor's name" value={form.sponsorName} onChange={e => set('sponsorName', e.target.value)} /></Field>
                <div className="gold-rule"><div className="gr-line"/><div className="gr-dia"/><div className="gr-line"/></div>
                <Field label="What draws you to this garden?"><textarea className="field-input" style={{ height: 68 }} placeholder="Speak honestly. The garden is listening…" value={form.q1} onChange={e => set('q1', e.target.value)} /></Field>
                <Field label="Why is this your season to bloom?"><textarea className="field-input" style={{ height: 68 }} placeholder="This moment, this chapter of your life…" value={form.q2} onChange={e => set('q2', e.target.value)} /></Field>
              </div>
            )}
            {step === 4 && (
              <div className="step-panel">
                <div className="step-title"><span className="step-num">IV</span>Review & Submit</div>
                {[
                  { k: 'Garden Name', v: form.displayName },
                  { k: 'Email', v: form.email },
                  { k: 'City', v: form.city },
                  { k: 'Skills', v: form.skills },
                  { k: 'Sponsor', v: form.sponsorName },
                  { k: 'Why the Garden', v: form.q1 },
                  { k: 'Your Season', v: form.q2 },
                ].map(({ k, v }) => (
                  <div key={k} className="review-item">
                    <span className="review-key">{k}</span>
                    <span className="review-val">{v || '—'}</span>
                  </div>
                ))}
                {error && <p className="error-msg">{error}</p>}
                <p className="review-note">By submitting, you acknowledge that your application will be reviewed by the founding sisters. You will be contacted within 72 hours.</p>
              </div>
            )}
          </> : (
            <div className="success-panel">
              <div className="success-icon">🌸</div>
              <h2 className="success-title">Your petition has been received.</h2>
              <p className="success-sub">The garden has taken note of your name.<br />A sister will reach you within 72 hours.<br /><br /><em>Until then — tend your own garden, darling.</em></p>
            </div>
          )}
        </div>

        {/* Footer */}
        {!success && (
          <div className="form-footer">
            <div className="btn-row">
              {step > 1 && <button className="btn-secondary" onClick={() => setStep(s => s - 1)}>← Back</button>}
              <button className="btn-primary" disabled={loading}
                onClick={() => step < 4 ? setStep(s => s + 1) : submit()}>
                {loading ? 'Submitting…' : step === 4 ? 'Submit Petition  ✦' : 'Continue  ✦'}
              </button>
            </div>
            <p className="footer-note">bloomsoftly.org · Chapter I · Est. MMXXIV</p>
          </div>
        )}

      </div>
    </div>
  </div>

  <style>{JOIN_STYLES}</style>
</>
```

)
}

function Field({ label, hint, children }: { label: string; hint?: string; children: React.ReactNode }) {
return (
<div className="field">
<label className="field-label">{label}</label>
{children}
{hint && <p className="field-hint">{hint}</p>}
</div>
)
}

function ConservatoryCorners() {
return <>
{[
{ style: { top:-1, left:-1 } },
{ style: { top:-1, right:-1, transform:‘scaleX(-1)’ } },
{ style: { bottom:-1, left:-1, transform:‘scaleY(-1)’ } },
{ style: { bottom:-1, right:-1, transform:‘scale(-1,-1)’ } },
].map((c, i) => (
<div key={i} style={{ position:‘absolute’, zIndex:5, pointerEvents:‘none’, width:38, height:38, …c.style }}>
<svg viewBox="0 0 38 38">
<path d="M1,1 L24,1 Q35,1 35,12 L35,17 L32,17 Q32,9 24,7 L1,7Z" fill="rgba(184,134,11,.46)" />
<path d="M1,1 L3,1 L3,37 L1,37Z" fill="rgba(184,134,11,.5)" />
<circle cx="15" cy="13" r="3" fill="none" stroke="rgba(184,134,11,.38)" strokeWidth=".8" />
<path d="M8,22 L10.5,18.5 L13,22 L10.5,25.5Z" fill="rgba(184,134,11,.32)" />
</svg>
</div>
))}
</>
}

const JOIN_STYLES = `
@import url(‘https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,700;1,400&family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=Cinzel:wght@400;500&family=IM+Fell+English:ital@0;1&display=swap’);

@keyframes frameSpin { to { rotate: 360deg } }
@keyframes cardIn    { from{opacity:0;transform:translateY(28px) scale(.94);filter:blur(10px)} to{opacity:1;transform:translateY(0) scale(1);filter:blur(0)} }
@keyframes stepIn    { from{opacity:0;transform:translateX(12px)} to{opacity:1;transform:translateX(0)} }

.form-card { width:min(400px,92vw); position:relative; animation:cardIn 2s cubic-bezier(.16,1,.3,1) .6s both; filter:drop-shadow(0 28px 90px rgba(0,0,0,.75)); }
.card-frame { position:absolute; inset:-2px; border-radius:5px; animation:frameSpin 14s linear infinite; -webkit-mask:linear-gradient(#fff 0 0) content-box,linear-gradient(#fff 0 0); -webkit-mask-composite:xor; mask-composite:exclude; padding:2px; background:conic-gradient(rgba(240,216,120,.92) 0deg,rgba(140,100,14,.55) 60deg,rgba(240,216,120,.95) 120deg,rgba(160,118,18,.5) 180deg,rgba(240,216,120,.9) 240deg,rgba(140,100,14,.55) 300deg,rgba(240,216,120,.92) 360deg); }
.card-surface { position:relative; z-index:2; border-radius:4px; overflow:hidden; background:radial-gradient(ellipse 60% 42% at 25% 16%,rgba(255,248,220,.22) 0%,transparent 58%),linear-gradient(162deg,#fefbf3 0%,#fbf5e8 28%,#f8efda 60%,#faf3e6 100%); box-shadow:inset 12px 0 26px rgba(160,130,50,.05),inset -12px 0 26px rgba(160,130,50,.05); }
.card-header { padding:20px 26px 16px; text-align:center; border-bottom:1px solid rgba(184,134,11,.1); }
.header-seal { width:46px; height:46px; margin:0 auto 10px; position:relative; filter:drop-shadow(0 3px 10px rgba(0,0,0,.3)); }
.hs-ring { position:absolute; inset:-4px; border-radius:50%; border:1px solid rgba(184,134,11,.25); }
.hs-disc { position:absolute; inset:0; border-radius:50%; background:radial-gradient(circle at 33% 27%,rgba(255,245,180,.3),rgba(200,155,35,.52) 46%,rgba(90,58,6,.95) 100%); display:flex; align-items:center; justify-content:center; box-shadow:0 3px 10px rgba(0,0,0,.38); }
.hs-mono { font-family:‘Cinzel’,serif; font-size:16px; color:rgba(245,225,155,.88); }
.header-eyebrow { font-family:‘Cinzel’,serif; font-size:7px; letter-spacing:.28em; text-transform:uppercase; color:rgba(140,100,14,.6); display:block; margin-bottom:6px; }
.header-title { font-family:‘Playfair Display’,serif; font-weight:700; font-size:20px; color:#12100a; margin-bottom:3px; }
.header-title em { font-style:italic; color:#8a5a0e; }
.header-sub { font-family:‘IM Fell English’,serif; font-style:italic; font-size:12.5px; color:rgba(40,28,10,.55); line-height:1.6; }
.progress-wrap { padding:14px 26px 0; }
.progress-label { display:flex; justify-content:space-between; margin-bottom:6px; }
.prog-txt { font-family:‘Cinzel’,serif; font-size:6.5px; letter-spacing:.2em; text-transform:uppercase; color:rgba(140,100,14,.5); }
.progress-track { height:2px; background:rgba(184,134,11,.12); border-radius:1px; overflow:hidden; }
.progress-fill { height:100%; border-radius:1px; background:linear-gradient(90deg,#b8860b,#d4a520,#f0d878); transition:width .8s cubic-bezier(.16,1,.3,1); box-shadow:0 0 8px rgba(184,134,11,.35); }
.step-dots { display:flex; justify-content:center; gap:10px; margin-top:10px; }
.dot { width:7px; height:7px; border-radius:50%; border:1px solid rgba(184,134,11,.3); background:transparent; transition:all .4s; }
.dot.active { background:linear-gradient(135deg,#d4a520,#b8860b); border-color:rgba(184,134,11,.6); box-shadow:0 0 8px rgba(184,134,11,.3); }
.dot.done { background:rgba(184,134,11,.25); border-color:rgba(184,134,11,.4); }
.form-body { padding:20px 26px 6px; }
.step-panel { animation:stepIn .5s cubic-bezier(.16,1,.3,1) both; }
.step-title { font-family:‘Playfair Display’,serif; font-style:italic; font-size:15px; color:#12100a; margin-bottom:14px; display:flex; align-items:center; gap:8px; }
.step-title::after { content:’’; flex:1; height:1px; background:linear-gradient(90deg,rgba(184,134,11,.3),transparent); }
.step-num { font-family:‘Cinzel’,serif; font-size:8px; letter-spacing:.1em; color:rgba(184,134,11,.6); background:rgba(184,134,11,.08); padding:3px 8px; border-radius:99px; border:1px solid rgba(184,134,11,.18); }
.field { margin-bottom:14px; }
.field-label { font-family:‘Cinzel’,serif; font-size:7.5px; letter-spacing:.2em; text-transform:uppercase; color:rgba(100,72,14,.65); display:block; margin-bottom:6px; }
.field-input { width:100%; padding:10px 13px; background:rgba(255,255,255,.42); border:1px solid rgba(184,134,11,.2); border-radius:2px; font-family:‘Cormorant Garamond’,serif; font-size:14px; color:#12100a; outline:none; transition:all .3s; resize:none; height:80px; }
input.field-input { height:auto; }
.field-input::placeholder { color:rgba(100,72,14,.32); font-style:italic; }
.field-input:focus { border-color:rgba(184,134,11,.45); background:rgba(255,255,255,.62); box-shadow:0 0 0 3px rgba(184,134,11,.06); }
.field-row { display:grid; grid-template-columns:1fr 1fr; gap:10px; }
.field-hint { font-family:‘IM Fell English’,serif; font-style:italic; font-size:10.5px; color:rgba(100,72,14,.42); margin-top:4px; }
.gold-rule { display:flex; align-items:center; gap:8px; margin:10px 0; }
.gr-line { flex:1; height:1px; background:linear-gradient(90deg,transparent,rgba(184,134,11,.4),transparent); }
.gr-dia { width:5px; height:5px; background:linear-gradient(135deg,#f0d878,#b8860b); transform:rotate(45deg); flex-shrink:0; }
.review-item { display:flex; gap:12px; padding:8px 0; border-bottom:1px solid rgba(184,134,11,.1); }
.review-item:last-child { border-bottom:none; }
.review-key { font-family:‘Cinzel’,serif; font-size:7px; letter-spacing:.16em; color:rgba(140,100,14,.55); text-transform:uppercase; min-width:70px; padding-top:2px; }
.review-val { font-family:‘Cormorant Garamond’,serif; font-size:13px; color:rgba(30,20,8,.7); line-height:1.55; font-style:italic; }
.review-note { font-family:‘IM Fell English’,serif; font-style:italic; font-size:12px; color:rgba(60,42,14,.55); line-height:1.72; text-align:center; margin-top:12px; }
.error-msg { font-family:‘Cinzel’,serif; font-size:10px; color:#c04040; text-align:center; margin:8px 0; padding:8px; background:rgba(200,60,60,.06); border:1px solid rgba(200,60,60,.2); border-radius:2px; }
.success-panel { text-align:center; padding:20px 0; animation:stepIn .6s ease both; }
.success-icon { font-size:40px; margin-bottom:12px; display:block; }
.success-title { font-family:‘Playfair Display’,serif; font-size:20px; font-style:italic; color:#12100a; margin-bottom:6px; }
.success-sub { font-family:‘IM Fell English’,serif; font-style:italic; font-size:13px; color:rgba(60,42,14,.6); line-height:1.8; }
.form-footer { padding:16px 26px 20px; border-top:1px solid rgba(184,134,11,.1); }
.btn-row { display:flex; gap:10px; }
.btn-primary { flex:1; padding:13px; border:none; cursor:pointer; background:linear-gradient(155deg,#1c1408 0%,#281c06 50%,#1c1408 100%); color:#f5e6c0; font-family:‘Cinzel’,serif; font-size:9px; letter-spacing:.24em; text-transform:uppercase; box-shadow:0 2px 8px rgba(0,0,0,.32),0 0 0 1px rgba(184,134,11,.28); transition:all .3s; }
.btn-primary:disabled { opacity:.6; cursor:not-allowed; }
.btn-secondary { padding:13px 16px; border:1px solid rgba(184,134,11,.2); background:transparent; cursor:pointer; font-family:‘Cinzel’,serif; font-size:9px; letter-spacing:.18em; text-transform:uppercase; color:rgba(120,86,14,.5); transition:all .3s; }
.footer-note { font-family:‘Cinzel’,serif; font-size:6px; letter-spacing:.16em; color:rgba(140,100,14,.28); text-align:center; margin-top:12px; text-transform:uppercase; }
`
