import styles from './GlassCard.module.css';

export function GlassCard({
  children,
  variant = 'default',
  padding = 'md',
  className = '',
  as: Tag = 'div',
  onClick,
  ...rest
}) {
  const classes = [
    styles.card,
    styles[variant],
    styles[`pad-${padding}`],
    className
  ].filter(Boolean).join(' ');

  return (
    <Tag className={classes} onClick={onClick} {...rest}>
      {children}
    </Tag>
  );
}
