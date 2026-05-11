import { useMemo, useState } from 'react';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { SkillCard } from '@/components/SkillCard';
import ScrollVelocity from '@/components/ScrollVelocity';
import { GlassCard } from '@portfolio/ui';
import { skillCategories } from '@/data/skills';
import styles from './Skills.module.css';

export function Skills() {
  const sectionRef = useScrollReveal();
  const allSkills = skillCategories.flatMap((c) => c.skills);
  const [expanded, setExpanded] = useState(() => ({}));
  const [everExpanded, setEverExpanded] = useState(() => ({}));

  const toggleCategory = (title) => {
    setExpanded((prev) => {
      const next = !prev[title];
      if (next) {
        setEverExpanded((prevEver) => ({
          ...prevEver,
          [title]: true
        }));
      }
      return {
        ...prev,
        [title]: next
      };
    });
  };

  const getCategorySkills = useMemo(() => {
    const map = new Map();
    for (const category of skillCategories) {
      const isExpanded = Boolean(expanded[category.title]);
      const hasEverExpanded = Boolean(everExpanded[category.title]);
      const visibleSkills = isExpanded ? category.skills : category.skills.slice(0, 5);
      map.set(category.title, {
        isExpanded,
        hasEverExpanded,
        visibleSkills,
        hiddenCount: Math.max(0, category.skills.length - visibleSkills.length)
      });
    }
    return map;
  }, [expanded, everExpanded]);

  return (
    <section id="skills" className="section" ref={sectionRef}>
      <div className="container">
        {/* Section label */}
        <div className={`${styles.labelRow} reveal`}>
          <span className={styles.label}>tech stack</span>
          <div className={styles.labelLine} />
        </div>

        <h2 className={`${styles.heading} reveal`}>
          skills & technologies
        </h2>
        <p className={`${styles.subheading} reveal`}>
          tools and technologies i work with to bring ideas to life.
        </p>

        <div className={`${styles.logoMarquee} reveal`} aria-hidden="true">
          <ScrollVelocity
            texts={[
              <div className={styles.logoRow} key="logos">
                {allSkills.map((skill) => (
                  <i key={skill.name} className={`${skill.icon} ${styles.logoIcon}`} />
                ))}
              </div>
            ]}
            velocity={70}
            className={styles.logoCopy}
            numCopies={8}
            damping={50}
            stiffness={400}
          />
        </div>

        <div className={styles.categories}>
          {skillCategories.map((category) => (
            <div key={category.title} className={`${styles.category} reveal`}>
              <h3 className={styles.categoryTitle}>{category.title}</h3>
              <div className={`${styles.grid} reveal-stagger`}>
                {getCategorySkills.get(category.title).visibleSkills.map((skill) => (
                  <div
                    key={skill.name}
                    className={`reveal ${(getCategorySkills.get(category.title).isExpanded || getCategorySkills.get(category.title).hasEverExpanded) ? 'revealed' : ''}`}
                  >
                    <SkillCard
                      name={skill.name}
                      icon={skill.icon}
                      description={skill.description}
                    />
                  </div>
                ))}

                {category.skills.length > 5 && (
                  <div className="reveal">
                    <GlassCard
                      variant="hoverGlow"
                      padding="sm"
                      className={styles.toggleCard}
                      onClick={() => toggleCategory(category.title)}
                      role="button"
                      tabIndex={0}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') toggleCategory(category.title);
                      }}
                      aria-label={
                        getCategorySkills.get(category.title).isExpanded
                          ? `Minimize ${category.title}`
                          : `Expand ${category.title}`
                      }
                    >
                      <span className={styles.toggleIcon}>
                        {getCategorySkills.get(category.title).isExpanded
                          ? '−'
                          : '+'}
                      </span>
                      <span className={styles.toggleText}>
                        {getCategorySkills.get(category.title).isExpanded
                          ? 'less'
                          : `+${getCategorySkills.get(category.title).hiddenCount}`}
                      </span>
                    </GlassCard>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
