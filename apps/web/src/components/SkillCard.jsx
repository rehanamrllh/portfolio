import { useState, useRef, useEffect } from 'react';
import { GlassCard } from '@portfolio/ui';
import styles from './SkillCard.module.css';

export function SkillCard({ name, icon, description }) {
  const [open, setOpen] = useState(false);
  const cardRef = useRef(null);

  // Close on outside click
  useEffect(() => {
    if (!open) return;
    const handleClick = (e) => {
      if (cardRef.current && !cardRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [open]);

  return (
    <div ref={cardRef} className={styles.wrapper}>
      <GlassCard
        variant="hoverGlow"
        padding="sm"
        className={`${styles.card} ${open ? styles.active : ''}`}
        onClick={() => setOpen((v) => !v)}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') setOpen((v) => !v); }}
        aria-expanded={open}
        aria-label={`${name} — click for details`}
      >
        <i className={`${icon} ${styles.icon}`} />
        <span className={styles.name}>{name}</span>
      </GlassCard>

      {/* Popover */}
      {open && description && (
        <div className={styles.popover} role="tooltip">
          <div className={styles.popoverArrow} />
          <p className={styles.popoverTitle}>{name}</p>
          <p className={styles.popoverText}>{description}</p>
        </div>
      )}
    </div>
  );
}
