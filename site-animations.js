(() => {
  const reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduceMotion) return;

  const isVisibleContent = (element) => {
    const style = window.getComputedStyle(element);
    return style.display !== 'none' && style.visibility !== 'hidden' && style.position !== 'absolute' && style.position !== 'fixed';
  };

  const animateElement = (element, index) => {
    if (element.dataset.vsAnimate || !isVisibleContent(element)) return;
    const tag = element.tagName;
    const direction = tag === 'IMG' || tag === 'VIDEO' || tag === 'FIGURE' ? 'scale' : index % 3 === 1 ? 'left' : index % 3 === 2 ? 'right' : 'up';
    element.dataset.vsAnimate = direction;
    element.style.setProperty('--vs-delay', `${Math.min(index, 5) * 80}ms`);
  };

  const scan = () => {
    const selectors = [
      'section h1', 'section h2', 'section h3', 'section p', 'section article', 'section figure',
      'section form', 'section > div > a', 'footer > div', 'footer h3', 'footer p', 'footer a'
    ].join(',');
    document.querySelectorAll(selectors).forEach((element, index) => animateElement(element, index));
  };

  const reveal = (element) => element.classList.add('vs-visible');
  const observe = () => {
    document.querySelectorAll('[data-vs-animate]:not([data-vs-observed])').forEach((element) => {
      element.dataset.vsObserved = 'true';
      if (!('IntersectionObserver' in window)) {
        reveal(element);
        return;
      }
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          reveal(entry.target);
          observer.unobserve(entry.target);
        });
      }, { threshold: 0.12, rootMargin: '0px 0px -28px' });
      observer.observe(element);
    });
  };

  const start = () => { scan(); observe(); };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start, { once: true });
  else start();
  window.setTimeout(start, 600);
  window.setTimeout(start, 1800);
})();
