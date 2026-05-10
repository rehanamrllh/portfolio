import styles from './SectionHeading.module.css';

export function SectionHeading({ subtitle, title, description, align = 'center' }) {
  return (
    <div className={`${styles.heading} ${styles[align]}`}>
      {subtitle && <span className={styles.subtitle}>{subtitle}</span>}
      <h2 className={styles.title}>{title}</h2>
      {description && <p className={styles.description}>{description}</p>}
      <div className={styles.accent} />
    </div>
  );
}
