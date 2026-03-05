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
