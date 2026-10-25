/**
 * CHEMSOLV ASSOCIATES - GLOBAL JAVASCRIPT
 * Header scroll, mobile drawer, animations & category tabs
 */

(function () {
  'use strict';

  // 1. Sticky Header scroll effect
  const header = document.querySelector('.site-header');
  if (header) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 15) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    }, { passive: true });
  }

  // 2. Mobile Drawer Navigation
  const mobileToggle = document.getElementById('mobile-toggle');
  const mobileDrawer = document.getElementById('mobile-drawer');
  const drawerOverlay = document.getElementById('mobile-drawer-overlay');
  const drawerClose = document.getElementById('mobile-drawer-close');

  if (mobileToggle && mobileDrawer && drawerOverlay) {
    function toggleDrawer(open) {
      const isOpen = open !== undefined ? open : !mobileDrawer.classList.contains('active');
      mobileToggle.classList.toggle('active', isOpen);
      mobileDrawer.classList.toggle('active', isOpen);
      drawerOverlay.classList.toggle('active', isOpen);
      document.body.style.overflow = isOpen ? 'hidden' : '';
      mobileToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    }

    mobileToggle.addEventListener('click', (e) => {
      e.preventDefault();
      toggleDrawer();
    });

    if (drawerClose) {
      drawerClose.addEventListener('click', (e) => {
        e.preventDefault();
        toggleDrawer(false);
      });
    }

    drawerOverlay.addEventListener('click', () => toggleDrawer(false));

    // Close when clicking mobile links
    mobileDrawer.querySelectorAll('.mobile-nav-link').forEach(link => {
      link.addEventListener('click', () => toggleDrawer(false));
    });

    // Close on desktop resize
    window.addEventListener('resize', () => {
      if (window.innerWidth > 768 && mobileDrawer.classList.contains('active')) {
        toggleDrawer(false);
      }
    });
  }

  // 3. Highlight Current Page in Navigation
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-link, .mobile-nav-link').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPath || (currentPath === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });

  // 4. Scroll Reveal Animations (Intersection Observer with immediate safety reveal)
  const fadeElements = document.querySelectorAll('.fade-in-up');
  if ('IntersectionObserver' in window && fadeElements.length > 0) {
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          obs.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.01,
      rootMargin: '120px 0px 50px 0px'
    });

    fadeElements.forEach(el => observer.observe(el));
  } else {
    fadeElements.forEach(el => el.classList.add('visible'));
  }

  // Safety fallback: ensure every element is guaranteed visible after 600ms
  setTimeout(() => {
    fadeElements.forEach(el => el.classList.add('visible'));
  }, 600);

  // 5. Products Category Nav Scroll Spy & Active State
  const categoryPills = document.querySelectorAll('.category-pill');
  if (categoryPills.length > 0) {
    const sections = Array.from(categoryPills).map(pill => {
      const targetId = pill.getAttribute('href').replace('#', '');
      return document.getElementById(targetId);
    }).filter(Boolean);

    if (sections.length > 0 && 'IntersectionObserver' in window) {
      const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const id = entry.target.id;
            categoryPills.forEach(pill => {
              if (pill.getAttribute('href') === `#${id}`) {
                pill.classList.add('active');
                // Center the active pill smoothly on mobile
                pill.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
              } else {
                pill.classList.remove('active');
              }
            });
          }
        });
      }, {
        threshold: 0.15,
        rootMargin: '-70px 0px -40% 0px'
      });

      sections.forEach(sec => sectionObserver.observe(sec));
    }
  }

  // 6. Direct Product Enquiry Helper
  window.enquireProduct = function (productName) {
    const message = `Hello Chemsolv Associates, I would like to enquire about ${productName}. Please share technical specifications and details.`;
    const waUrl = `https://wa.me/919876543210?text=${encodeURIComponent(message)}`;
    window.open(waUrl, '_blank', 'noopener,noreferrer');
  };
})();
