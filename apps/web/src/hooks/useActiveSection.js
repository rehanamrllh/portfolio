import { useState, useEffect } from 'react';

export function useActiveSection(sectionIds = []) {
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const observers = [];

    sectionIds.forEach(id => {
      const el = document.getElementById(id);
      if (!el) return;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              setActiveSection(id);
            }
          });
        },
        {
          threshold: 0.3,
          rootMargin: '-80px 0px -50% 0px',
        }
      );

      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach(obs => obs.disconnect());
  }, [sectionIds]);

  return activeSection;
}
