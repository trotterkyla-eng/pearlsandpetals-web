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
            <Link href="/join" className="px-6 py-3.5 rounded-full bg-rose-600 text-white">
              Join the Pearl Pink Spring Chapter
            </Link>

            <Link href="/partner" className="px-6 py-3.5 rounded-full bg-white text-ink border border-rose-100">
              Partner with us
            </Link>
          </>
        }
      />

      <section className="mt-10 grid gap-4">
        <div className="rounded-2xl bg-white/70 border border-rose-100 p-6">
          <h3 className="font-serif text-xl">SOS + Safety</h3>
          <p className="mt-2 text-ink/70">Trusted contacts + privacy-first alerts.</p>
        </div>

        <div className="rounded-2xl bg-white/70 border border-rose-100 p-6">
          <h3 className="font-serif text-xl">The Garden App</h3>
          <p className="mt-2 text-ink/70">Discreet access to resources & chapters.</p>
          <div className="mt-4">
            <Link href="/garden" className="px-5 py-3 rounded-full bg-rose-600 text-white inline-block">
              Enter The Garden
            </Link>
          </div>
        </div>
      </section>
    </Shell>
  );
}
