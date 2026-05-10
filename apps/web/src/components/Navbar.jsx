import { useState, useEffect, useMemo } from 'react';
import { useActiveSection } from '@/hooks/useActiveSection';
import { personal } from '@/data/personal';
import { ThemeToggle } from '@/components/ThemeToggle';
import styles from './Navbar.module.css';

const NAV_LINKS = [
  { id: 'about', label: 'about' },
  { id: 'skills', label: 'skills' },
  { id: 'projects', label: 'projects' },
  { id: 'contact', label: 'contact' },
];

export function Navbar() {
  const [visible, setVisible] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const sectionIds = useMemo(() => NAV_LINKS.map(l => l.id), []);
  const activeSection = useActiveSection(sectionIds);

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > window.innerHeight * 0.8);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.classList.toggle('modal-open', menuOpen);
    return () => document.body.classList.remove('modal-open');
  }, [menuOpen]);

  const handleNavClick = (e, id) => {
    e.preventDefault();
    setMenuOpen(false);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav id="navbar" className={`${styles.nav} ${visible ? styles.visible : ''}`}>
      <div className={styles.inner}>
        {/* Logo pill */}
        <a href="#hero" className={styles.logoPill} onClick={(e) => handleNavClick(e, 'hero')}>
          <div className={styles.logoCircle}>ra</div>
          <span className={styles.logoName}>rewhan</span>
        </a>

        {/* Center nav links */}
        <div className={styles.centerPill}>
          {NAV_LINKS.map(link => (
            <a
              key={link.id}
              href={`#${link.id}`}
              className={`${styles.link} ${activeSection === link.id ? styles.active : ''}`}
              onClick={(e) => handleNavClick(e, link.id)}
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Right CTA */}
        <div className={styles.rightControls}>
          <div className={styles.themeToggleDesktop}>
            <ThemeToggle />
          </div>
          <a href={personal.resumeUrl} download className={styles.ctaBtn}>download cv</a>
        </div>

        {/* Mobile hamburger */}
        <button
          id="mobile-menu-btn"
          className={`${styles.hamburger} ${menuOpen ? styles.open : ''}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      {/* Mobile menu */}
      <div className={`${styles.mobileMenu} ${menuOpen ? styles.mobileOpen : ''}`}>
        <ul className={styles.mobileLinks}>
          {NAV_LINKS.map(link => (
            <li key={link.id}>
              <a
                href={`#${link.id}`}
                className={`${styles.mobileLink} ${activeSection === link.id ? styles.active : ''}`}
                onClick={(e) => handleNavClick(e, link.id)}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
        <a href={personal.resumeUrl} download className={styles.mobileCta}>download cv</a>
      </div>
    </nav>
  );
}
