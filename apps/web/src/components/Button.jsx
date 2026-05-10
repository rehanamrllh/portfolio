import styles from './Button.module.css';

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  href,
  download,
  onClick,
  icon,
  className = '',
  ...rest
}) {
  const classes = [styles.btn, styles[variant], styles[size], className].filter(Boolean).join(' ');
  const Tag = href ? 'a' : 'button';

  return (
    <Tag
      className={classes}
      href={href}
      download={download}
      onClick={onClick}
      {...rest}
    >
      {icon && <span className={styles.icon}>{icon}</span>}
      {children}
    </Tag>
  );
}
