import Link from "next/link";
import { OrnateCard } from "@/components/OrnateCard";
import { SparkleField } from "@/components/SparkleField";

export default function InvitePage({ params }: { params: { token: string } }) {
  const token = params.token;

  // TEMP preview data (we’ll swap to Supabase lookup next)
  const invite = {
    title: "The Hidden Garden Invitation",
    address: "123 Rosewood Lane",
    cityStateZip: "Atlanta, Georgia 30327",
    secondsLeft: 118, // placeholder for now
  };

  return (
    <main className="min-h-screen relative overflow-hidden bg-garden">
      <SparkleField />

      <div className="mx-auto max-w-3xl px-6 py-14">
        <OrnateCard>
          <p className="text-center text-xs tracking-[0.25em] uppercase text-ink/60">
            A quiet space for members of Pearls & Petals
          </p>

          <h1 className="mt-6 text-center font-serif text-4xl text-ink">
            {invite.title}
          </h1>

          <div className="mt-8 text-center text-ink/80">
            <p className="text-lg">{invite.address}</p>
            <p className="text-lg">{invite.cityStateZip}</p>
          </div>

          <div className="mt-8 text-center">
            <p className="text-sm text-ink/60">
              When the vines close, this invite is gone.
            </p>
            <p className="mt-3 font-serif text-5xl text-ink tabular-nums">
              1:58
            </p>
          </div>

          <div className="mt-10 flex flex-col items-center gap-3">
            <button className="btn-primary w-full max-w-xs">
              Accept Invitation
            </button>

            <Link className="text-sm text-ink/60 underline" href={`/i/${token}/hold`}>
              I need more time
            </Link>
          </div>
        </OrnateCard>
      </div>
    </main>
  );
}
