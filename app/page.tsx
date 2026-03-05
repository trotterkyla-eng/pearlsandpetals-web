<Shell>
  <main className="mx-auto w-full max-w-5xl px-6 pb-24 pt-10">
    {/* HERO */}
    <section className="text-center">
      <div className="mx-auto mb-6 flex h-28 w-28 items-center justify-center rounded-full border border-pearl-200 bg-white/70 shadow-soft">
        <img
          src="/apple-touch-icon.png"
          alt="Pearls & Petals crest"
          className="h-16 w-16"
        />
      </div>

      <h1 className="font-serif text-5xl leading-tight">
        Welcome to the Garden
      </h1>

      <p className="mx-auto mt-4 max-w-2xl text-lg text-ink/75">
        Where women bloom together in safety, sisterhood, and quiet luxury.
      </p>

      <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
        <a
          href="/join"
          className="rounded-full bg-rose-500 px-7 py-3 text-white shadow-soft"
        >
          Apply for the Founding Chapter
        </a>
        <a
          href="/invite"
          className="rounded-full border border-pearl-200 bg-white/70 px-7 py-3 text-ink"
        >
          Learn How Invitations Work
        </a>
      </div>

      <p className="mx-auto mt-5 max-w-xl text-sm text-ink/60">
        In this garden, invitations bloom once and return to the soil.
      </p>
    </section>

    {/* PILLARS */}
    <section className="mt-14 grid gap-4 sm:grid-cols-3">
      {[
        {
          title: "Safety",
          desc: "Privacy-first community design, dignity-first support, and protective boundaries.",
        },
        {
          title: "Sisterhood",
          desc: "Women who show up with care. No competition. No performance. Just community.",
        },
        {
          title: "Sanctuary",
          desc: "A soft place to reset, rebuild, and grow. Quiet luxury, grounded values.",
        },
      ].map((p) => (
        <div
          key={p.title}
          className="rounded-2xl border border-pearl-100 bg-white/70 p-6 shadow-soft"
        >
          <div className="text-xs tracking-[0.3em] uppercase text-ink/60">
            Pillar
          </div>
          <h3 className="mt-2 font-serif text-2xl">{p.title}</h3>
          <p className="mt-2 text-ink/70">{p.desc}</p>
        </div>
      ))}
    </section>

    {/* FOUNDING */}
    <section className="mt-14 rounded-3xl border border-pearl-100 bg-white/70 p-8 shadow-soft">
      <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="text-xs tracking-[0.3em] uppercase text-ink/60">
            Pearl Pink Founders
          </div>
          <h2 className="mt-2 font-serif text-3xl">
            The Founding Chapter is forming.
          </h2>
          <p className="mt-2 max-w-2xl text-ink/70">
            Founding members shape the culture, rituals, and standards of the
            garden. This is a seasonal chapter with intentional screening.
          </p>
        </div>

        <a
          href="/join"
          className="h-fit rounded-full bg-ink px-7 py-3 text-white"
        >
          Request Consideration
        </a>
      </div>
    </section>

    {/* HOW IT WORKS */}
    <section className="mt-14">
      <h2 className="text-center font-serif text-3xl">How it works</h2>
      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        {[
          {
            step: "01",
            title: "Apply",
            desc: "Share your values, lifestyle, and what you’re looking to cultivate.",
          },
          {
            step: "02",
            title: "Review",
            desc: "Applications are screened for alignment, safety, and contribution potential.",
          },
          {
            step: "03",
            title: "Invitation",
            desc: "If selected, your invitation blooms once. It’s visible briefly, then disappears.",
          },
        ].map((s) => (
          <div
            key={s.step}
            className="rounded-2xl border border-pearl-100 bg-white/70 p-6 shadow-soft"
          >
            <div className="text-sm text-ink/60">Step {s.step}</div>
            <h3 className="mt-2 font-serif text-2xl">{s.title}</h3>
            <p className="mt-2 text-ink/70">{s.desc}</p>
          </div>
        ))}
      </div>
    </section>

    {/* MANTRA */}
    <section className="mt-14 text-center">
      <p className="mx-auto max-w-3xl font-serif text-2xl leading-relaxed text-ink/90">
        “In this garden, I am safe to be whole. I am recognized as enough. We
        meet each other with care, and leave judgment at the gate.”
      </p>
      <p className="mt-4 text-sm text-ink/60">Pearls & Petals</p>
    </section>
  </main>
</Shell>
