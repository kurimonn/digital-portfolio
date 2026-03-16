/* ===========================
   About Page — Interactions
   =========================== */

document.addEventListener('DOMContentLoaded', () => {
  splitTextAnimation('.page-hero__title', { delay: 0.5, scrollTrigger: false });
  initTimeline();
  initFormEffects();
});

// ===========================
// Timeline Animation
// ===========================
function initTimeline() {
  const items = document.querySelectorAll('.timeline__item');
  items.forEach((item, i) => {
    gsap.from(item, {
      opacity: 0,
      x: -30,
      duration: 0.8,
      delay: i * 0.15,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: item,
        start: 'top 85%',
      }
    });

    // Animate the dot
    const dot = item.querySelector('.timeline__dot');
    if (dot) {
      gsap.from(dot, {
        scale: 0,
        duration: 0.5,
        delay: i * 0.15 + 0.2,
        ease: 'back.out(2)',
        scrollTrigger: {
          trigger: item,
          start: 'top 85%',
        }
      });
    }
  });

  // Animate the timeline line
  const timeline = document.querySelector('.timeline');
  if (timeline) {
    const line = timeline.querySelector('::before') || timeline;
    gsap.fromTo(timeline,
      { '--line-height': '0%' },
      {
        '--line-height': '100%',
        ease: 'none',
        scrollTrigger: {
          trigger: timeline,
          start: 'top 80%',
          end: 'bottom 20%',
          scrub: 1,
        }
      }
    );
  }
}

// ===========================
// Form Effects
// ===========================
function initFormEffects() {
  const inputs = document.querySelectorAll('.form-group__input, .form-group__textarea');

  inputs.forEach(input => {
    // Focus ripple effect
    input.addEventListener('focus', () => {
      gsap.from(input.parentElement.querySelector('.form-group__line'), {
        width: 0,
        duration: 0.5,
        ease: 'power2.out'
      });
    });
  });

  // Form submit animation
  const form = document.querySelector('.contact-form');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = form.querySelector('.btn--primary');

      gsap.to(btn, {
        scale: 0.95,
        duration: 0.1,
        yoyo: true,
        repeat: 1,
        onComplete: () => {
          btn.textContent = 'Message Sent! ✓';
          btn.style.background = 'linear-gradient(135deg, #5a7248, #9ab888)';

          setTimeout(() => {
            btn.textContent = 'Send Message';
            btn.style.background = '';
            form.reset();
          }, 3000);
        }
      });
    });
  }
}
