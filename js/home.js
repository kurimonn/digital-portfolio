/* ===========================
   Home Page — Animations & Interactions
   =========================== */

document.addEventListener('DOMContentLoaded', () => {
  // initParticles(); // Removed — using CSS wave animation instead
  initHeroSlideshow();
  initHeroAnimation();
  initHeroParallax();
  initBookFlip();
  initSkillBars();
  initCategoryCards();
});

// ===========================
// Particle Background (Canvas)
// ===========================
function initParticles() {
  const canvas = document.getElementById('particle-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let particles = [];
  let mouse = { x: null, y: null, radius: 150 };

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  canvas.addEventListener('mousemove', (e) => {
    mouse.x = e.x;
    mouse.y = e.y;
  });

  class Particle {
    constructor() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.size = Math.random() * 2 + 0.5;
      this.speedX = (Math.random() - 0.5) * 0.5;
      this.speedY = (Math.random() - 0.5) * 0.5;
      this.opacity = Math.random() * 0.5 + 0.1;
    }

    update() {
      this.x += this.speedX;
      this.y += this.speedY;

      if (mouse.x !== null) {
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < mouse.radius) {
          const force = (mouse.radius - dist) / mouse.radius;
          this.x -= dx * force * 0.02;
          this.y -= dy * force * 0.02;
        }
      }

      if (this.x < 0) this.x = canvas.width;
      if (this.x > canvas.width) this.x = 0;
      if (this.y < 0) this.y = canvas.height;
      if (this.y > canvas.height) this.y = 0;
    }

    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(107, 143, 113, ${this.opacity})`;
      ctx.fill();
    }
  }

  const count = Math.min(120, Math.floor((canvas.width * canvas.height) / 10000));
  for (let i = 0; i < count; i++) {
    particles.push(new Particle());
  }

  function connectParticles() {
    for (let a = 0; a < particles.length; a++) {
      for (let b = a + 1; b < particles.length; b++) {
        const dx = particles[a].x - particles[b].x;
        const dy = particles[a].y - particles[b].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 120) {
          ctx.strokeStyle = `rgba(107, 143, 113, ${0.08 * (1 - dist / 120)})`;
          ctx.lineWidth = 0.5;
          ctx.beginPath();
          ctx.moveTo(particles[a].x, particles[a].y);
          ctx.lineTo(particles[b].x, particles[b].y);
          ctx.stroke();
        }
      }
    }
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => {
      p.update();
      p.draw();
    });
    connectParticles();
    requestAnimationFrame(animate);
  }

  animate();
}

// ===========================
// Hero Animation
// ===========================
// ===========================
// Hero Slideshow (Ken Burns)
// ===========================
function initHeroSlideshow() {
  const slides = document.querySelectorAll('.hero__slide');
  if (slides.length < 2) return;

  let current = 0;
  const interval = 8000; // 8 seconds per slide

  setInterval(() => {
    slides[current].classList.remove('active');
    current = (current + 1) % slides.length;
    slides[current].classList.add('active');
  }, interval);
}

// ===========================
// Hero Animation
// ===========================
// ===========================
// Hero Parallax Fade on Scroll
// ===========================
function initHeroParallax() {
  const content = document.querySelector('.hero__content');
  if (!content) return;

  gsap.to(content, {
    opacity: 0,
    y: -60,
    ease: 'none',
    scrollTrigger: {
      trigger: '.hero',
      start: 'top top',
      end: 'bottom top',
      scrub: true
    }
  });
}

function initHeroAnimation() {
  const content = document.querySelector('.hero__content');
  if (!content) return;

  const tl = gsap.timeline({ delay: 0.3 });

  // 1. Avatar
  tl.from('.hero__avatar', {
    opacity: 0, scale: 0.8, duration: 0.8, ease: 'back.out(1.5)'
  });

  // 2. Label
  tl.from('.hero__label', {
    opacity: 0, y: 15, duration: 0.6, ease: 'power2.out'
  }, '-=0.3');

  // 3. Title
  tl.from('.hero__title', {
    opacity: 0, y: 20, duration: 0.8, ease: 'power3.out'
  }, '-=0.2');

  // 4. Subtitle
  tl.from('.hero__subtitle', {
    opacity: 0, y: 20, duration: 0.7, ease: 'power2.out'
  }, '-=0.3');

  // 5. CTA buttons
  tl.from('.hero__cta', {
    opacity: 0, y: 15, duration: 0.6, ease: 'power2.out'
  }, '-=0.2');

  // 6. Scroll indicator
  tl.from('.scroll-indicator', {
    opacity: 0, duration: 0.8, ease: 'power2.out'
  }, '-=0.2');
}

// ===========================
// Book Page Flip
// ===========================
function initBookFlip() {
  const isMobile = window.innerWidth <= 768;
  const book = isMobile
    ? document.getElementById('project-book-mobile')
    : document.getElementById('project-book');
  if (!book) return;

  const pages = book.querySelectorAll('.book__page');
  const prevBtn = document.getElementById('book-prev');
  const nextBtn = document.getElementById('book-next');
  const dotsContainer = document.getElementById('book-dots');
  let currentPage = 0;
  const totalPages = pages.length;

  // Generate nav dots dynamically based on active book
  dotsContainer.innerHTML = '';
  for (let i = 0; i < totalPages; i++) {
    const dot = document.createElement('div');
    dot.classList.add('book__nav-dot');
    if (i === 0) dot.classList.add('active');
    dotsContainer.appendChild(dot);
  }
  const dots = dotsContainer.querySelectorAll('.book__nav-dot');

  // Set initial z-index stacking (last page on bottom)
  pages.forEach((page, i) => {
    page.style.zIndex = totalPages - i;
  });

  function updateNav() {
    prevBtn.disabled = currentPage === 0;
    nextBtn.disabled = currentPage >= totalPages;

    dots.forEach((dot, i) => {
      dot.classList.toggle('active', i === Math.min(currentPage, totalPages - 1));
    });
  }

  function updatePointerEvents() {
    pages.forEach((page, i) => {
      const front = page.querySelector('.book__page-front');
      if (i >= currentPage && !page.classList.contains('flipped')) {
        front.style.pointerEvents = (i === currentPage) ? 'auto' : 'none';
      } else {
        front.style.pointerEvents = 'none';
      }
    });
  }

  function flipForward() {
    if (currentPage >= totalPages) return;
    const page = pages[currentPage];

    // Bring flipping page to top
    page.style.zIndex = totalPages + currentPage + 1;

    page.classList.add('flipped');
    currentPage++;
    updateNav();
    updatePointerEvents();
  }

  function flipBackward() {
    if (currentPage <= 0) return;
    currentPage--;
    const page = pages[currentPage];
    page.classList.remove('flipped');

    // Reset z-index after animation
    setTimeout(() => {
      page.style.zIndex = totalPages - currentPage;
    }, 800);

    updateNav();
    updatePointerEvents();
  }

  // Button navigation
  nextBtn.addEventListener('click', flipForward);
  prevBtn.addEventListener('click', flipBackward);

  // Click on page to flip forward
  pages.forEach((page, i) => {
    page.addEventListener('click', (e) => {
      if (e.target.closest('a, button')) return;
      if (i === currentPage) {
        flipForward();
      }
    });
  });

  // Keyboard navigation
  document.addEventListener('keydown', (e) => {
    const rect = book.getBoundingClientRect();
    const inView = rect.top < window.innerHeight && rect.bottom > 0;
    if (!inView) return;

    if (e.key === 'ArrowRight') flipForward();
    if (e.key === 'ArrowLeft') flipBackward();
  });

  // Scroll-triggered entrance animation
  gsap.from(book, {
    opacity: 0,
    y: 40,
    duration: 1,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: book,
      start: 'top 80%',
    }
  });

  updateNav();
  updatePointerEvents();
}

// ===========================
// Skill Progress Bars
// ===========================
function initSkillBars() {
  const bars = document.querySelectorAll('.progress-bar__fill');
  bars.forEach(bar => {
    const value = bar.getAttribute('data-value');
    ScrollTrigger.create({
      trigger: bar,
      start: 'top 90%',
      onEnter: () => {
        bar.style.width = value + '%';
      }
    });
  });
}

// ===========================
// Category Navigation Cards
// ===========================
function initCategoryCards() {
  const cards = document.querySelectorAll('.category-card');
  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = (y - centerY) / 15;
      const rotateY = (centerX - x) / 15;

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
    });
  });
}
