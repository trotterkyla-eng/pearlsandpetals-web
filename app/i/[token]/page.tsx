import Link from "next/link";
import { getInviteStatus } from "@/lib/invites";

export default async function InvitePage({
  params,
}: {
  params: { token: string };
}) {
  const status = await getInviteStatus(params.token);

  if (status !== "ok") {
    // Send all invalid states to the "closed" page
    // (We’ll show different messaging there later if you want)
    return (
      <main className="mx-auto max-w-3xl px-6 py-12">
        <h1 className="text-3xl font-serif">The Garden has Closed</h1>
        <p className="mt-3 text-ink/70">
          This invitation is no longer available.
        </p>
        <div className="mt-6">
          <Link href="/garden" className="rounded-full px-5 py-3 bg-rose-600 text-white">
            Return to Gate
          </Link>
        </div>
      </main>
    );
  }

  // If valid, show the invite UI (keep your existing aesthetic layout below)
  return (
    <main className="mx-auto max-w-3xl px-6 py-12">
      <h1 className="text-5xl font-serif text-center">The Hidden Garden Invitation</h1>
      <p className="mt-4 text-center text-ink/70">
        This invitation blooms once. Tap to enter.
      </p>

      <div className="mt-8 flex justify-center gap-3">
        <Link
          href={`/i/${params.token}/hold`}
          className="rounded-full px-6 py-3 bg-white/70 border border-rose-100 text-ink"
        >
          I need more time
        </Link>

        <Link
          href={`/join?token=${params.token}`}
          className="rounded-full px-6 py-3 bg-rose-600 text-white"
        >
          Accept Invitation
        </Link>
      </div>
    </main>
  );
}
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
