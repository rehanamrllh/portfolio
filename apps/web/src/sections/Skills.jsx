import { useScrollReveal } from '@/hooks/useScrollReveal';
import { SkillCard } from '@/components/SkillCard';
import { skillCategories } from '@/data/skills';
import styles from './Skills.module.css';

export function Skills() {
  const sectionRef = useScrollReveal();

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

        <div className={styles.categories}>
          {skillCategories.map((category) => (
            <div key={category.title} className={`${styles.category} reveal`}>
              <h3 className={styles.categoryTitle}>{category.title}</h3>
              <div className={`${styles.grid} reveal-stagger`}>
                {category.skills.map((skill) => (
                  <div key={skill.name} className="reveal">
                    <SkillCard name={skill.name} icon={skill.icon} />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
