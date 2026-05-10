import { useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { Badge } from '@portfolio/ui';
import { Button } from './Button';
import styles from './ProjectModal.module.css';

export function ProjectModal({ project, onClose }) {
  const handleEsc = useCallback((e) => {
    if (e.key === 'Escape') onClose();
  }, [onClose]);

  useEffect(() => {
    if (!project) return;
    document.body.classList.add('modal-open');
    document.addEventListener('keydown', handleEsc);
    return () => {
      document.body.classList.remove('modal-open');
      document.removeEventListener('keydown', handleEsc);
    };
  }, [project, handleEsc]);

  if (!project) return null;

  return createPortal(
    <div className={styles.backdrop} onClick={onClose} role="dialog" aria-modal="true" aria-label={`Project: ${project.title}`}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        {/* Close button */}
        <button className={styles.close} onClick={onClose} aria-label="Close modal">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>

        {/* Header */}
        <div className={styles.header}>
          <span className={styles.subtitle}>{project.subtitle}</span>
          <h2 className={styles.title}>{project.title}</h2>
          <div className={styles.tags}>
            {project.techStack.map(tech => (
              <Badge key={tech} label={tech} variant="accent" />
            ))}
          </div>
        </div>

        {/* Content */}
        <div className={styles.content}>
          <div className={styles.section}>
            <h3 className={styles.sectionTitle}>
              <span className={styles.sectionIcon}>🔍</span> The Problem
            </h3>
            <p className={styles.sectionText}>{project.problem}</p>
          </div>

          <div className={styles.section}>
            <h3 className={styles.sectionTitle}>
              <span className={styles.sectionIcon}>💡</span> The Solution
            </h3>
            <p className={styles.sectionText}>{project.solution}</p>
          </div>

          <div className={styles.section}>
            <h3 className={styles.sectionTitle}>
              <span className={styles.sectionIcon}>📊</span> The Outcome
            </h3>
            <p className={styles.sectionText}>{project.outcome}</p>
          </div>
        </div>

        {/* Actions */}
        <div className={styles.actions}>
          <Button
            variant="primary"
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            icon={
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                <polyline points="15 3 21 3 21 9" />
                <line x1="10" y1="14" x2="21" y2="3" />
              </svg>
            }
          >
            Live Demo
          </Button>
          <Button
            variant="secondary"
            href={project.repoUrl}
            target="_blank"
            rel="noopener noreferrer"
            icon={
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
            }
          >
            Source Code
          </Button>
        </div>
      </div>
    </div>,
    document.body
  );
}
