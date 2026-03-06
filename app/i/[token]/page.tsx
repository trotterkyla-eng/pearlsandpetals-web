import Link from "next/link";
import { getInviteStatus } from "@/lib/invites";

export default async function InvitePage({
  params,
}: {
  params: { token: string };
}) {
  const status = await getInviteStatus(params.token);

  return (
    <main className="mx-auto max-w-3xl px-6 py-12">
      <h1 className="text-3xl font-serif">Invite Debug</h1>
      <p className="mt-4">Token: {params.token}</p>
      <p className="mt-2">Status: {status}</p>

      <div className="mt-8">
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
