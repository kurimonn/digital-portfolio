/* ===========================
   Design Page — Interactions
   =========================== */

document.addEventListener('DOMContentLoaded', () => {
  splitTextAnimation('.page-hero__title', { delay: 0.5, scrollTrigger: false });
  initLightbox();
  initParallax();
});

// ===========================
// Lightbox
// ===========================
function initLightbox() {
  const lightbox = document.querySelector('.lightbox');
  if (!lightbox) return;

  const lightboxImg = lightbox.querySelector('.lightbox__img');
  const lightboxTitle = lightbox.querySelector('.lightbox__title');
  const lightboxDesc = lightbox.querySelector('.lightbox__desc');
  const lightboxClose = lightbox.querySelector('.lightbox__close');
  const lightboxPrev = lightbox.querySelector('.lightbox__prev');
  const lightboxNext = lightbox.querySelector('.lightbox__next');

  const items = document.querySelectorAll('.masonry__item');
  let currentIndex = 0;

  function openLightbox(index) {
    currentIndex = index;
    const item = items[index];
    const color = item.getAttribute('data-color') || '#6c63ff';
    const title = item.getAttribute('data-title') || '';
    const desc = item.getAttribute('data-desc') || '';

    lightboxImg.style.background = color;
    lightboxTitle.textContent = title;
    lightboxDesc.textContent = desc;
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
  }

  function navigate(dir) {
    currentIndex = (currentIndex + dir + items.length) % items.length;
    const item = items[currentIndex];
    const color = item.getAttribute('data-color') || '#6c63ff';
    const title = item.getAttribute('data-title') || '';
    const desc = item.getAttribute('data-desc') || '';

    gsap.to(lightboxImg, {
      opacity: 0,
      duration: 0.2,
      onComplete: () => {
        lightboxImg.style.background = color;
        lightboxTitle.textContent = title;
        lightboxDesc.textContent = desc;
        gsap.to(lightboxImg, { opacity: 1, duration: 0.3 });
      }
    });
  }

  items.forEach((item, i) => {
    item.addEventListener('click', () => openLightbox(i));
  });

  lightboxClose.addEventListener('click', closeLightbox);
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
  });
  lightboxPrev.addEventListener('click', () => navigate(-1));
  lightboxNext.addEventListener('click', () => navigate(1));

  document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('active')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') navigate(-1);
    if (e.key === 'ArrowRight') navigate(1);
  });
}

// ===========================
// Parallax on scroll
// ===========================
function initParallax() {
  gsap.utils.toArray('.parallax-item').forEach(item => {
    const speed = item.getAttribute('data-speed') || 0.2;
    gsap.to(item, {
      y: () => -100 * speed,
      ease: 'none',
      scrollTrigger: {
        trigger: item,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1,
      }
    });
  });
}
