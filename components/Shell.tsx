import Link from "next/link";

export function Shell({
  children,
  active = "home",
}: {
  children: React.ReactNode;
  active?: "home" | "join" | "partner";
}) {
  const nav = [
    { href: "/", label: "Home", key: "home" },
    { href: "/join", label: "Join", key: "join" },
    { href: "/partner", label: "Partner", key: "partner" },
  ] as const;

  return (
    <div className="min-h-screen bg-paper">
      <header className="sticky top-0 z-20 backdrop-blur bg-pearl-50/70 border-b border-pearl-100">
        <div className="mx-auto max-w-6xl px-6 py-5 flex items-center justify-between">
          <Link href="/" className="font-serif text-2xl tracking-wide">
            Pearls & Petals
          </Link>
          <nav className="flex items-center gap-2">
            {nav.map((n) => (
              <Link
                key={n.key}
                href={n.href}
                className={[
                  "px-3 py-2 rounded-full text-sm",
                  n.key === active
                    ? "bg-pearl-200 text-ink shadow-card"
                    : "text-ink/70 hover:bg-pearl-100",
                ].join(" ")}
              >
                {n.label}
              </Link>
            ))}
            <Link
              href="/join"
              className="ml-2 px-5 py-2.5 rounded-full bg-rose-500 text-white text-sm shadow-soft hover:opacity-95"
            >
              Join Chapter
            </Link>
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-6 py-14">{children}</main>

      <footer className="mx-auto max-w-6xl px-6 pb-14 text-sm text-ink/60">
        <div className="border-t border-pearl-100 pt-8">
          BLOOM is a program by Pearls & Petals. © {new Date().getFullYear()}
        </div>
      </footer>
    </div>
  );
}
