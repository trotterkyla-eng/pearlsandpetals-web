import { Shell } from "@/components/Shell";

export default function Partner() {
  return (
    <Shell active="partner">
      <div className="rounded-xl2 border border-pearl-100 bg-white/85 shadow-soft p-10">
        <div className="text-xs tracking-[0.3em] uppercase text-ink/60">Partner</div>
        <h1 className="mt-4 font-serif text-5xl tracking-wide">Partner with Pearls & Petals</h1>
        <p className="mt-4 text-ink/70 text-lg leading-relaxed max-w-3xl">
          Sponsor community wellness and women’s safety with quiet, elegant visibility.
        </p>

        <div className="mt-12 grid md:grid-cols-3 gap-6">
          {[
            ["Pearl Room Sponsor", "$5K–$10K", "Quiet Room • Tea Bar • Welcome Parlor"],
            ["Wing Sponsor", "$25K", "Multiple spaces + one annual gathering"],
            ["House Partner", "$50K–$100K", "Anchor support + impact reporting"],
          ].map(([t, p, d]) => (
            <div key={t} className="rounded-xl2 border border-pearl-100 bg-white p-8 shadow-card">
              <div className="font-serif text-3xl">{t}</div>
              <div className="mt-2 text-champagne-600 font-semibold">{p}</div>
              <div className="mt-4 text-ink/70 leading-relaxed">{d}</div>
            </div>
          ))}
        </div>

        <div className="mt-14 rounded-xl2 border border-pearl-100 bg-pearl-50 p-10">
          <div className="font-serif text-2xl">Contact</div>
          <div className="mt-3 text-ink/70">partners@pearlsandpetals.org</div>
          <button className="mt-6 px-6 py-3.5 rounded-full bg-rose-500 text-white shadow-soft">
            Request Sponsor Packet
          </button>
        </div>
      </div>
    </Shell>
  );
}
