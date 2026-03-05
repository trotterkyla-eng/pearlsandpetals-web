import { OrnateCard } from "@/components/OrnateCard";

export default function ClosedPage() {
  return (
    <main className="min-h-screen bg-garden px-6 py-14">
      <div className="mx-auto max-w-3xl">
        <OrnateCard>
          <h1 className="text-center font-serif text-4xl text-ink">The Garden has Closed</h1>
          <p className="mt-6 text-center text-ink/70">
            This invitation bloomed once and has returned to the soil.
            Ask your sponsor for another bloom.
          </p>

          <div className="mt-10 flex justify-center">
            <button className="btn-primary">Return</button>
          </div>
        </OrnateCard>
      </div>
    </main>
  );
}
