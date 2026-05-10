import { useScrollReveal } from '@/hooks/useScrollReveal';
import { personal } from '@/data/personal';
import styles from './About.module.css';

export function About() {
  const sectionRef = useScrollReveal();

  return (
    <section id="about" className="section" ref={sectionRef}>
      <div className="container">
        {/* Section label */}
        <div className={`${styles.labelRow} reveal`}>
          <span className={styles.label}>about me</span>
          <div className={styles.labelLine} />
        </div>

        <div className={`${styles.grid} reveal`}>
          {/* Left — large intro */}
          <div className={styles.intro}>
            <h2 className={styles.heading}>
              a passionate developer building at the intersection of
              <span className={styles.highlight}> code</span> and
              <span className={styles.highlight}> design</span>.
            </h2>
          </div>

          {/* Right — bio + details */}
          <div className={styles.content}>
            {personal.bio.map((paragraph, i) => (
              <p key={i} className={styles.paragraph}>{paragraph}</p>
            ))}

            {/* Info pills */}
            <div className={styles.infoPills}>
              <div className={styles.pill}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                {personal.location}
              </div>
              <div className={styles.pill}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
                  <path d="M6 12v5c3 3 6 3 6 3s3 0 6-3v-5" />
                </svg>
                {personal.university}
              </div>
            </div>
          </div>
        </div>

        {/* Stats row */}
        <div className={`${styles.statsRow} reveal`}>
          {personal.stats.map((stat, i) => (
            <div key={i} className={styles.stat}>
              <span className={styles.statValue}>{stat.value}</span>
              <span className={styles.statLabel}>{stat.label.toLowerCase()}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
