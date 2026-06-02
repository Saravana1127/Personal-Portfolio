/**
 * main.js
 * Purpose: Main JavaScript for Saravana Vel Narayanan's portfolio.
 * Handles: Navigation, scroll effects, skill animations, project filters,
 *          contact form validation, and scroll reveal animations.
 * Approach: Modular, unobtrusive — all DOM access wrapped in DOMContentLoaded.
 */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  /* ===== Module: Header Scroll Effect ===== */
  const headerModule = (() => {
    const header = document.querySelector('.header');
    if (!header) return;

    const onScroll = () => {
      if (window.scrollY > 50) {
        header.classList.add('header--scrolled');
      } else {
        header.classList.remove('header--scrolled');
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll(); // Initial check
  })();

  /* ===== Module: Mobile Navigation ===== */
  const navModule = (() => {
    const toggle = document.getElementById('nav-toggle');
    const navList = document.getElementById('nav-list');
    const overlay = document.getElementById('nav-overlay');
    const navLinks = document.querySelectorAll('.nav__link');

    if (!toggle || !navList) return;

    const openNav = () => {
      toggle.classList.add('nav__toggle--active');
      navList.classList.add('nav__list--open');
      if (overlay) overlay.classList.add('nav__overlay--visible');
      toggle.setAttribute('aria-expanded', 'true');
      document.body.style.overflow = 'hidden';
    };

    const closeNav = () => {
      toggle.classList.remove('nav__toggle--active');
      navList.classList.remove('nav__list--open');
      if (overlay) overlay.classList.remove('nav__overlay--visible');
      toggle.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    };

    toggle.addEventListener('click', () => {
      const isOpen = navList.classList.contains('nav__list--open');
      isOpen ? closeNav() : openNav();
    });

    if (overlay) {
      overlay.addEventListener('click', closeNav);
    }

    // Close nav when a link is clicked (for single-page smooth scroll)
    navLinks.forEach(link => {
      link.addEventListener('click', closeNav);
    });

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') closeNav();
    });
  })();

  /* ===== Module: Active Navigation Highlight ===== */
  const activeNavModule = (() => {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav__link');

    if (!sections.length || !navLinks.length) return;

    const onScroll = () => {
      const scrollY = window.scrollY + 120;

      sections.forEach(section => {
        const top = section.offsetTop;
        const height = section.offsetHeight;
        const id = section.getAttribute('id');

        if (scrollY >= top && scrollY < top + height) {
          navLinks.forEach(link => {
            link.classList.remove('nav__link--active');
            if (link.getAttribute('href') === `#${id}`) {
              link.classList.add('nav__link--active');
            }
          });
        }
      });
    };

    window.addEventListener('scroll', onScroll, { passive: true });
  })();

  /* ===== Module: Skill Bar Animation ===== */
  const skillsModule = (() => {
    const skillFills = document.querySelectorAll('.skill__fill');
    if (!skillFills.length) return;

    let animated = false;

    const animateSkills = () => {
      skillFills.forEach(fill => {
        const target = fill.getAttribute('data-width');
        fill.style.width = target;
      });
    };

    // Use IntersectionObserver to trigger animation when skills section is visible
    const skillsSection = document.getElementById('skills');
    if (!skillsSection) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !animated) {
          animated = true;
          // Small delay for visual effect
          setTimeout(animateSkills, 200);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.2 });

    observer.observe(skillsSection);
  })();

  /* ===== Module: Project Filtering ===== */
  const projectFilterModule = (() => {
    const filterBtns = document.querySelectorAll('.projects__filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    if (!filterBtns.length || !projectCards.length) return;

    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const filter = btn.getAttribute('data-filter');

        // Update active state
        filterBtns.forEach(b => b.classList.remove('projects__filter-btn--active'));
        btn.classList.add('projects__filter-btn--active');

        // Filter cards
        projectCards.forEach(card => {
          const tags = card.getAttribute('data-tags');
          if (filter === 'all' || (tags && tags.includes(filter))) {
            card.style.display = '';
            card.style.animation = 'fadeInUp 0.4s ease forwards';
          } else {
            card.style.display = 'none';
          }
        });
      });
    });
  })();

  /* ===== Module: Contact Form Validation ===== */
  const formModule = (() => {
    const form = document.getElementById('contact-form');
    if (!form) return;

    const fields = {
      name: {
        el: document.getElementById('contact-name'),
        error: document.getElementById('name-error'),
        validate: (val) => val.trim().length >= 2
      },
      email: {
        el: document.getElementById('contact-email'),
        error: document.getElementById('email-error'),
        validate: (val) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)
      },
      message: {
        el: document.getElementById('contact-message'),
        error: document.getElementById('message-error'),
        validate: (val) => val.trim().length >= 10
      }
    };

    const honeypot = document.getElementById('contact-website');
    const successMsg = document.getElementById('form-success');

    /**
     * Validates a single field and toggles error state.
     * Returns true if valid.
     */
    const validateField = (field) => {
      const isValid = field.validate(field.el.value);
      const group = field.el.closest('.form__group');

      if (!isValid) {
        group.classList.add('form__group--error');
      } else {
        group.classList.remove('form__group--error');
      }

      return isValid;
    };

    // Real-time validation on blur
    Object.values(fields).forEach(field => {
      field.el.addEventListener('blur', () => validateField(field));
      // Remove error on input
      field.el.addEventListener('input', () => {
        const group = field.el.closest('.form__group');
        group.classList.remove('form__group--error');
      });
    });

    form.addEventListener('submit', (e) => {
      e.preventDefault();

      // Honeypot check — if filled, it's a bot
      if (honeypot && honeypot.value) {
        console.log('Bot detected via honeypot.');
        return;
      }

      // Validate all fields
      let isValid = true;
      Object.values(fields).forEach(field => {
        if (!validateField(field)) isValid = false;
      });

      if (!isValid) return;

      // Build mailto link (no backend)
      const name = fields.name.el.value.trim();
      const email = fields.email.el.value.trim();
      const message = fields.message.el.value.trim();

      const subject = encodeURIComponent(`Portfolio Contact from ${name}`);
      const body = encodeURIComponent(
        `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
      );

      window.location.href = `mailto:saravanaveln790@gmail.com?subject=${subject}&body=${body}`;

      // Show success message
      if (successMsg) {
        successMsg.classList.add('form__success--visible');
        setTimeout(() => {
          successMsg.classList.remove('form__success--visible');
        }, 5000);
      }

      // Reset form
      form.reset();
    });
  })();

  /* ===== Module: Scroll Reveal ===== */
  const revealModule = (() => {
    const elements = document.querySelectorAll('.reveal');
    if (!elements.length) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('reveal--visible');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    });

    elements.forEach(el => observer.observe(el));
  })();

  /* ===== Module: Back to Top Button ===== */
  const backToTopModule = (() => {
    const btn = document.getElementById('back-to-top');
    if (!btn) return;

    const onScroll = () => {
      if (window.scrollY > 400) {
        btn.classList.add('back-to-top--visible');
      } else {
        btn.classList.remove('back-to-top--visible');
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });

    btn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  })();

  /* ===== Module: Smooth Scroll for anchor links ===== */
  const smoothScrollModule = (() => {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', (e) => {
        const targetId = anchor.getAttribute('href');
        if (targetId === '#') return;

        const target = document.querySelector(targetId);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: 'smooth' });
        }
      });
    });
  })();

  /* ===== Module: Current Year in Footer ===== */
  const yearModule = (() => {
    const yearEl = document.getElementById('current-year');
    if (yearEl) {
      yearEl.textContent = new Date().getFullYear();
    }
  })();
});
