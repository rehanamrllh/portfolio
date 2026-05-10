import { Suspense } from 'react';
import Lanyard from '@/components/Lanyard';
import styles from './LanyardSection.module.css';

export function LanyardSection() {
  return (
    <section id="lanyard" className={styles.section} aria-label="Interactive card lanyard">
      {/* Label */}
      <div className={styles.labelRow}>
        <div className={styles.labelLine} />
        <span className={styles.label}>grab & drag me</span>
        <div className={styles.labelLine} />
      </div>

      {/* 3D Lanyard */}
      <Suspense fallback={
        <div className={styles.loading}>
          <div className={styles.spinner} />
          <span>loading 3d scene…</span>
        </div>
      }>
        <Lanyard position={[0, 0, 24]} gravity={[0, -40, 0]} fov={20} transparent={true} />
      </Suspense>
    </section>
  );
}
