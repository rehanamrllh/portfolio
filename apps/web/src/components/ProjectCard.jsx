import { Badge } from '@portfolio/ui';
import styles from './ProjectCard.module.css';

export function ProjectCard({ project, onClick }) {
  const colors = {
    classico: '#3b82f6',
    taskflow: '#3b82f6',
    szybot: '#f59e0b',
    ecotrack: '#22c55e',
    pixelcraft: '#a855f7',
  };

  const accentColor = colors[project.id] || '#3b82f6';

  return (
    <article className={styles.card} onClick={() => onClick(project)} tabIndex={0} role="button"
      onKeyDown={(e) => { if (e.key === 'Enter') onClick(project); }}
      aria-label={`View details for ${project.title}`}
    >
      {/* Thumbnail */}
      <div className={styles.thumbnail} style={{ '--card-accent': accentColor }}>
        <div className={styles.placeholderImg}>
          <div className={styles.mockupBar}>
            <span /><span /><span />
          </div>
          <div className={styles.mockupContent}>
            {project.image ? (
              <img className={styles.mockupPreview} src={project.image} alt={`${project.title} preview`} loading="lazy" />
            ) : (
              <>
                <div className={styles.mockupLine} style={{ width: '70%' }} />
                <div className={styles.mockupLine} style={{ width: '50%' }} />
                <div className={styles.mockupBlock} />
                <div className={styles.mockupLine} style={{ width: '60%' }} />
              </>
            )}
          </div>
        </div>
        <div className={styles.overlay}>
          <span className={styles.viewText}>View Case Study →</span>
        </div>
      </div>

      {/* Info */}
      <div className={styles.info}>
        <p className={styles.subtitle}>{project.subtitle}</p>
        <h3 className={styles.title}>{project.title}</h3>
        <p className={styles.description}>{project.shortDescription}</p>
        <div className={styles.tags}>
          {project.techStack.slice(0, 4).map(tech => (
            <Badge key={tech} label={tech} variant="default" />
          ))}
          {project.techStack.length > 4 && (
            <Badge label={`+${project.techStack.length - 4}`} variant="accent" />
          )}
        </div>
      </div>
    </article>
  );
}
