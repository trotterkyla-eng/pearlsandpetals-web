export function OrnateCard({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section
      className={[
        "rounded-3xl border border-rose-100 bg-white/70 p-6 shadow-sm backdrop-blur",
        className,
      ].join(" ")}
    >
      {children}
    </section>
  );
}
