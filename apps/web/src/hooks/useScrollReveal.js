import { useEffect, useRef } from 'react';

export function useScrollReveal(options = {}) {
  const ref = useRef(null);
  const { threshold, rootMargin, deps = [] } = options;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Respect reduced motion
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      el.classList.add('revealed');
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: threshold || 0.15,
        rootMargin: rootMargin || '0px 0px -40px 0px',
      }
    );

    // Observe the element and its children with .reveal class
    const revealElements = el.querySelectorAll('.reveal');
    if (revealElements.length > 0) {
      revealElements.forEach(child => observer.observe(child));
    }
    if (el.classList.contains('reveal')) {
      observer.observe(el);
    }

    return () => observer.disconnect();
  }, [threshold, rootMargin, ...deps]);

  return ref;
}
