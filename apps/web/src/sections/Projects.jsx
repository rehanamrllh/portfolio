import { useMemo, useState, useEffect } from 'react';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { ProjectCard } from '@/components/ProjectCard';
import { ProjectModal } from '@/components/ProjectModal';
import { projects } from '@/data/projects';
import styles from './Projects.module.css';

export function Projects() {
  const [selectedProject, setSelectedProject] = useState(null);
  const [activeFilter, setActiveFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const revealOptions = useMemo(
    () => ({ deps: [activeFilter, currentPage] }),
    [activeFilter, currentPage]
  );
  const sectionRef = useScrollReveal(revealOptions);
  const pageSize = 4;

  const filterOptions = useMemo(() => {
    const techs = new Set();
    projects.forEach((project) => {
      project.techStack.forEach((tech) => techs.add(tech));
    });
    return ['all', ...Array.from(techs)];
  }, []);

  const filteredProjects = useMemo(() => {
    if (activeFilter === 'all') {
      return projects;
    }
    return projects.filter((project) => project.techStack.includes(activeFilter));
  }, [activeFilter]);

  const totalPages = Math.max(1, Math.ceil(filteredProjects.length / pageSize));
  const safePage = Math.min(currentPage, totalPages);
  const paginatedProjects = filteredProjects.slice(
    (safePage - 1) * pageSize,
    safePage * pageSize
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [activeFilter]);

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages]);

  const pageButtons = useMemo(() => {
    const maxButtons = 3;
    let start = Math.max(1, safePage - 1);
    let end = Math.min(totalPages, start + maxButtons - 1);

    if (end - start < maxButtons - 1) {
      start = Math.max(1, end - maxButtons + 1);
    }

    return Array.from({ length: end - start + 1 }, (_, index) => start + index);
  }, [safePage, totalPages]);

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

        <div className={`${styles.controls} reveal`}>
          <label className={styles.filter}>
            <span className={styles.filterLabel}>filter</span>
            <select
              className={styles.filterSelect}
              value={activeFilter}
              onChange={(event) => setActiveFilter(event.target.value)}
            >
              {filterOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </label>

          <div className={styles.pagination}>
            <button
              type="button"
              className={styles.pageButton}
              onClick={() => setCurrentPage((page) => Math.max(1, page - 1))}
              disabled={safePage === 1}
            >
              prev
            </button>
            {pageButtons.map((pageNumber) => (
              <button
                key={pageNumber}
                type="button"
                className={`${styles.pageButton} ${safePage === pageNumber ? styles.pageActive : ''}`}
                onClick={() => setCurrentPage(pageNumber)}
                disabled={pageNumber > totalPages}
              >
                {pageNumber}
              </button>
            ))}
            <button
              type="button"
              className={styles.pageButton}
              onClick={() => setCurrentPage((page) => Math.min(totalPages, page + 1))}
              disabled={safePage === totalPages}
            >
              next
            </button>
          </div>
        </div>

        <div className={`${styles.grid} reveal-stagger`}>
          {paginatedProjects.map((project) => (
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
