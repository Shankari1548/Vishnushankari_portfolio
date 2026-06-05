// ─── SYNCED ROLE + TYPEWRITER ─────────────
const pairs = [
  { role: 'Full Stack Developer',  phrase: 'I build modern applications.' },
  { role: 'Web Developer',         phrase: 'I create responsive web experiences.' },
  { role: 'SQL Developer',         phrase: 'I manage data with efficient SQL solutions.' },
  { role: 'AI Engineer',           phrase: 'I craft AI-powered solutions.' },
  { role: 'Data Scientist',        phrase: 'I analyze real-world data.'    },
  { role: 'Data Analyst',          phrase: 'I turn data into insights.'    },
  { role: 'UI \u0026 UX Designer',      phrase: 'I create beautiful UIs.'       },
  { role: 'Python Developer',      phrase: 'I love Data Science \u0026 ML.'     },
];

const roleEl      = document.getElementById('tagline-role');
const typewriterEl = document.getElementById('typewriter');
let pairIndex = 0, charIndex = 0, isDeleting = false;

// Show first role immediately
roleEl.textContent = pairs[0].role;
roleEl.style.opacity = '1';

function typeTick() {
  const current = pairs[pairIndex].phrase;
  typewriterEl.textContent = current.substring(0, charIndex);

  let delay = isDeleting ? 50 : 90;

  if (!isDeleting && charIndex === current.length) {
    // Finished typing — pause, then delete
    delay = 1800;
    isDeleting = true;
  } else if (isDeleting && charIndex === 0) {
    // Finished deleting — advance to next pair
    isDeleting = false;
    pairIndex = (pairIndex + 1) % pairs.length;

    // Fade role out → swap → fade in
    roleEl.style.opacity = '0';
    setTimeout(() => {
      roleEl.textContent = pairs[pairIndex].role;
      roleEl.style.opacity = '1';
    }, 400);

    delay = 500;
  }

  charIndex += isDeleting ? -1 : 1;
  setTimeout(typeTick, delay);
}
typeTick();

// ─── PROFILE PHOTO FLIP ON CLICK ────────
const photoFrame = document.querySelector('.hero-photo-frame');
const profilePhoto = document.getElementById('profile-photo');
if (photoFrame) {
  photoFrame.addEventListener('click', () => {
    photoFrame.classList.toggle('flipped');
    profilePhoto.style.transition = 'transform 0.6s ease-in-out';
  });
}


// ─── REVEAL ON SCROLL WITH STAGGER ────────
const reveals = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      const bar = entry.target.querySelector('.skill-bar-fill');
      if (bar) {
        setTimeout(() => { bar.style.width = bar.getAttribute('data-width') + '%'; }, 200);
      }
    }
  });
}, { threshold: 0.15 });

// Stagger index for sibling cards
document.querySelectorAll('.skills-grid, .projects-grid, .cert-grid, .awards-grid').forEach(grid => {
  grid.querySelectorAll('.reveal').forEach((el, i) => el.style.setProperty('--i', i));
});
reveals.forEach(el => revealObserver.observe(el));

// ─── NAVBAR SCROLL EFFECT ─────────────────
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 60) {
    navbar.style.background = 'rgba(244, 249, 255, 0.97)';
    navbar.style.boxShadow = '0 4px 24px rgba(58,123,213,0.12)';
  } else {
    navbar.style.background = 'rgba(244, 249, 255, 0.92)';
    navbar.style.boxShadow = 'none';
  }
});

// ─── ACTIVE NAV LINK HIGHLIGHT ────────────
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');
window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(s => {
    if (window.scrollY >= s.offsetTop - 120) current = s.id;
  });
  navLinks.forEach(a => {
    a.style.color = a.getAttribute('href') === '#' + current
      ? 'var(--accent-light)' : '';
  });
});

// ─── 3D MOUSE-TILT FOR CARDS ─────────────
function addTilt(selector, maxAngle = 12) {
  document.querySelectorAll(selector).forEach(card => {
    card.addEventListener('mousemove', e => {
      const r = card.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width  - 0.5;
      const y = (e.clientY - r.top)  / r.height - 0.5;
      const dist = Math.sqrt(x * x + y * y);
      const scale = 1.04 + dist * 0.03;
      card.style.transform =
        `perspective(900px) rotateX(${(-y * maxAngle).toFixed(1)}deg) rotateY(${(x * maxAngle).toFixed(1)}deg) scale(${scale.toFixed(3)}) translateZ(18px)`;
      card.style.boxShadow =
        `${-x*28}px ${(-y*28)+20}px 55px rgba(58,123,213,0.28), 0 8px 20px rgba(91,184,160,0.15), inset 0 1px 0 rgba(255,255,255,0.5)`;
      card.style.borderColor = 'rgba(58,123,213,0.28)';
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
      card.style.boxShadow = '';
      card.style.borderColor = '';
    });
  });
}
addTilt('.skill-card', 14);
addTilt('.project-card', 14);
addTilt('.cert-card', 12);
addTilt('.award-card', 10);
addTilt('.timeline-card', 8);

// ─── HAMBURGER MENU ───────────────────────
const hamburger = document.getElementById('hamburger');
const navLinksEl = document.getElementById('navLinks');
if (hamburger) {
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinksEl.classList.toggle('open');
  });
  navLinksEl.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      hamburger.classList.remove('active');
      navLinksEl.classList.remove('open');
    });
  });
}

// ─── SCROLL TO TOP ────────────────────────
const scrollBtn = document.getElementById('scrollTop');
window.addEventListener('scroll', () => {
  scrollBtn.classList.toggle('show', window.scrollY > 400);
});
scrollBtn.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ─── ANIMATED COUNTERS ────────────────────
const counters = document.querySelectorAll('.stat-number');
const counterObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    const el = entry.target;
    const target = parseFloat(el.dataset.target);
    const isDecimal = target % 1 !== 0;
    const duration = 1500;
    const start = performance.now();
    const animate = now => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = isDecimal ? (target * eased).toFixed(1) : Math.floor(target * eased);
      if (progress < 1) requestAnimationFrame(animate);
      else el.textContent = isDecimal ? target.toFixed(1) : target;
    };
    requestAnimationFrame(animate);
    counterObserver.unobserve(el);
  });
}, { threshold: 0.5 });
counters.forEach(c => counterObserver.observe(c));

// ─── FLOATING PARTICLES ──────────────────
const particleContainer = document.getElementById('particles');
for (let i = 0; i < 15; i++) {
  const p = document.createElement('div');
  p.className = 'particle';
  p.style.left = Math.random() * 100 + 'vw';
  p.style.animationDelay = Math.random() * 8 + 's';
  p.style.animationDuration = (6 + Math.random() * 6) + 's';
  p.style.width = p.style.height = (2 + Math.random() * 3) + 'px';
  particleContainer.appendChild(p);
}

// ─── SMOOTH SCROLL FOR ANCHOR LINKS ──────
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    e.preventDefault();
    const target = document.querySelector(a.getAttribute('href'));
    if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});
