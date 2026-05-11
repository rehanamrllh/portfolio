import { personal } from '@/data/personal';
import { ThemeToggle } from '@/components/ThemeToggle';
import LiquidChrome from '@/components/LiquidChrome';
import Magnet from '@/components/Magnet';
import { useTheme } from '@/hooks/useTheme';
import styles from './Hero.module.css';
import TextType from '@/components/TextType';

export function Hero() {
  const { theme } = useTheme();
  const isLight = theme === 'light';

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="hero" className={`${styles.hero} ${isLight ? styles.heroLight : ''}`}>
      {/* LiquidChrome WebGL background */}
      <div className={styles.liquidBg}>
        <LiquidChrome
          baseColor={isLight ? [0.92, 0.92, 0.92] : [0.08, 0.08, 0.08]}
          speed={0.15}
          amplitude={0.4}
          frequencyX={2.5}
          frequencyY={2.0}
          interactive={true}
        />
      </div>

      {/* Navbar */}
      <nav className={styles.navbar}>
        <div className={styles.navInner}>
          {/* Left pill — logo + brand (Magnet) */}
          <Magnet padding={60} magnetStrength={5}>
            <a href="#about" className={`${styles.navPillLeft} ${isLight ? styles.navPillLight : ''}`} onClick={(e) => { e.preventDefault(); scrollTo('about'); }}>
              <div className={`${styles.logoInitials} ${isLight ? styles.logoLight : ''}`}>ra</div>
              <span className={styles.brandName}>rewhan</span>
            </a>
          </Magnet>

          {/* Center pill — nav links (hidden on mobile) */}
          <div className={`${styles.navPillCenter} ${isLight ? styles.navPillLight : ''}`}>
            <a href="#about" className={styles.navLink} onClick={(e) => { e.preventDefault(); scrollTo('about'); }}>about</a>
            <a href="#skills" className={styles.navLink} onClick={(e) => { e.preventDefault(); scrollTo('skills'); }}>skills</a>
            <a href="#projects" className={styles.navLink} onClick={(e) => { e.preventDefault(); scrollTo('projects'); }}>projects</a>
            <a href="#contact" className={styles.navLink} onClick={(e) => { e.preventDefault(); scrollTo('contact'); }}>contact</a>
          </div>

          {/* Right controls */}
          <div className={styles.navRight}>
            <Magnet padding={50} magnetStrength={8}>
              <ThemeToggle />
            </Magnet>
            <Magnet padding={50} magnetStrength={7}>
              <a href={personal.resumeUrl} download className={`${styles.navBtn} ${isLight ? styles.navBtnLight : ''}`}>download cv</a>
            </Magnet>
          </div>
        </div>
      </nav>

      {/* Foreground content wrapper */}
      <div className={styles.foreground}>
        {/* Giant staggered headline words */}
        <h1 className={`${styles.heroTitle} ${styles.wordOne}`}>crafting</h1>
        <h1 className={`${styles.heroTitle} ${styles.wordTwo}`}>digital</h1>
        <h1 className={`${styles.heroTitle} ${styles.wordThree}`}>experiences</h1>

        {/* Description paragraph */}
        <p className={styles.description}>
          <TextType
            as="span"
            text={personal.heroTagline.toLowerCase()}
            loop={true}
            typingSpeed={28}
            deletingSpeed={18}
            pauseDuration={1200}
            showCursor={true}
          />
        </p>

        {/* Stat block — top-right */}
        <div className={styles.statTopRight}>
          <div className={styles.statRow}>
            <div className={styles.dividerAnglePos} />
            <span className={styles.statNumber}>{personal.stats[0].value}</span>
          </div>
          <span className={styles.statLabelRight}>{personal.stats[0].label.toLowerCase()}</span>
        </div>

        {/* Stat block — bottom-left */}
        <div className={styles.statBottomLeft}>
          <div className={styles.statRow}>
            <span className={styles.statNumber}>{personal.stats[1].value}</span>
            <div className={styles.dividerAngleNeg} />
          </div>
          <span className={styles.statLabel}>{personal.stats[1].label.toLowerCase()}</span>
        </div>

        {/* Stat block — bottom-right */}
        <div className={styles.statBottomRight}>
          <div className={styles.statRow}>
            <div className={styles.dividerAngleNeg} />
            <span className={styles.statNumber}>{personal.stats[2].value}</span>
          </div>
          <span className={styles.statLabelRight}>{personal.stats[2].label.toLowerCase()}</span>
        </div>
      </div>

      {/* Bottom gradient overlay */}
      <div className={styles.bottomGradient} />
    </section>
  );
}
