/* ===========================
   Projects Page — Interactions
   =========================== */

document.addEventListener('DOMContentLoaded', () => {
  initFilters();
  initTiltCards();
  initProjectModal();
  splitTextAnimation('.page-hero__title', { delay: 0.5, scrollTrigger: false });
});

// ===========================
// Filter functionality
// ===========================
function initFilters() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const cards = document.querySelectorAll('.project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Update active button
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      cards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filter === 'all' || category === filter) {
          gsap.to(card, {
            opacity: 1,
            scale: 1,
            duration: 0.4,
            ease: 'power2.out',
            onStart: () => { card.style.display = 'block'; }
          });
        } else {
          gsap.to(card, {
            opacity: 0,
            scale: 0.95,
            duration: 0.3,
            ease: 'power2.in',
            onComplete: () => { card.style.display = 'none'; }
          });
        }
      });
    });
  });
}

// ===========================
// 3D Tilt Effect
// ===========================
function initTiltCards() {
  const cards = document.querySelectorAll('.tilt-card');
  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = (y - centerY) / 20;
      const rotateY = (centerX - x) / 20;

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;

      // Move shine effect
      const shine = card.querySelector('.card-shine');
      if (shine) {
        shine.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(255,255,255,0.1) 0%, transparent 60%)`;
      }
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
      const shine = card.querySelector('.card-shine');
      if (shine) shine.style.background = 'none';
    });
  });
}

// ===========================
// Project Modal
// ===========================
function initProjectModal() {
  const modal = document.querySelector('.modal-overlay');
  if (!modal) return;

  const modalBody = modal.querySelector('.modal');
  const modalClose = modal.querySelector('.modal__close');

  // Open modal on card click (skip cards that are <a> links — they open PDFs directly)
  document.querySelectorAll('.project-card').forEach(card => {
    if (card.tagName === 'A') return;
    card.addEventListener('click', () => {
      const title = card.querySelector('.card__title').textContent;
      const desc = card.querySelector('.card__desc').textContent;
      const tag = card.querySelector('.card__tag').textContent;
      const tags = card.getAttribute('data-tags') || '';
      const color = card.getAttribute('data-color') || '#6c63ff';

      modal.querySelector('.modal__title').textContent = title;
      modal.querySelector('.modal__desc').textContent = desc;
      modal.querySelector('.modal__tag').textContent = tag;
      modal.querySelector('.modal__header').style.background = color;

      // Set tech tags
      const tagsContainer = modal.querySelector('.modal__tags');
      tagsContainer.innerHTML = '';
      if (tags) {
        tags.split(',').forEach(t => {
          const span = document.createElement('span');
          span.className = 'tag';
          span.textContent = t.trim();
          tagsContainer.appendChild(span);
        });
      }

      modal.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  });

  // Close modal
  modalClose.addEventListener('click', closeModal);
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
  });

  function closeModal() {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }
}
