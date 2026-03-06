import { getInviteStatus } from "@/lib/invites";
import { redirect } from "next/navigation";
import SignupForm from "./signup-form";

export default async function JoinPage({
  searchParams,
}: {
  searchParams: { token?: string };
}) {
  const token = searchParams.token;

  if (!token) redirect("/garden");

  const status = await getInviteStatus(token);

  if (status !== "ok") {
    redirect(`/i/${token}/closed`);
  }

  return (
    <main className="min-h-screen px-6 py-12">
      <div className="mx-auto max-w-2xl rounded-[32px] border border-rose-100 bg-white/70 px-8 py-10 shadow-sm">
        <p className="text-center text-sm uppercase tracking-[0.2em] text-ink/60">
          Pearls &amp; Petals Membership
        </p>

        <h1 className="mt-6 text-center text-4xl font-serif text-ink">
          Create Your Account
        </h1>

        <p className="mt-4 text-center text-lg text-ink/70">
          Your invitation is valid. Complete your membership setup below.
        </p>

        <div className="mt-8">
          <SignupForm token={token} />
        </div>
      </div>
    </main>
  );
}
