// Reveal on scroll
const reveals = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');

      // Animate skill bars on reveal
      const bar = entry.target.querySelector('.skill-bar-fill');
      if (bar) {
        const targetWidth = bar.getAttribute('data-width');
        setTimeout(() => {
          bar.style.width = targetWidth + '%';
        }, 200);
      }
    }
  });
}, { threshold: 0.15 });

reveals.forEach(el => revealObserver.observe(el));

// Navbar scroll effect
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 60) {
    navbar.style.background = 'rgba(10, 0, 16, 0.95)';
    navbar.style.padding = '12px 8%';
  } else {
    navbar.style.background = 'rgba(10, 0, 16, 0.75)';
    navbar.style.padding = '18px 8%';
  }
});
