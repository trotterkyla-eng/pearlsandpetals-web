import Link from "next/link";
import { getInviteStatus } from "@/lib/invites";

export default async function InvitePage({
  params,
}: {
  params: { token: string };
}) {
  const status = await getInviteStatus(params.token);

  if (status !== "ok") {
    return (
      <main className="mx-auto max-w-3xl px-6 py-12">
        <h1 className="text-3xl font-serif">The Garden has Closed</h1>
        <p className="mt-3 text-ink/70">
          This invitation is no longer available.
        </p>
        <div className="mt-6">
          <Link
            href="/garden"
            className="rounded-full px-5 py-3 bg-rose-600 text-white"
          >
            Return to Gate
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen px-6 py-12">
      <div className="mx-auto max-w-5xl rounded-[32px] border border-rose-100 bg-white/70 px-8 py-10 shadow-sm">
        <p className="text-center text-sm uppercase tracking-[0.2em] text-ink/60">
          A quiet space for members of Pearls &amp; Petals.
        </p>

        <h1 className="mt-6 text-center text-5xl font-serif text-ink">
          Invitation Gate
        </h1>

        <div className="mt-10 flex justify-center">
          <div className="flex h-36 w-36 items-center justify-center rounded-full border border-rose-100 bg-white shadow-xl">
            <div className="h-16 w-16 rounded-[28px] border border-rose-100 bg-rose-50" />
          </div>
        </div>

        <p className="mt-8 text-center text-2xl text-ink/80">
          This invitation blooms once.
        </p>
        <p className="mt-2 text-center text-2xl text-ink/80">
          Tap the crest to enter.
        </p>

        <div className="mt-10 flex justify-center gap-4">
          <Link
            href={`/i/${params.token}/hold`}
            className="rounded-full border border-rose-100 bg-white px-6 py-3 text-lg font-medium text-ink shadow-sm"
          >
            I need more time
          </Link>

          <Link
            href={`/join?token=${params.token}`}
            className="rounded-full bg-rose-600 px-6 py-3 text-lg font-medium text-white shadow-sm"
          >
            Tap to Enter
          </Link>
        </div>

        <p className="mt-10 text-center text-base text-ink/50">
          Invitations open briefly and disappear once accepted.
        </p>
      </div>
    </main>
  );
}
