import Link from "next/link";
import { OrnateCard } from "@/components/OrnateCard";

export default function HoldPage({ params }: { params: { token: string } }) {
  return (
    <main className="min-h-screen bg-garden px-6 py-14">
      <div className="mx-auto max-w-3xl">
        <OrnateCard>
          <h1 className="text-center font-serif text-4xl text-ink">The Garden Waits</h1>
          <p className="mt-6 text-center text-ink/70">
            Your invitation is still delicate. Return before the vines close.
          </p>

          <div className="mt-10 flex justify-center">
            <Link className="btn-primary" href={`/i/${params.token}`}>
              Return to Invitation
            </Link>
          </div>
        </OrnateCard>
      </div>
    </main>
  );
}
