import styles from './Badge.module.css';

export function Badge({ label, icon, variant = 'default', className = '' }) {
  const classes = [styles.badge, styles[variant], className].filter(Boolean).join(' ');

  return (
    <span className={classes}>
      {icon && <i className={icon} />}
      {label}
    </span>
  );
}
