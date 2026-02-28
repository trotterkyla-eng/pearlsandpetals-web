export function CrestCard({
  title,
  subtitle,
  cta,
  tag = "Sisterhood • Wellness • Support",
}: {
  title: string;
  subtitle: string;
  cta: React.ReactNode;
  tag?: string;
}) {
  return (
    <section className="relative overflow-hidden rounded-xl2 border border-pearl-100 bg-white/75 shadow-soft">
      <div className="absolute inset-0 opacity-40 pointer-events-none">
        <div className="h-full w-full bg-[radial-gradient(circle_at_20%_20%,rgba(238,200,214,0.55),transparent_50%),radial-gradient(circle_at_80%_30%,rgba(214,183,126,0.35),transparent_55%),radial-gradient(circle_at_50%_90%,rgba(246,213,221,0.55),transparent_55%)]" />
      </div>

      <div className="relative p-10 md:p-12">
        <div className="inline-flex items-center gap-2 rounded-full bg-pearl-100 px-4 py-1.5 text-xs text-ink/70">
          {tag}
        </div>

        <h1 className="mt-6 font-serif text-5xl md:text-6xl tracking-wide">
          {title}
        </h1>
        <p className="mt-4 max-w-2xl text-ink/70 text-lg leading-relaxed">
          {subtitle}
        </p>

        <div className="mt-8 flex flex-wrap gap-3">{cta}</div>

        <div className="mt-14 rounded-xl2 border border-pearl-100 bg-pearl-50 p-8">
          <div className="text-sm text-ink/70">Brand note</div>
          <div className="font-serif text-2xl mt-2">
            Soft heritage, privacy-first, quiet luxury.
          </div>
        </div>
      </div>
    </section>
  );
}
