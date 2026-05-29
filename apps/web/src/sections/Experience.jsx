import { useScrollReveal } from '@/hooks/useScrollReveal';
import { GlassCard } from '@portfolio/ui';
import { personal } from '@/data/personal';
import styles from './Experience.module.css';

export function Experience() {
  const sectionRef = useScrollReveal();
  const { experience, education } = personal;

  return (
    <section id="experience" className="section" ref={sectionRef}>
      <div className="container">
        {/* Section label */}
        <div className={`${styles.labelRow} reveal`}>
          <span className={styles.label}>experience</span>
          <div className={styles.labelLine} />
        </div>

        <h2 className={`${styles.heading} reveal`}>
          experience & education
        </h2>
        <p className={`${styles.subheading} reveal`}>
          a snapshot of the roles and studies shaping my craft.
        </p>

        <div className={`${styles.grid} reveal`}>
          <div className={styles.column}>
            <div className={styles.columnHeader}>
              <span className={styles.columnLabel}>experience</span>
            </div>
            <div className={styles.cards}>
              {experience.map((item) => (
                <GlassCard
                  key={`${item.role}-${item.company}-${item.period}`}
                  variant="hoverGlow"
                  padding="sm"
                  className={styles.card}
                >
                  <div className={styles.cardHeader}>
                    <div>
                      <p className={styles.role}>{item.role}</p>
                      <p className={styles.company}>{item.company}</p>
                    </div>
                    <span className={styles.period}>{item.period}</span>
                  </div>
                  {item.location && (
                    <p className={styles.location}>{item.location}</p>
                  )}
                  {item.highlights?.length > 0 && (
                    <ul className={styles.highlights}>
                      {item.highlights.map((highlight) => (
                        <li key={highlight}>{highlight}</li>
                      ))}
                    </ul>
                  )}
                </GlassCard>
              ))}
            </div>
          </div>

          <div className={styles.column}>
            <div className={styles.columnHeader}>
              <span className={styles.columnLabel}>education</span>
            </div>
            <div className={styles.cards}>
              {education.map((item) => (
                <GlassCard
                  key={`${item.school}-${item.degree}-${item.period}`}
                  variant="hoverGlow"
                  padding="sm"
                  className={styles.card}
                >
                  <div className={styles.cardHeader}>
                    <div>
                      <p className={styles.role}>{item.degree}</p>
                      <p className={styles.company}>{item.school}</p>
                    </div>
                    <span className={styles.period}>{item.period}</span>
                  </div>
                  {item.location && (
                    <p className={styles.location}>{item.location}</p>
                  )}
                  {item.highlights?.length > 0 && (
                    <ul className={styles.highlights}>
                      {item.highlights.map((highlight) => (
                        <li key={highlight}>{highlight}</li>
                      ))}
                    </ul>
                  )}
                </GlassCard>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
