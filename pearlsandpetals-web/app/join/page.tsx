import { Shell } from "@/components/Shell";

export default function Join() {
  return (
    <Shell active="join">
      <div className="rounded-xl2 border border-pearl-100 bg-white/85 shadow-soft p-10">
        <div className="text-xs tracking-[0.3em] uppercase text-ink/60">Join</div>
        <h1 className="mt-4 font-serif text-5xl tracking-wide">Pearls & Petals</h1>
        <p className="mt-4 text-ink/70 text-lg leading-relaxed max-w-3xl">
          Seasonal enrollment is open for the <b>Pearl Pink Spring Chapter</b>. We keep it small on purpose to protect privacy and culture.
        </p>

        <div className="mt-10 rounded-xl2 border border-pearl-100 bg-pearl-50 p-10">
          <div className="inline-flex items-center rounded-full border border-champagne-400/60 bg-white/70 px-4 py-1.5 text-sm">
            Pearl Pink Founders
          </div>
          <div className="mt-4 font-serif text-3xl">Our first 25 culture-carriers.</div>
          <p className="mt-3 text-ink/70 leading-relaxed max-w-3xl">
            Calm builders. Privacy-first. Community with boundaries. Approved members receive the Pearl Pink Founders badge inside the app.
          </p>

          <button className="mt-6 px-6 py-3.5 rounded-full bg-rose-500 text-white shadow-soft">
            Apply in The Garden
          </button>
          <div className="mt-3 text-xs text-ink/60">
            (This button can link to the app’s Seasonal Application screen.)
          </div>
        </div>

        <div className="mt-12 grid md:grid-cols-2 gap-6">
          {[
            ["Confidentiality promise", "Your stories stay protected. Consent-first, always."],
            ["Seasonal chapters", "A gentle structure that supports growth and belonging."],
            ["Events + referrals", "Meetups, resources, and curated support."],
            ["Bloomettes", "Guardian-managed kid profiles with a PIN-gated kid mode."],
          ].map(([t, d]) => (
            <div key={t} className="rounded-xl2 border border-pearl-100 bg-white p-8 shadow-card">
              <div className="font-serif text-2xl">{t}</div>
              <div className="mt-3 text-ink/70 leading-relaxed">{d}</div>
            </div>
          ))}
        </div>
      </div>
    </Shell>
  );
}
