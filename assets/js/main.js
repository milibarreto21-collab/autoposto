/* =========================================================
   POSTO GRANADA – main.js
   ========================================================= */

(function () {
  'use strict';

  /* ── Navbar scroll ─────────────────────────────────────── */
  const header = document.getElementById('header');
  function onScroll() {
    header.classList.toggle('scrolled', window.scrollY > 40);
    // Back to top
    const btn = document.getElementById('backToTop');
    if (btn) btn.hidden = window.scrollY < 400;
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ── Hamburger / Mobile Nav ────────────────────────────── */
  const hamburger = document.getElementById('hamburger');
  const nav = document.getElementById('nav');
  if (hamburger && nav) {
    hamburger.addEventListener('click', () => {
      const isOpen = nav.classList.toggle('open');
      hamburger.classList.toggle('active', isOpen);
      hamburger.setAttribute('aria-expanded', String(isOpen));
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    // Close on nav link click
    nav.querySelectorAll('.nav__link').forEach(link => {
      link.addEventListener('click', () => {
        nav.classList.remove('open');
        hamburger.classList.remove('active');
        hamburger.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      });
    });

    // Close on outside click
    document.addEventListener('click', (e) => {
      if (nav.classList.contains('open') && !nav.contains(e.target) && !hamburger.contains(e.target)) {
        nav.classList.remove('open');
        hamburger.classList.remove('active');
        hamburger.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      }
    });
  }

  /* ── Active nav link on scroll ─────────────────────────── */
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav__link[href^="#"]');
  function updateActiveLink() {
    const scrollY = window.scrollY + 100;
    sections.forEach(section => {
      const top = section.offsetTop;
      const bottom = top + section.offsetHeight;
      const id = section.getAttribute('id');
      if (scrollY >= top && scrollY < bottom) {
        navLinks.forEach(link => {
          link.classList.toggle('active', link.getAttribute('href') === '#' + id);
        });
      }
    });
  }
  window.addEventListener('scroll', updateActiveLink, { passive: true });

  /* ── Smooth anchor scroll ──────────────────────────────── */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const href = anchor.getAttribute('href');
      if (href === '#') return;
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        const offset = header ? header.offsetHeight : 72;
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

  /* ── Back to top ───────────────────────────────────────── */
  const backToTop = document.getElementById('backToTop');
  if (backToTop) {
    backToTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ── AOS (Animate on Scroll) – built-in ────────────────── */
  function initAOS() {
    const els = document.querySelectorAll('[data-aos]');
    if (!els.length) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const delay = parseInt(el.getAttribute('data-aos-delay') || '0', 10);
          setTimeout(() => el.classList.add('aos-animate'), delay);
          observer.unobserve(el);
        }
      });
    }, { threshold: 0.12 });

    els.forEach(el => observer.observe(el));
  }
  initAOS();

  /* ── Phone mask ─────────────────────────────────────────── */
  const phoneInput = document.getElementById('phone');
  if (phoneInput) {
    phoneInput.addEventListener('input', (e) => {
      let v = e.target.value.replace(/\D/g, '').slice(0, 11);
      if (v.length > 10) {
        v = v.replace(/^(\d{2})(\d{5})(\d{4})$/, '($1) $2-$3');
      } else if (v.length > 6) {
        v = v.replace(/^(\d{2})(\d{4})(\d*)$/, '($1) $2-$3');
      } else if (v.length > 2) {
        v = v.replace(/^(\d{2})(\d*)$/, '($1) $2');
      }
      e.target.value = v;
    });
  }

  /* ── Contact form validation ───────────────────────────── */
  const form = document.getElementById('contactForm');
  if (form) {
    const fields = {
      name:    { el: document.getElementById('name'),    err: document.getElementById('nameError'),    min: 3,  msg: 'Informe seu nome completo.' },
      phone:   { el: document.getElementById('phone'),   err: document.getElementById('phoneError'),   min: 10, msg: 'Informe um telefone válido.' },
      email:   { el: document.getElementById('email'),   err: document.getElementById('emailError'),   min: 0,  msg: 'Informe um e-mail válido.' },
      subject: { el: document.getElementById('subject'), err: document.getElementById('subjectError'), min: 1,  msg: 'Selecione um assunto.' },
      message: { el: document.getElementById('message'), err: document.getElementById('messageError'), min: 10, msg: 'A mensagem precisa ter pelo menos 10 caracteres.' },
    };

    function validateField(key) {
      const { el, err, min, msg } = fields[key];
      if (!el || !err) return true;
      let value = el.value.trim();

      // Remove mask for phone length check
      if (key === 'phone') value = value.replace(/\D/g, '');

      let valid = true;
      let errorMsg = '';

      if (el.hasAttribute('required') && value.length < min) {
        valid = false;
        errorMsg = msg;
      } else if (key === 'email' && value.length > 0) {
        const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRe.test(value)) { valid = false; errorMsg = msg; }
      }

      el.classList.toggle('error', !valid);
      err.textContent = errorMsg;
      return valid;
    }

    // Real-time validation
    Object.keys(fields).forEach(key => {
      const { el } = fields[key];
      if (el) {
        el.addEventListener('blur', () => validateField(key));
        el.addEventListener('input', () => {
          if (el.classList.contains('error')) validateField(key);
        });
      }
    });

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const results = Object.keys(fields).map(validateField);
      if (results.includes(false)) return;

      const submitBtn = document.getElementById('submitBtn');
      const successEl = document.getElementById('formSuccess');

      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
      }

      // Simulate sending (replace with real fetch/API call)
      setTimeout(() => {
        form.reset();
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.innerHTML = '<i class="fas fa-paper-plane"></i> Enviar Mensagem';
        }
        if (successEl) {
          successEl.hidden = false;
          setTimeout(() => { successEl.hidden = true; }, 6000);
        }
      }, 1500);
    });
  }

  /* ── WhatsApp float pulse ──────────────────────────────── */
  const waf = document.querySelector('.whatsapp-float');
  if (waf) {
    setTimeout(() => { waf.style.animation = 'waPulse 2s ease-in-out 3'; }, 3000);
  }

  /* ── Fuel card hover accent line ───────────────────────── */
  document.querySelectorAll('.fuel-card').forEach(card => {
    card.addEventListener('mouseenter', () => card.style.transform = 'translateY(-8px)');
    card.addEventListener('mouseleave', () => card.style.transform = '');
  });

})();
