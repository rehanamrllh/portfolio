import { useState } from 'react';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { ProjectCard } from '@/components/ProjectCard';
import { ProjectModal } from '@/components/ProjectModal';
import { projects } from '@/data/projects';
import styles from './Projects.module.css';

export function Projects() {
  const [selectedProject, setSelectedProject] = useState(null);
  const sectionRef = useScrollReveal();

  return (
    <section id="projects" className="section" ref={sectionRef}>
      <div className="container">
        {/* Section label */}
        <div className={`${styles.labelRow} reveal`}>
          <span className={styles.label}>my work</span>
          <div className={styles.labelLine} />
        </div>

        <h2 className={`${styles.heading} reveal`}>
          featured projects
        </h2>
        <p className={`${styles.subheading} reveal`}>
          a selection of projects that showcase my approach to problem-solving and design.
        </p>

        <div className={`${styles.grid} reveal-stagger`}>
          {projects.map((project) => (
            <div key={project.id} className="reveal">
              <ProjectCard
                project={project}
                onClick={setSelectedProject}
              />
            </div>
          ))}
        </div>
      </div>

      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
}
