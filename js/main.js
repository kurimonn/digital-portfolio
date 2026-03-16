/* ===========================
   Main JavaScript — Shared across all pages
   =========================== */

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

// ===========================
// Custom Cursor
// ===========================
class CustomCursor {
  constructor() {
    this.cursor = document.querySelector('.cursor');
    this.dot = document.querySelector('.cursor-dot');
    if (!this.cursor || !this.dot) return;

    this.pos = { x: 0, y: 0 };
    this.mouse = { x: 0, y: 0 };
    this.speed = 0.15;

    this.init();
  }

  init() {
    document.addEventListener('mousemove', (e) => {
      this.mouse.x = e.clientX;
      this.mouse.y = e.clientY;
      // Move dot instantly
      this.dot.style.left = e.clientX + 'px';
      this.dot.style.top = e.clientY + 'px';
    });

    // Hover effect on interactive elements
    const hoverEls = document.querySelectorAll('a, button, .card, .carousel__card, .masonry__item, .tilt-card, input, textarea');
    hoverEls.forEach(el => {
      el.addEventListener('mouseenter', () => this.cursor.classList.add('cursor--hover'));
      el.addEventListener('mouseleave', () => this.cursor.classList.remove('cursor--hover'));
    });

    this.render();
  }

  render() {
    this.pos.x += (this.mouse.x - this.pos.x) * this.speed;
    this.pos.y += (this.mouse.y - this.pos.y) * this.speed;
    this.cursor.style.left = this.pos.x + 'px';
    this.cursor.style.top = this.pos.y + 'px';
    requestAnimationFrame(() => this.render());
  }
}

// ===========================
// Navigation
// ===========================
class Navigation {
  constructor() {
    this.nav = document.querySelector('.nav');
    this.hamburger = document.querySelector('.nav__hamburger');
    this.mobileMenu = document.querySelector('.nav__mobile-menu');
    this.links = document.querySelectorAll('.nav__link');

    if (!this.nav) return;
    this.init();
  }

  init() {
    // Scroll effect
    window.addEventListener('scroll', () => {
      this.nav.classList.toggle('scrolled', window.scrollY > 50);
    });

    // Hamburger toggle
    if (this.hamburger && this.mobileMenu) {
      this.hamburger.addEventListener('click', () => this.toggleMenu());

      // Close on link click
      this.mobileMenu.querySelectorAll('.nav__link').forEach(link => {
        link.addEventListener('click', () => this.toggleMenu());
      });
    }

    // Set active link
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    this.links.forEach(link => {
      const href = link.getAttribute('href');
      if (href === currentPage || (currentPage === '' && href === 'index.html')) {
        link.classList.add('active');
      }
    });
  }

  toggleMenu() {
    this.hamburger.classList.toggle('active');
    this.mobileMenu.classList.toggle('active');
    document.body.style.overflow = this.mobileMenu.classList.contains('active') ? 'hidden' : '';
  }
}

// ===========================
// Page Transitions
// ===========================
class PageTransition {
  constructor() {
    this.overlay = document.querySelector('.page-transition');
    if (!this.overlay) return;
    this.init();
  }

  init() {
    // Animate in on page load
    gsap.fromTo(this.overlay,
      { scaleY: 1 },
      { scaleY: 0, duration: 0.8, ease: 'power4.inOut', delay: 0.1 }
    );

    // Intercept link clicks for transition
    document.querySelectorAll('a[href]').forEach(link => {
      const href = link.getAttribute('href');
      if (!href || href.startsWith('#') || href.startsWith('http') || href.startsWith('mailto')) return;

      link.addEventListener('click', (e) => {
        e.preventDefault();
        this.navigateTo(href);
      });
    });
  }

  navigateTo(url) {
    gsap.to(this.overlay, {
      scaleY: 1,
      duration: 0.6,
      ease: 'power4.inOut',
      transformOrigin: 'top',
      onComplete: () => {
        window.location.href = url;
      }
    });
  }
}

// ===========================
// Scroll Reveal
// ===========================
class ScrollReveal {
  constructor() {
    this.init();
  }

  init() {
    // Fade up reveals
    gsap.utils.toArray('.reveal').forEach(el => {
      gsap.to(el, {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 85%',
          toggleActions: 'play none none none'
        }
      });
    });

    // Left reveals
    gsap.utils.toArray('.reveal--left').forEach(el => {
      gsap.to(el, {
        opacity: 1,
        x: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 85%',
          toggleActions: 'play none none none'
        }
      });
    });

    // Right reveals
    gsap.utils.toArray('.reveal--right').forEach(el => {
      gsap.to(el, {
        opacity: 1,
        x: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 85%',
          toggleActions: 'play none none none'
        }
      });
    });

    // Scale reveals
    gsap.utils.toArray('.reveal--scale').forEach(el => {
      gsap.to(el, {
        opacity: 1,
        scale: 1,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 85%',
          toggleActions: 'play none none none'
        }
      });
    });

    // Stagger children
    gsap.utils.toArray('.stagger-children').forEach(container => {
      const children = container.children;
      gsap.to(children, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: container,
          start: 'top 85%',
          toggleActions: 'play none none none'
        }
      });
    });
  }
}

// ===========================
// Magnetic Buttons
// ===========================
class MagneticButtons {
  constructor() {
    this.buttons = document.querySelectorAll('.magnetic-btn');
    if (!this.buttons.length) return;
    this.init();
  }

  init() {
    this.buttons.forEach(btn => {
      btn.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        btn.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
      });

      btn.addEventListener('mouseleave', () => {
        btn.style.transform = 'translate(0, 0)';
      });
    });
  }
}

// ===========================
// Text Split Animation
// ===========================
function splitTextAnimation(selector, options = {}) {
  const elements = document.querySelectorAll(selector);
  elements.forEach(el => {
    const text = el.textContent;
    el.innerHTML = '';
    el.style.visibility = 'visible';

    [...text].forEach((char, i) => {
      const span = document.createElement('span');
      span.textContent = char === ' ' ? '\u00A0' : char;
      span.style.display = 'inline-block';
      span.style.opacity = '0';
      span.style.transform = 'translateY(40px)';
      el.appendChild(span);
    });

    const chars = el.querySelectorAll('span');
    gsap.to(chars, {
      opacity: 1,
      y: 0,
      duration: options.duration || 0.8,
      stagger: options.stagger || 0.03,
      ease: options.ease || 'power3.out',
      delay: options.delay || 0.5,
      scrollTrigger: options.scrollTrigger ? {
        trigger: el,
        start: 'top 80%',
      } : null
    });
  });
}

// ===========================
// ===========================
// Page Curl — inject corner elements
// ===========================
function initPageCurl() {
  document.querySelectorAll('.page-curl').forEach(el => {
    // Skip if already injected
    if (el.querySelector('.curl-corner')) return;
    const corner = document.createElement('div');
    corner.className = 'curl-corner';
    corner.innerHTML = '<div class="curl-corner__shadow"></div><div class="curl-corner__fold"></div>';
    el.appendChild(corner);
  });
}

// Initialize on DOM ready
// ===========================
document.addEventListener('DOMContentLoaded', () => {
  new CustomCursor();
  new Navigation();
  new PageTransition();
  new ScrollReveal();
  new MagneticButtons();
  initPageCurl();
});
