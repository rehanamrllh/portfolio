import { useState, useEffect } from 'react';

export function useActiveSection(sectionIds = []) {
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    // Track which sections are currently intersecting and pick the topmost one
    const visibleSections = new Set();

    const pickActive = () => {
      // Find the section closest to the top of the viewport
      let best = null;
      let bestTop = Infinity;
      visibleSections.forEach(id => {
        const el = document.getElementById(id);
        if (!el) return;
        const top = Math.abs(el.getBoundingClientRect().top);
        if (top < bestTop) {
          bestTop = top;
          best = id;
        }
      });
      if (best) setActiveSection(best);
    };

    const observers = [];

    sectionIds.forEach(id => {
      const el = document.getElementById(id);
      if (!el) return;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              visibleSections.add(id);
            } else {
              visibleSections.delete(id);
            }
          });
          pickActive();
        },
        {
          // Low threshold so even a thin sliver of a tall section counts
          threshold: 0.05,
          // Top offset: 80px for the navbar; bottom: shrink 20% so we
          // don't fire too early when the next section barely peeks in
          rootMargin: '-80px 0px -20% 0px',
        }
      );

      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach(obs => obs.disconnect());
  }, [sectionIds]);

  return activeSection;
}
