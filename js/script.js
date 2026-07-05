// Mobile nav toggle
const hamburger = document.getElementById('hamburger');
const mobileNav = document.getElementById('mobileNav');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  mobileNav.classList.toggle('active');
});

mobileNav.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('active');
    mobileNav.classList.remove('active');
  });
});

// Header scroll state
const header = document.getElementById('header');
window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 20);
});

// Footer year
document.getElementById('year').textContent = new Date().getFullYear();

// Contact form: sends the enquiry straight to WhatsApp
const WHATSAPP_NUMBER = '447405307141';
const SERVICE_LABELS = {
  repairs: 'General Repairs',
  maintenance: 'Property Maintenance',
  improvements: 'Home Improvements',
  stairs: 'Stair Renovation',
  carpentry: 'Carpentry & Joinery',
  painting: 'Painting & Decorating',
  flooring: 'Flooring Installation',
  emergency: 'Emergency Call-Out',
  other: 'Other / Not Sure'
};

const form = document.getElementById('contactForm');
const formNote = document.getElementById('formNote');

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const data = new FormData(form);
  const name = data.get('name').trim();
  const phone = data.get('phone').trim();
  const service = SERVICE_LABELS[data.get('service')] || 'Not specified';
  const message = data.get('message').trim();

  const text =
    `Hi M. Roche Property Projects, I'd like a quote.\n\n` +
    `Name: ${name}\n` +
    `Phone: ${phone}\n` +
    `Service: ${service}\n` +
    `Details: ${message}`;

  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
  window.open(whatsappUrl, '_blank');

  formNote.textContent = 'Opening WhatsApp. Just hit send in the chat to reach us.';
  form.reset();
});

// Scroll-reveal animation
const revealEls = document.querySelectorAll(
  '.service-card, .about__content, .about__image, .showcase, .process__step'
);

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

revealEls.forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(24px)';
  el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  observer.observe(el);
});
