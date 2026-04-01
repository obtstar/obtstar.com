/**
 * ObtStar 全局动效脚本
 * 包含：3D卡片悬停、滚动视差、卡片光晕跟踪、平滑导航等
 */
(function () {

  // ── 3D 卡片悬停倾斜效果 ─────────────────────────
  function init3DCards() {
    const cards = document.querySelectorAll('.report-card, .value-card, .stat-card');
    cards.forEach(card => {
      card.addEventListener('mousemove', e => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const cx = rect.width / 2;
        const cy = rect.height / 2;
        const rx = (y - cy) / cy * -8; // 倾斜幅度
        const ry = (x - cx) / cx * 8;

        card.style.transform = `perspective(800px) rotateX(${rx}deg) rotateY(${ry}deg) translateY(-6px) scale(1.01)`;
        card.style.transition = 'transform 0.1s ease-out, box-shadow 0.1s ease-out';

        // 光晕跟随
        card.style.setProperty('--mouse-x', `${x}px`);
        card.style.setProperty('--mouse-y', `${y}px`);
      });

      card.addEventListener('mouseleave', () => {
        card.style.transform = '';
        card.style.transition = 'transform 0.4s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.4s ease';
      });

      card.addEventListener('mouseenter', () => {
        card.style.transition = 'transform 0.1s ease-out, box-shadow 0.1s ease-out';
      });
    });
  }

  // ── 卡片光晕跟踪（CSS 变量方式）──────────────────
  function initCardGlow() {
    const style = document.createElement('style');
    style.textContent = `
      .report-card::after {
        content: '';
        position: absolute;
        inset: 0;
        border-radius: inherit;
        background: radial-gradient(
          220px circle at var(--mouse-x, 50%) var(--mouse-y, 50%),
          rgba(79,70,229,0.09),
          transparent 65%
        );
        opacity: 0;
        transition: opacity 0.3s ease;
        pointer-events: none;
      }
      .report-card:hover::after { opacity: 1; }
    `;
    document.head.appendChild(style);
  }

  // ── 滚动时导航栏自动收缩 ───────────────────────────
  function initNavScroll() {
    const navbar = document.getElementById('navbar');
    if (!navbar) return;
    window.addEventListener('scroll', () => {
      navbar.classList.toggle('scrolled', window.scrollY > 20);
    }, { passive: true });
  }

  // ── 按钮涟漪效果 ──────────────────────────────────
  function initRipple() {
    document.querySelectorAll('.btn').forEach(btn => {
      btn.addEventListener('click', function (e) {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const ripple = document.createElement('span');
        ripple.style.cssText = `
          position:absolute;
          left:${x}px;top:${y}px;
          width:0;height:0;
          border-radius:50%;
          background:rgba(255,255,255,0.35);
          transform:translate(-50%,-50%);
          animation:ripple-anim 0.55s ease-out forwards;
          pointer-events:none;
        `;
        if (!getComputedStyle(btn).position || getComputedStyle(btn).position === 'static') {
          btn.style.position = 'relative';
        }
        btn.style.overflow = 'hidden';
        btn.appendChild(ripple);
        setTimeout(() => ripple.remove(), 600);
      });
    });

    // 注入 ripple keyframes
    if (!document.getElementById('ripple-style')) {
      const s = document.createElement('style');
      s.id = 'ripple-style';
      s.textContent = `
        @keyframes ripple-anim {
          to { width: 300px; height: 300px; opacity: 0; }
        }
      `;
      document.head.appendChild(s);
    }
  }

  // ── 图片懒加载占位 ────────────────────────────────
  function initImgFallback() {
    document.querySelectorAll('img').forEach(img => {
      img.onerror = function () {
        this.src = 'https://placehold.co/400x240/EEF2FF/4F46E5?text=ObtStar';
      };
    });
  }

  // ── 平滑锚点滚动 ──────────────────────────────────
  function initSmoothHash() {
    document.querySelectorAll('a[href^="#"]').forEach(a => {
      a.addEventListener('click', e => {
        const target = document.querySelector(a.getAttribute('href'));
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });
    });
  }

  // ── 标签云交互色 ──────────────────────────────────
  function initTagHover() {
    document.querySelectorAll('.tag').forEach(tag => {
      tag.addEventListener('mouseenter', () => {
        tag.style.transform = 'scale(1.08) translateY(-1px)';
        tag.style.transition = 'transform 0.2s ease';
      });
      tag.addEventListener('mouseleave', () => {
        tag.style.transform = '';
      });
    });
  }

  // ── 过渡进场动画（页面加载）──────────────────────
  function initPageEntrance() {
    document.body.style.opacity = '0';
    document.body.style.transform = 'translateY(8px)';
    document.body.style.transition = 'opacity 0.45s ease, transform 0.45s ease';
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        document.body.style.opacity = '1';
        document.body.style.transform = 'translateY(0)';
      });
    });
  }

  // ── 数字计数动画（全局适用）──────────────────────
  function initCounters() {
    const counterEls = document.querySelectorAll('.stat-num[data-count]');
    if (!counterEls.length) return;
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        const target = parseInt(el.getAttribute('data-count'));
        const duration = 1600;
        const start = Date.now();
        const startVal = 0;
        const timer = setInterval(() => {
          const elapsed = Date.now() - start;
          const progress = Math.min(elapsed / duration, 1);
          // ease-out cubic
          const eased = 1 - Math.pow(1 - progress, 3);
          const current = Math.round(startVal + (target - startVal) * eased);
          el.textContent = current.toLocaleString();
          if (progress >= 1) { el.textContent = target.toLocaleString(); clearInterval(timer); }
        }, 16);
        observer.unobserve(el);
      });
    }, { threshold: 0.5 });
    counterEls.forEach(el => observer.observe(el));
  }

  // ── 卡片入场错位动画 ─────────────────────────────
  function initCardStagger() {
    const cards = document.querySelectorAll('.report-card:not([data-aos])');
    cards.forEach((card, i) => {
      card.style.opacity = '0';
      card.style.transform = 'translateY(24px)';
      card.style.transition = `opacity 0.5s ease ${i * 60}ms, transform 0.5s ease ${i * 60}ms`;
      const obs = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            obs.unobserve(entry.target);
          }
        });
      }, { threshold: 0.12 });
      obs.observe(card);
    });
  }

  // ── Mini progress bar 动画（首页 hero dashboard）──
  function initMiniProgress() {
    const fills = document.querySelectorAll('.mini-progress-fill');
    if (!fills.length) return;
    // 先设为 0，然后 animate
    fills.forEach(fill => {
      const targetW = fill.style.width;
      fill.style.width = '0%';
      setTimeout(() => {
        fill.style.width = targetW;
      }, 500);
    });
  }

  // ── 执行所有初始化 ───────────────────────────────
  function ready(fn) {
    if (document.readyState !== 'loading') fn();
    else document.addEventListener('DOMContentLoaded', fn);
  }

  ready(() => {
    initPageEntrance();
    initNavScroll();
    initImgFallback();
    initSmoothHash();
    initCardGlow();
    initMiniProgress();

    // DOM 稳定后再挂交互
    setTimeout(() => {
      init3DCards();
      initRipple();
      initTagHover();
      initCounters();
      initCardStagger();
    }, 100);
  });

})();
