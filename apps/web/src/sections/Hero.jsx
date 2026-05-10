import { personal } from '@/data/personal';
import { ThemeToggle } from '@/components/ThemeToggle';
import styles from './Hero.module.css';

export function Hero() {
  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="hero" className={styles.hero}>
      {/* Background video */}
      <video
        className={styles.bgVideo}
        autoPlay
        loop
        muted
        playsInline
        src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260418_063509_7d167302-4fd4-480b-8260-18ab572333d4.mp4"
      />

      {/* Navbar */}
      <nav className={styles.navbar}>
        <div className={styles.navInner}>
          {/* Left pill — logo + brand */}
          <div className={styles.navPillLeft}>
            <div className={styles.logoInitials}>ra</div>
            <span className={styles.brandName}>rewhan</span>
          </div>

          {/* Center pill — nav links (hidden on mobile) */}
          <div className={styles.navPillCenter}>
            <a href="#about" className={styles.navLink} onClick={(e) => { e.preventDefault(); scrollTo('about'); }}>about</a>
            <a href="#skills" className={styles.navLink} onClick={(e) => { e.preventDefault(); scrollTo('skills'); }}>skills</a>
            <a href="#projects" className={styles.navLink} onClick={(e) => { e.preventDefault(); scrollTo('projects'); }}>projects</a>
            <a href="#contact" className={styles.navLink} onClick={(e) => { e.preventDefault(); scrollTo('contact'); }}>contact</a>
          </div>

          {/* Right controls */}
          <div className={styles.navRight}>
            <ThemeToggle />
            <a href={personal.resumeUrl} download className={styles.navBtn}>download cv</a>
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
          {personal.heroTagline.toLowerCase()}
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
