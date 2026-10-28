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

  let lastToggleTimestamp = 0;
  function toggleMobileNav(e, forceState) {
    if (e && typeof e.preventDefault === 'function') {
      e.preventDefault();
      e.stopPropagation();
    }
    const now = Date.now();
    // Guard against instant double-firing (e.g. inline onclick + click event listener or touch/click pairs)
    if (now - lastToggleTimestamp < 350 && forceState === undefined) {
      return;
    }
    lastToggleTimestamp = now;

    const drawer = mobileDrawer || document.getElementById('mobile-drawer');
    const toggle = mobileToggle || document.getElementById('mobile-toggle');
    const overlay = drawerOverlay || document.getElementById('mobile-drawer-overlay');
    if (!drawer || !toggle || !overlay) return;

    const isOpen = typeof forceState === 'boolean' ? forceState : !drawer.classList.contains('active');
    toggle.classList.toggle('active', isOpen);
    drawer.classList.toggle('active', isOpen);
    overlay.classList.toggle('active', isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';
    toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
  }

  // Expose globally so inline onclick on <button> works immediately
  window.toggleMobileNav = toggleMobileNav;

  if (mobileToggle) {
    mobileToggle.addEventListener('click', (e) => toggleMobileNav(e));
  }

  if (drawerClose) {
    drawerClose.addEventListener('click', (e) => toggleMobileNav(e, false));
  }

  if (drawerOverlay) {
    drawerOverlay.addEventListener('click', (e) => toggleMobileNav(e, false));
  }

  // Close when clicking mobile nav links
  if (mobileDrawer) {
    mobileDrawer.querySelectorAll('.mobile-nav-link').forEach(link => {
      link.addEventListener('click', () => toggleMobileNav(null, false));
    });
  }

  // Close on Escape key press
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileDrawer && mobileDrawer.classList.contains('active')) {
      toggleMobileNav(null, false);
    }
  });

  // Close on desktop resize
  window.addEventListener('resize', () => {
    if (window.innerWidth > 992 && mobileDrawer && mobileDrawer.classList.contains('active')) {
      toggleMobileNav(null, false);
    }
  });

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

  // 5. Products Category Nav (Smooth Category Selection & Non-Intrusive ScrollSpy)
  const categoryNavWrapper = document.querySelector('.category-nav-wrapper');
  const categoryScroll = document.querySelector('.category-nav-scroll');
  const categoryPills = document.querySelectorAll('.category-pill');

  if (categoryPills.length > 0 && categoryScroll) {
    let isUserClicking = false;
    let clickTimeout = null;

    // Helper to center the active pill strictly inside the horizontal scroll container without moving the window
    function centerPillInNav(pill, smooth = true) {
      if (!pill || !categoryScroll) return;
      const scrollLeft = pill.offsetLeft - (categoryScroll.clientWidth / 2) + (pill.clientWidth / 2);
      categoryScroll.scrollTo({
        left: Math.max(0, scrollLeft),
        behavior: smooth ? 'smooth' : 'auto'
      });
    }

    // Helper to toggle active class and center the pill in navigation
    function setActivePill(targetHash, centerInNav = true, smoothNav = true) {
      categoryPills.forEach(p => {
        if (p.getAttribute('href') === targetHash) {
          p.classList.add('active');
          if (centerInNav) {
            centerPillInNav(p, smoothNav);
          }
        } else {
          p.classList.remove('active');
        }
      });
    }

    // Direct click handler for instant, reliable category selection
    categoryPills.forEach(pill => {
      pill.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = pill.getAttribute('href').replace('#', '');
        const targetSection = document.getElementById(targetId);
        if (!targetSection) return;

        // Set active immediately
        setActivePill(`#${targetId}`, true, true);

        // Calculate offset (site-header + category-nav-wrapper)
        const headerEl = document.querySelector('.site-header');
        const headerH = headerEl ? headerEl.offsetHeight : 70;
        const navH = categoryNavWrapper ? categoryNavWrapper.offsetHeight : 50;
        const totalOffset = headerH + navH + 12;

        const targetTop = targetSection.getBoundingClientRect().top + window.pageYOffset - totalOffset;

        // Temporarily pause scroll spy during programmatic smooth scroll
        isUserClicking = true;
        clearTimeout(clickTimeout);
        clickTimeout = setTimeout(() => {
          isUserClicking = false;
        }, 900);

        window.scrollTo({
          top: Math.max(0, targetTop),
          behavior: 'smooth'
        });

        // Update URL hash cleanly without default anchor jump
        if (window.history && window.history.pushState) {
          window.history.pushState(null, '', `#${targetId}`);
        } else {
          window.location.hash = `#${targetId}`;
        }
      });
    });

    // Handle initial hash on page load (e.g. landing from homepage category cards)
    if (window.location.hash) {
      const initialPill = Array.from(categoryPills).find(p => p.getAttribute('href') === window.location.hash);
      if (initialPill) {
        setTimeout(() => {
          initialPill.click();
        }, 200);
      }
    }

    // ScrollSpy: highlight active pill as user scrolls naturally
    const sections = Array.from(categoryPills).map(pill => {
      const id = pill.getAttribute('href').replace('#', '');
      return document.getElementById(id);
    }).filter(Boolean);

    if (sections.length > 0) {
      let scrollTimer = null;
      window.addEventListener('scroll', () => {
        if (isUserClicking) return; // Prevent interference during user click animation
        
        clearTimeout(scrollTimer);
        scrollTimer = setTimeout(() => {
          if (isUserClicking) return;
          const headerEl = document.querySelector('.site-header');
          const headerH = headerEl ? headerEl.offsetHeight : 70;
          const navH = categoryNavWrapper ? categoryNavWrapper.offsetHeight : 50;
          const triggerLine = window.pageYOffset + headerH + navH + 80;

          // Find current section in view
          let currentSection = sections[0];
          for (let i = 0; i < sections.length; i++) {
            const sec = sections[i];
            if (sec.offsetTop <= triggerLine) {
              currentSection = sec;
            } else {
              break;
            }
          }

          if (currentSection) {
            setActivePill(`#${currentSection.id}`, true, true);
          }
        }, 40);
      }, { passive: true });
    }
  }

  // 6. Direct Product Enquiry Helper
  window.enquireProduct = function (productName) {
    const message = `Hello Chemsolv Associates, I would like to enquire about ${productName}. Please share technical specifications and details.`;
    const waUrl = `https://wa.me/919876543210?text=${encodeURIComponent(message)}`;
    window.open(waUrl, '_blank', 'noopener,noreferrer');
  };
})();
