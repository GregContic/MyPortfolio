(() => {
  const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
  const reduceMotion = motionQuery.matches;
  const body = document.body;

  body.classList.add('motion-ready');

  const progressBar = document.createElement('div');
  progressBar.className = 'scroll-progress';
  progressBar.setAttribute('aria-hidden', 'true');
  body.prepend(progressBar);

  const addLoadTargets = (selectors, startDelay = 0, step = 90) => {
    const targets = selectors.flatMap((selector) => [...document.querySelectorAll(selector)]);
    targets.forEach((target, index) => {
      target.dataset.load = '';
      target.style.setProperty('--load-delay', `${startDelay + index * step}ms`);
    });
  };

  addLoadTargets([
    '.hero .eyebrow',
    '.hero h1',
    '.hero-summary',
    '.hero-actions',
    '.hero-copy > .text-link',
    '.archive-hero .eyebrow',
    '.archive-hero h1',
    '.archive-summary'
  ]);

  const revealGroups = [
    ['.section-heading', 0, 0],
    ['.service-card', 0, 80],
    ['.project-card', 0, 100],
    ['.timeline-item', 0, 100],
    ['.automation-inner', 0, 0],
    ['.stack-groups > div', 0, 80],
    ['.about-image, .about-copy', 0, 120],
    ['.contact-inner', 0, 0],
    ['.archive-toolbar, .filter-status', 0, 80]
  ];

  const revealTargets = [];
  revealGroups.forEach(([selector, startDelay, step]) => {
    document.querySelectorAll(selector).forEach((target, index) => {
      target.classList.add('motion-item');
      target.style.setProperty('--motion-delay', `${startDelay + index * step}ms`);
      revealTargets.push(target);
    });
  });

  if (reduceMotion || !('IntersectionObserver' in window)) {
    revealTargets.forEach((target) => target.classList.add('is-visible'));
  } else {
    const observer = new IntersectionObserver((entries, currentObserver) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        currentObserver.unobserve(entry.target);
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -5% 0px' });

    revealTargets.forEach((target) => observer.observe(target));
  }

  const projectMotion = [...document.querySelectorAll('.project-card')].map((card, index) => ({
    card,
    image: card.querySelector('.project-visual img'),
    direction: index % 2 === 0 ? 1 : -1,
    top: 0,
    height: 1
  })).filter((project) => project.image);
  const hero = document.querySelector('.hero');
  let heroHeight = 1;
  const sections = [...document.querySelectorAll('main > section[id]')];
  const sectionLinks = [...document.querySelectorAll('.main-nav a[href*="#"]')];
  let ticking = false;
  let metricsDirty = true;

  const cacheMetrics = () => {
    projectMotion.forEach((project) => {
      const rect = project.card.getBoundingClientRect();
      project.top = rect.top + window.scrollY;
      project.height = Math.max(rect.height, 1);
    });
    heroHeight = hero ? Math.max(hero.getBoundingClientRect().height, 1) : 1;
    metricsDirty = false;
  };

  const updateScrollMotion = () => {
    if (metricsDirty) cacheMetrics();
    const maxScroll = Math.max(document.documentElement.scrollHeight - window.innerHeight, 1);
    const pageProgress = Math.min(Math.max(window.scrollY / maxScroll, 0), 1);
    document.documentElement.style.setProperty('--scroll-progress', pageProgress.toFixed(4));

    projectMotion.forEach((project) => {
      const progress = Math.min(Math.max((window.scrollY + window.innerHeight - project.top) / (window.innerHeight + project.height), 0), 1);
      const intensity = window.innerWidth < 768 ? 0.5 : 1;
      const movement = (progress - 0.5) * 20 * project.direction * intensity;
      project.card.style.setProperty('--scroll-y', `${movement.toFixed(2)}px`);
      project.card.style.setProperty('--text-scroll-y', `${(-movement * 0.45).toFixed(2)}px`);
    });

    if (hero && window.innerWidth >= 768) {
      const heroProgress = Math.min(Math.max(window.scrollY / heroHeight, 0), 1);
      hero.style.setProperty('--hero-scroll-opacity', (1 - heroProgress * 0.15).toFixed(3));
      hero.style.setProperty('--hero-scroll-y', `${(-heroProgress * 10).toFixed(2)}px`);
      hero.style.setProperty('--hero-visual-y', `${(heroProgress * 8).toFixed(2)}px`);
    }

    ticking = false;
  };

  const requestScrollUpdate = () => {
    if (ticking || reduceMotion) return;
    ticking = true;
    window.requestAnimationFrame(updateScrollMotion);
  };

  if (!reduceMotion) {
    window.addEventListener('scroll', requestScrollUpdate, { passive: true });
    window.addEventListener('resize', () => { metricsDirty = true; requestScrollUpdate(); }, { passive: true });
    const projectGrid = document.querySelector('[data-project-grid]');
    if (projectGrid && 'MutationObserver' in window) {
      new MutationObserver(() => { metricsDirty = true; requestScrollUpdate(); }).observe(projectGrid, { subtree: true, attributes: true, attributeFilter: ['hidden'] });
    }
    requestScrollUpdate();
  }

  if (sections.length && sectionLinks.length && 'IntersectionObserver' in window) {
    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        sectionLinks.forEach((link) => {
          const active = link.getAttribute('href') === `#${entry.target.id}`;
          link.classList.toggle('is-section-active', active);
          if (active) link.setAttribute('aria-current', 'location');
          else if (link.getAttribute('aria-current') === 'location') link.removeAttribute('aria-current');
        });
      });
    }, { rootMargin: '-25% 0px -60% 0px', threshold: 0 });
    sections.forEach((section) => sectionObserver.observe(section));
  }

  if (reduceMotion) {
    document.documentElement.style.setProperty('--scroll-progress', '0');
    projectMotion.forEach((project) => {
      project.card.style.setProperty('--scroll-y', '0px');
      project.card.style.setProperty('--text-scroll-y', '0px');
    });
  }
})();
