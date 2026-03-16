/* ===========================
   Data Analysis Page — Interactions
   =========================== */

document.addEventListener('DOMContentLoaded', () => {
  splitTextAnimation('.page-hero__title', { delay: 0.5, scrollTrigger: false });
  initCountUp();
  initChartAnimations();
});

// ===========================
// Count Up Animation
// ===========================
function initCountUp() {
  const counters = document.querySelectorAll('.counter');
  counters.forEach(counter => {
    const target = parseInt(counter.getAttribute('data-target'));
    const suffix = counter.getAttribute('data-suffix') || '';
    const prefix = counter.getAttribute('data-prefix') || '';

    ScrollTrigger.create({
      trigger: counter,
      start: 'top 85%',
      once: true,
      onEnter: () => {
        gsap.to(counter, {
          duration: 2,
          ease: 'power2.out',
          onUpdate: function() {
            const progress = this.progress();
            const current = Math.round(target * progress);
            counter.textContent = prefix + current.toLocaleString() + suffix;
          }
        });
      }
    });
  });
}

// ===========================
// SVG Chart Animations
// ===========================
function initChartAnimations() {
  // Animate bar charts
  const bars = document.querySelectorAll('.chart-bar');
  bars.forEach(bar => {
    const targetHeight = bar.getAttribute('data-height');
    bar.style.height = '0';

    ScrollTrigger.create({
      trigger: bar,
      start: 'top 90%',
      once: true,
      onEnter: () => {
        gsap.to(bar, {
          height: targetHeight,
          duration: 1.2,
          ease: 'power3.out',
        });
      }
    });
  });

  // Animate circle charts (donut)
  const circles = document.querySelectorAll('.chart-circle');
  circles.forEach(circle => {
    const circumference = 2 * Math.PI * 54; // r=54
    const percent = circle.getAttribute('data-percent');
    const offset = circumference - (percent / 100) * circumference;

    circle.style.strokeDasharray = circumference;
    circle.style.strokeDashoffset = circumference;

    ScrollTrigger.create({
      trigger: circle,
      start: 'top 85%',
      once: true,
      onEnter: () => {
        gsap.to(circle, {
          strokeDashoffset: offset,
          duration: 1.5,
          ease: 'power3.out'
        });
      }
    });
  });
}
