// SCOPEIFY — shared site behavior

document.addEventListener('DOMContentLoaded', () => {

  /* ---------- mobile nav ---------- */
  const toggle = document.querySelector('.nav-toggle');
  const nav = document.querySelector('.nav');
  if (toggle && nav){
    toggle.addEventListener('click', () => nav.classList.toggle('open'));
    // mobile dropdown accordion
    document.querySelectorAll('.has-dropdown > .nav-link').forEach(link => {
      link.addEventListener('click', (e) => {
        if (window.innerWidth <= 900){
          e.preventDefault();
          link.parentElement.classList.toggle('open');
        }
      });
    });
  }

  /* ---------- mark active nav link ---------- */
  const path = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-link[data-page]').forEach(a => {
    if (a.dataset.page === path) a.classList.add('active');
  });

  /* ---------- scroll reveal ---------- */
  const revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && revealEls.length){
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting){
          entry.target.classList.add('in');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    revealEls.forEach(el => io.observe(el));
  } else {
    revealEls.forEach(el => el.classList.add('in'));
  }

  /* ---------- testimonial carousel ---------- */
  const track = document.querySelector('.carousel-track');
  if (track){
    const slides = track.querySelectorAll('.t-slide');
    const navWrap = document.querySelector('.carousel-nav');
    let idx = 0;
    slides.forEach((_, i) => {
      const b = document.createElement('button');
      if (i === 0) b.classList.add('active');
      b.setAttribute('aria-label', 'Go to testimonial ' + (i+1));
      b.addEventListener('click', () => goTo(i));
      navWrap.appendChild(b);
    });
    function goTo(i){
      idx = i;
      track.style.transform = `translateX(-${idx * 100}%)`;
      navWrap.querySelectorAll('button').forEach((b, bi) => b.classList.toggle('active', bi === idx));
    }
    let timer = setInterval(() => goTo((idx + 1) % slides.length), 6000);
    document.querySelector('.carousel').addEventListener('mouseenter', () => clearInterval(timer));
    document.querySelector('.carousel').addEventListener('mouseleave', () => {
      timer = setInterval(() => goTo((idx + 1) % slides.length), 6000);
    });
  }

  /* ---------- pricing billing toggle ---------- */
  const billingToggle = document.querySelector('.pricing-toggle');
  if (billingToggle){
    const buttons = billingToggle.querySelectorAll('button');
    buttons.forEach(btn => {
      btn.addEventListener('click', () => {
        buttons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const mode = btn.dataset.mode;
        document.querySelectorAll('[data-monthly]').forEach(el => {
          el.textContent = mode === 'annual' ? el.dataset.annual : el.dataset.monthly;
        });
        document.querySelectorAll('.price-suffix').forEach(el => {
          el.textContent = mode === 'annual' ? '/mo, billed annually' : '/month';
        });
      });
    });
  }

  /* ---------- contact form (demo submit) ---------- */
  const form = document.querySelector('#contact-form');
  if (form){
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const status = document.querySelector('#form-status');
      status.textContent = 'Routing your request through our encrypted intake channel…';
      status.style.color = 'var(--text-mute)';
      setTimeout(() => {
        status.textContent = 'Received. A systems strategist will respond within one business day.';
        status.style.color = 'var(--mint)';
        form.reset();
      }, 900);
    });
  }

});
