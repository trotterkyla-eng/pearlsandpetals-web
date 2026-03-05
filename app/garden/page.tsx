import styles from "./garden.module.css";
import OrnateCard from "@/components/OrnateCard";
import SparkleField from "@/components/SparkleField";
import Link from "next/link";

export default function GardenPage() {
  return (
    <main className={styles.page}>
      <SparkleField />

      <section className={styles.centerWrap}>
        <OrnateCard>
          <header className={styles.header}>
            <p className={styles.kicker}>A quiet space for members of Pearls &amp; Petals.</p>
            <h1 className={styles.title}>Invitation Gate</h1>
          </header>

          <div className={styles.crestWrap}>
            {/* Replace this with your real crest image later */}
            <button className={styles.crestButton} aria-label="Tap the crest to enter">
              <span className={styles.crestInner} />
            </button>
          </div>

          <p className={styles.copy}>
            This invitation blooms once.
            <br />
            Tap the crest to enter.
          </p>

          <div className={styles.ctaRow}>
            {/* Point this wherever your invite flow starts */}
            <Link href="/invite" className={styles.primaryCta}>
              Tap to Enter
            </Link>
          </div>

          <footer className={styles.footerNote}>
            <span className={styles.muted}>Invitations open briefly and disappear once accepted.</span>
          </footer>
        </OrnateCard>
      </section>
    </main>
  );
}
