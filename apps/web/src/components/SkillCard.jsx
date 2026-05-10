import { GlassCard } from '@portfolio/ui';
import styles from './SkillCard.module.css';

export function SkillCard({ name, icon }) {
  return (
    <GlassCard variant="hoverGlow" padding="sm" className={styles.card}>
      <i className={`${icon} ${styles.icon}`} />
      <span className={styles.name}>{name}</span>
    </GlassCard>
  );
}
