/**
 * HOTEL SHIVANSH - PREMIUM UI ENHANCEMENT ENGINE (V3)
 * Scroll-Reveal Animations, Command Palette Search, Header Shrink,
 * Smooth Section Navigation, Enhanced Micro-interactions
 */

(function () {
  'use strict';

  // =========================================================================
  // 1. SCROLL-REVEAL ANIMATIONS (IntersectionObserver)
  // =========================================================================
  function initScrollReveal() {
    // Add reveal classes to sections and key elements
    const sectionsToReveal = [
      '.mode-selector-section .mode-card',
      '.specials-section .special-card',
      '.menu-section .section-header',
      '.menu-section .menu-toolbar',
      '.inroom-section .inroom-card',
      '.reservation-section .reservation-info',
      '.reservation-section .reservation-card',
      '.rooms-section .room-card',
      '.hygiene-section .hygiene-item',
      '.reviews-section .review-card',
      '.contact-section .contact-card',
      '.contact-section .map-card',
      '.mode-selector-section .mode-selector-header',
      '.specials-section .section-header',
      '.inroom-section .section-header',
      '.rooms-section .section-header',
      '.reviews-section .section-header',
      '.contact-section .section-header'
    ];

    sectionsToReveal.forEach(selector => {
      document.querySelectorAll(selector).forEach((el, idx) => {
        if (!el.classList.contains('reveal-on-scroll')) {
          el.classList.add('reveal-on-scroll');
          el.style.transitionDelay = `${idx * 0.08}s`;
        }
      });
    });

    // Add left/right reveal variants
    document.querySelectorAll('.reservation-info').forEach(el => {
      el.classList.add('reveal-on-scroll', 'reveal-left');
    });
    document.querySelectorAll('.reservation-card, .map-card').forEach(el => {
      el.classList.add('reveal-on-scroll', 'reveal-right');
    });

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          // Don't unobserve to allow re-trigger on scroll (optional)
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -60px 0px'
    });

    document.querySelectorAll('.reveal-on-scroll').forEach(el => {
      observer.observe(el);
    });
  }

  // =========================================================================
  // 2. HEADER SHRINK ON SCROLL
  // =========================================================================
  function initHeaderShrink() {
    const header = document.getElementById('siteHeader');
    if (!header) return;

    let ticking = false;
    window.addEventListener('scroll', () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          if (window.scrollY > 80) {
            header.classList.add('scrolled');
          } else {
            header.classList.remove('scrolled');
          }
          ticking = false;
        });
        ticking = true;
      }
    });
  }

  // =========================================================================
  // 3. ACTIVE NAV LINK HIGHLIGHTING ON SCROLL
  // =========================================================================
  function initActiveNavHighlight() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link, .m-tab');

    if (!sections.length) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id');
          navLinks.forEach(link => {
            const href = link.getAttribute('href');
            if (href === `#${id}`) {
              link.classList.add('active');
            } else {
              link.classList.remove('active');
            }
          });
        }
      });
    }, {
      threshold: 0.3,
      rootMargin: '-80px 0px -50% 0px'
    });

    sections.forEach(sec => observer.observe(sec));
  }

  // =========================================================================
  // 4. COMMAND PALETTE SEARCH OVERLAY
  // =========================================================================
  function initSearchOverlay() {
    const overlay = document.getElementById('searchOverlay');
    const input = document.getElementById('searchOverlayInput');
    const resultsContainer = document.getElementById('searchQuickResults');
    const suggestionsContainer = document.getElementById('searchSuggestions');
    const triggerBtn = document.getElementById('searchTriggerBtn');

    if (!overlay || !input) return;

    // Open overlay
    function openSearch() {
      overlay.classList.add('open');
      setTimeout(() => input.focus(), 100);
      document.body.style.overflow = 'hidden';
    }

    // Close overlay
    function closeSearch() {
      overlay.classList.remove('open');
      input.value = '';
      if (resultsContainer) resultsContainer.innerHTML = '';
      if (suggestionsContainer) suggestionsContainer.style.display = 'flex';
      document.body.style.overflow = '';
    }

    // Trigger button
    if (triggerBtn) {
      triggerBtn.addEventListener('click', (e) => {
        e.preventDefault();
        openSearch();
      });
    }

    // Close on backdrop click
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) closeSearch();
    });

    // Keyboard shortcuts
    document.addEventListener('keydown', (e) => {
      // Ctrl/Cmd + K to open
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        if (overlay.classList.contains('open')) {
          closeSearch();
        } else {
          openSearch();
        }
      }
      // Escape to close
      if (e.key === 'Escape' && overlay.classList.contains('open')) {
        closeSearch();
      }
    });

    // Live search with debounce
    let searchDebounce;
    input.addEventListener('input', () => {
      clearTimeout(searchDebounce);
      searchDebounce = setTimeout(() => {
        const query = input.value.trim().toLowerCase();
        if (!query) {
          if (resultsContainer) resultsContainer.innerHTML = '';
          if (suggestionsContainer) suggestionsContainer.style.display = 'flex';
          return;
        }

        if (suggestionsContainer) suggestionsContainer.style.display = 'none';

        // Search from global allProducts
        if (typeof allProducts !== 'undefined' && allProducts.length) {
          const results = allProducts.filter(p =>
            p.name.toLowerCase().includes(query) ||
            p.description.toLowerCase().includes(query) ||
            (p.categoryName && p.categoryName.toLowerCase().includes(query))
          ).slice(0, 8);

          if (resultsContainer) {
            if (results.length === 0) {
              resultsContainer.innerHTML = `
                <div style="text-align:center; padding:30px; color:#9ca3af;">
                  <div style="font-size:2.5rem; margin-bottom:8px;">🍽️</div>
                  <p style="font-weight:700;">No dishes found for "${input.value}"</p>
                  <p style="font-size:0.82rem; opacity:0.7;">Try a different keyword</p>
                </div>
              `;
            } else {
              resultsContainer.innerHTML = results.map(p => `
                <div class="search-result-item" onclick="searchSelectDish('${p.id}')">
                  <img src="${p.image || 'assets/restaurant_thali.jpg'}" alt="${p.name}" onerror="this.src='assets/restaurant_thali.jpg'" />
                  <div class="result-info">
                    <div class="result-name">${highlightMatch(p.name, query)}</div>
                    <div class="result-cat">${p.categoryName || p.category}</div>
                  </div>
                  <div class="result-price">₹${p.price}</div>
                </div>
              `).join('');
            }
          }
        }
      }, 200);
    });

    // Helper: highlight matching text
    window.highlightMatch = function (text, query) {
      const idx = text.toLowerCase().indexOf(query);
      if (idx === -1) return text;
      return text.substring(0, idx) +
        '<mark style="background:rgba(223,193,123,0.3);color:#fff;padding:0 2px;border-radius:3px;">' +
        text.substring(idx, idx + query.length) + '</mark>' +
        text.substring(idx + query.length);
    };

    // Global: search from suggestion chip
    window.searchFromSuggestion = function (term) {
      input.value = term;
      input.dispatchEvent(new Event('input'));
    };

    // Global: select dish from search results
    window.searchSelectDish = function (dishId) {
      closeSearch();
      // Scroll to menu section
      const menuSection = document.getElementById('menu');
      if (menuSection) {
        menuSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
      // Open the dish modal after a small delay
      setTimeout(() => {
        if (typeof openDishModal === 'function') {
          openDishModal(dishId);
        }
      }, 500);
    };
  }

  // =========================================================================
  // 5. SMOOTH COUNTER ANIMATION FOR STATS
  // =========================================================================
  function initCounterAnimations() {
    const counters = document.querySelectorAll('.rating-number');
    counters.forEach(counter => {
      const target = parseFloat(counter.innerText);
      if (isNaN(target)) return;

      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            animateCounter(counter, 0, target, 1500);
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.5 });

      counter.innerText = '0';
      observer.observe(counter);
    });
  }

  function animateCounter(el, start, end, duration) {
    const startTime = performance.now();
    const isDecimal = end % 1 !== 0;

    function update(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = start + (end - start) * eased;

      el.innerText = isDecimal ? current.toFixed(1) : Math.round(current);

      if (progress < 1) {
        requestAnimationFrame(update);
      }
    }

    requestAnimationFrame(update);
  }

  // =========================================================================
  // 6. ENHANCED CARD TILT ON HOVER (3D PERSPECTIVE)
  // =========================================================================
  function initDishCardTilt() {
    document.addEventListener('mousemove', (e) => {
      const cards = document.querySelectorAll('.dish-card:hover, .special-card:hover');
      cards.forEach(card => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = ((y - centerY) / centerY) * -4;
        const rotateY = ((x - centerX) / centerX) * 4;

        card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
      });
    });

    document.addEventListener('mouseleave', (e) => {
      if (e.target.classList && (e.target.classList.contains('dish-card') || e.target.classList.contains('special-card'))) {
        e.target.style.transform = '';
      }
    }, true);

    // Reset on mouse leave from card area
    document.querySelectorAll('.dishes-grid, .specials-grid').forEach(grid => {
      grid.addEventListener('mouseleave', () => {
        grid.querySelectorAll('.dish-card, .special-card').forEach(card => {
          card.style.transform = '';
        });
      });
    });
  }

  // =========================================================================
  // 7. SMOOTH SCROLL FOR NAV LINKS WITH OFFSET
  // =========================================================================
  function initSmoothScrollNav() {
    document.querySelectorAll('a[href^="#"]').forEach(link => {
      link.addEventListener('click', (e) => {
        const targetId = link.getAttribute('href');
        if (!targetId || targetId === '#') return;
        const target = document.querySelector(targetId);
        if (!target) return;

        e.preventDefault();
        const headerHeight = document.getElementById('siteHeader')?.offsetHeight || 70;
        const targetPos = target.getBoundingClientRect().top + window.pageYOffset - headerHeight - 10;

        window.scrollTo({
          top: targetPos,
          behavior: 'smooth'
        });
      });
    });
  }

  // =========================================================================
  // 8. PARALLAX EFFECT ON HERO SECTION
  // =========================================================================
  function initHeroParallax() {
    const hero = document.querySelector('.hero-section');
    if (!hero) return;

    let ticking = false;
    window.addEventListener('scroll', () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const scrolled = window.pageYOffset;
          if (scrolled < window.innerHeight) {
            const orbs = hero.querySelectorAll('.ambient-glow-orb');
            orbs.forEach((orb, i) => {
              const speed = i === 0 ? 0.3 : 0.2;
              orb.style.transform = `translateY(${scrolled * speed}px)`;
            });

            const textCol = hero.querySelector('.hero-text-col');
            if (textCol) {
              textCol.style.transform = `translateY(${scrolled * 0.08}px)`;
              textCol.style.opacity = 1 - (scrolled / (window.innerHeight * 0.8));
            }
          }
          ticking = false;
        });
        ticking = true;
      }
    });
  }

  // =========================================================================
  // 9. TYPING ANIMATION FOR HERO SUBTITLE
  // =========================================================================
  function initHeroTypingEffect() {
    const pill = document.querySelector('.kitchen-status-pill span:last-child');
    if (!pill) return;

    const fullText = pill.innerText;
    pill.innerText = '';
    let charIdx = 0;

    function typeChar() {
      if (charIdx < fullText.length) {
        pill.innerText += fullText[charIdx];
        charIdx++;
        setTimeout(typeChar, 35 + Math.random() * 20);
      }
    }

    // Start after a small delay
    setTimeout(typeChar, 800);
  }

  // =========================================================================
  // 10. AUTO-HIDE ANNOUNCEMENT BAR ON SCROLL DOWN, SHOW ON SCROLL UP
  // =========================================================================
  function initAutoHideNoticeBar() {
    const bar = document.querySelector('.top-notice-bar');
    if (!bar) return;

    let lastScroll = 0;
    let ticking = false;

    window.addEventListener('scroll', () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const currentScroll = window.pageYOffset;
          if (currentScroll > 200 && currentScroll > lastScroll) {
            bar.style.transform = 'translateY(-100%)';
            bar.style.transition = 'transform 0.35s ease';
          } else {
            bar.style.transform = 'translateY(0)';
          }
          lastScroll = currentScroll;
          ticking = false;
        });
        ticking = true;
      }
    });
  }

  // =========================================================================
  // 11. RIPPLE EFFECT ON BUTTONS
  // =========================================================================
  function initRippleEffect() {
    document.addEventListener('click', (e) => {
      const btn = e.target.closest('.btn, .btn-add, .btn-add-plate, .category-pill, .filter-tag, .mode-card');
      if (!btn) return;

      const ripple = document.createElement('span');
      const rect = btn.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      const x = e.clientX - rect.left - size / 2;
      const y = e.clientY - rect.top - size / 2;

      ripple.style.cssText = `
        position: absolute;
        border-radius: 50%;
        width: ${size}px;
        height: ${size}px;
        left: ${x}px;
        top: ${y}px;
        background: rgba(255, 255, 255, 0.25);
        transform: scale(0);
        animation: rippleExpand 0.5s ease-out;
        pointer-events: none;
        z-index: 10;
      `;

      btn.style.position = 'relative';
      btn.style.overflow = 'hidden';
      btn.appendChild(ripple);

      setTimeout(() => ripple.remove(), 600);
    });

    // Add ripple animation keyframes if not exists
    if (!document.getElementById('ripple-keyframes')) {
      const style = document.createElement('style');
      style.id = 'ripple-keyframes';
      style.textContent = `
        @keyframes rippleExpand {
          to { transform: scale(4); opacity: 0; }
        }
      `;
      document.head.appendChild(style);
    }
  }

  // =========================================================================
  // INIT ALL PREMIUM FEATURES
  // =========================================================================
  function initPremiumUI() {
    initScrollReveal();
    initHeaderShrink();
    initActiveNavHighlight();
    initSearchOverlay();
    initCounterAnimations();
    initSmoothScrollNav();
    initHeroParallax();
    initHeroTypingEffect();
    initAutoHideNoticeBar();
    initRippleEffect();

    // Only enable 3D tilt on non-touch devices
    if (!('ontouchstart' in window)) {
      initDishCardTilt();
    }

    console.log('🏨 Hotel Shivansh Premium UI V3 Loaded');
  }

  // Run after DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initPremiumUI);
  } else {
    initPremiumUI();
  }

})();
