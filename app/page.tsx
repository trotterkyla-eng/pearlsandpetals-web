<AppSplash />
import Link from "next/link";
import { Shell } from "@/components/Shell";
import { CrestCard } from "@/components/CrestCard";

export default function Home() {
  return (
    <Shell active="home">
      <CrestCard
        title="Pearls & Petals"
        subtitle="A private sanctuary where women flourish together. BLOOM is our program rooted in safety, seasonal sisterhood, and support."
        cta={
          <>
            <Link
              href="/join"
              className="px-6 py-3.5 rounded-full bg-rose-500 text-white shadow-soft"
            >
              Join the Pearl Pink Spring Chapter
            </Link>
            <Link
              href="/partner"
              className="px-6 py-3.5 rounded-full bg-white text-ink border border-pearl-100 shadow-card hover:bg-pearl-50"
            >
              Partner with us
            </Link>
          </>
        }
      />

      <section className="mt-16 grid md:grid-cols-3 gap-6">
        {[
          { title: "SOS + Safety", desc: "Trusted contacts + privacy-first alerts." },
          { title: "The Garden App", desc: "Discreet access to resources & chapters." },
          { title: "Guidance & Events", desc: "Seasonal gatherings and support." },
        ].map((c) => (
          <div
            key={c.title}
            className="rounded-xl2 border border-pearl-100 bg-white/85 shadow-card p-8"
          >
            <h3 className="font-serif text-2xl">{c.title}</h3>
            <p className="mt-3 text-ink/70 leading-relaxed">{c.desc}</p>
          </div>
        ))}
      </section>

      <section className="mt-20 rounded-xl2 border border-pearl-100 bg-white/80 shadow-soft p-10">
        <div className="text-xs tracking-[0.3em] uppercase text-ink/60">Membership</div>
        <h2 className="mt-4 font-serif text-4xl tracking-wide">What you’ll find here</h2>
        <div className="mt-8 grid md:grid-cols-2 gap-6">
          {[
            ["Confidentiality culture", "Consent-first, no filming, no location tagging."],
            ["Seasonal chapters", "Seed → Sprout → Bloom progression with gentle structure."],
            ["Events + resources", "Private meetups, referrals, and support that respects privacy."],
            ["Bloomettes", "Guardian-managed kid profiles with PIN-gated kid mode."],
          ].map(([t, d]) => (
            <div key={t} className="rounded-xl2 border border-pearl-100 bg-pearl-50 p-8">
              <div className="font-serif text-2xl">{t}</div>
              <div className="mt-3 text-ink/70 leading-relaxed">{d}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-20 rounded-xl2 border border-pearl-100 bg-pearl-100 shadow-soft p-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <div className="text-xs tracking-[0.3em] uppercase text-ink/60">Pearl Pink Spring Chapter</div>
          <div className="mt-3 font-serif text-3xl">Seasonal intake is open.</div>
          <div className="mt-2 text-ink/70">Apply in The Garden when you’re ready to sprout.</div>
        </div>
        <Link href="/join" className="px-6 py-3.5 rounded-full bg-rose-500 text-white shadow-soft">
          Apply Now
        </Link>
      </section>
    </Shell>
  );
}
