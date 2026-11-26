'use strict';

(function () {
  const $$ = (selector, root = document) => Array.from(root.querySelectorAll(selector));
  const $ = (selector, root = document) => root.querySelector(selector);

  $$('[data-year]').forEach((node) => {
    node.textContent = String(new Date().getFullYear());
  });

  const header = $('[data-header]');
  if (header) {
    const onScroll = () => header.classList.toggle('is-scrolled', window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  const menuToggle = $('[data-menu-toggle]');
  const mobileMenu = $('[data-mobile-menu]');

  if (menuToggle && mobileMenu) {
    const setMenu = (open) => {
      menuToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      menuToggle.setAttribute('aria-label', open ? 'Закрыть меню' : 'Открыть меню');
      mobileMenu.hidden = !open;
      document.body.classList.toggle('no-scroll', open);
    };

    menuToggle.addEventListener('click', () => setMenu(mobileMenu.hidden));

    $$('a', mobileMenu).forEach((link) => {
      link.addEventListener('click', () => setMenu(false));
    });

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && !mobileMenu.hidden) {
        setMenu(false);
        menuToggle.focus();
      }
    });

    window.addEventListener('resize', () => {
      if (window.innerWidth > 900 && !mobileMenu.hidden) setMenu(false);
    });
  }

  const revealItems = $$('.reveal');
  if ('IntersectionObserver' in window && revealItems.length) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
    );
    revealItems.forEach((item) => observer.observe(item));
  } else {
    revealItems.forEach((item) => item.classList.add('is-visible'));
  }

  const projects = {
    testa: {
      title: 'Testa',
      github: 'https://github.com/bakkka/testa',
      slides: [
        {
          src: 'assets/img/testa-home.webp',
          alt: 'Главная страница Testa: крупный заголовок, фактуры плитки и кирпича',
          title: 'Первый экран',
          text: 'Крупная типографика, фактуры материала и путь к каталогу. Тон бренда тёплый и ремесленный.',
        },
        {
          src: 'assets/img/testa-catalog.webp',
          alt: 'Каталог Testa с фильтрами по категориям и карточками серий',
          title: 'Каталог: 11 серий',
          text: 'Плитка, кирпич и декор с форматами и ценой «от». Карточки листаются как образцы материала.',
        },
        {
          src: 'assets/img/testa-product.webp',
          alt: 'Карточка товара Testa с форматами, ценами и оттенками глазури',
          title: 'Размеры, цены и глазури',
          text: 'Таблица размеров и цен, палитра глазурей, характеристики и запрос образца или прайса.',
        },
        {
          src: 'assets/img/testa-admin.webp',
          alt: 'Админ-панель Testa со статистикой заявок и последними обращениями',
          title: 'Товары, заявки и SEO',
          text: 'Товары, SEO-поля, заявки и тексты сайта. Загрузка фото, статусы обращений и внутренние заметки.',
        },
        {
          src: 'assets/img/testa-mobile.webp',
          alt: 'Мобильная версия сайта Testa с крупным заголовком и кнопками',
          title: 'Мобильная версия',
          text: 'Адаптив до 360 px: каталог, формы и админка остаются удобными.',
        },
      ],
    },
    flowdesk: {
      title: 'Flowdesk',
      github: 'https://github.com/bakkka/flowdesk',
      slides: [
        {
          src: 'assets/img/flowdesk-landing.webp',
          alt: 'Лендинг Flowdesk с тёмным фоном, телефоном и описанием Telegram-бота',
          title: 'Лендинг',
          text: 'Лендинг показывает бота: подписки, платежи и рассылки в Telegram.',
        },
        {
          src: 'assets/img/flowdesk-dashboard.webp',
          alt: 'Дашборд Flowdesk с метриками, графиками выручки и тарифами',
          title: 'Дашборд',
          text: 'Выручка, MRR, конверсия и удержание на одном экране.',
        },
        {
          src: 'assets/img/flowdesk-users.webp',
          alt: 'Раздел пользователей Flowdesk с таблицей и фильтрами',
          title: 'Пользователи',
          text: 'Поиск, фильтры, тарифы и история платежей по каждому пользователю.',
        },
        {
          src: 'assets/img/flowdesk-plans.webp',
          alt: 'Раздел тарифов Flowdesk с карточками планов',
          title: 'Тарифы',
          text: 'Free, Pro и Business с ценами в Stars. Тарифы редактируются без деплоя.',
        },
        {
          src: 'assets/img/flowdesk-login.webp',
          alt: 'Страница входа в админку Flowdesk',
          title: 'Вход',
          text: 'Отдельный вход для администраторов, сессии и двуязычный интерфейс.',
        },
      ],
    },
    pulse: {
      title: 'Pulse',
      github: 'https://github.com/bakkka/pulse',
      slides: [
        {
          src: 'assets/img/pulse-overview.webp',
          alt: 'Overview в Pulse: MRR, активные клиенты, churn, NRR, выручка и план-микс',
          title: 'Обзор',
          text: 'MRR, активные клиенты, churn и NRR. Метрики считаются из счетов и событий, а не вбиваются руками.',
        },
        {
          src: 'assets/img/pulse-revenue.webp',
          alt: 'Раздел Revenue в Pulse с историей MRR и разложением движения выручки',
          title: 'Выручка',
          text: 'New, expansion, contraction и churn складываются в MRR. Каждый бар можно разложить до конкретных клиентов.',
        },
        {
          src: 'assets/img/pulse-retention.webp',
          alt: 'Когортная таблица Retention в Pulse с heatmap удержания по месяцам',
          title: 'Удержание',
          text: '12 месячных когорт в heatmap и взвешенная кривая удержания. Видно, какие месяцы удерживают пользователей.',
        },
        {
          src: 'assets/img/pulse-funnel.webp',
          alt: 'Воронка активации Pulse с конверсией по шагам и источниками',
          title: 'Воронка активации',
          text: 'Signup → activated → project → team → paid: конверсия шагов, drop-off и среднее время до оплаты.',
        },
        {
          src: 'assets/img/pulse-landing.webp',
          alt: 'Светлый лендинг Pulse с превью аналитического дашборда',
          title: 'Лендинг',
          text: 'Лендинг объясняет продукт и пускает в демо под тремя ролями: owner, admin и viewer.',
        },
      ],
    },
  };

  const dialog = $('#demo-dialog');
  const demoTitle = $('[data-demo-title]');
  const demoImage = $('[data-demo-image]');
  const demoSlideTitle = $('[data-demo-slide-title]');
  const demoSlideText = $('[data-demo-slide-text]');
  const demoCounter = $('[data-demo-counter]');
  const demoGithub = $('[data-demo-github]');
  const demoThumbs = $('[data-demo-thumbs]');
  const demoPrev = $('[data-demo-prev]');
  const demoNext = $('[data-demo-next]');
  const demoClose = $('[data-demo-close]');

  const demoState = { project: null, index: 0, trigger: null };

  function pad(value) {
    return String(value).padStart(2, '0');
  }

  function renderSlide() {
    if (!demoState.project) return;
    const slides = demoState.project.slides;
    const slide = slides[demoState.index];
    const total = slides.length;

    demoImage.src = slide.src;
    demoImage.alt = slide.alt;
    demoSlideTitle.textContent = slide.title;
    demoSlideText.textContent = slide.text;
    demoCounter.textContent = `${pad(demoState.index + 1)} / ${pad(total)}`;
    demoPrev.disabled = demoState.index === 0;
    demoNext.disabled = demoState.index === total - 1;

    $$('.demo-thumb', demoThumbs).forEach((thumb, index) => {
      const active = index === demoState.index;
      thumb.classList.toggle('is-active', active);
      thumb.setAttribute('aria-current', active ? 'true' : 'false');
    });
  }

  function buildThumbs() {
    demoThumbs.innerHTML = '';
    demoState.project.slides.forEach((slide, index) => {
      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'demo-thumb';
      button.setAttribute('aria-label', slide.title);
      const image = document.createElement('img');
      image.src = slide.src;
      image.alt = '';
      image.loading = 'lazy';
      button.appendChild(image);
      button.addEventListener('click', () => {
        demoState.index = index;
        renderSlide();
      });
      demoThumbs.appendChild(button);
    });
  }

  function openDemo(key, trigger) {
    const project = projects[key];
    if (!project || !dialog) return;

    demoState.project = project;
    demoState.index = 0;
    demoState.trigger = trigger || null;

    demoTitle.textContent = project.title;
    demoGithub.href = project.github;
    buildThumbs();
    renderSlide();

    if (typeof dialog.showModal === 'function') {
      if (!dialog.open) dialog.showModal();
      dialog.focus({ preventScroll: true });
    } else {
      dialog.setAttribute('open', '');
    }
    document.body.classList.add('no-scroll');
  }

  function closeDemo() {
    if (!dialog) return;
    if (typeof dialog.close === 'function') dialog.close();
    else dialog.removeAttribute('open');
  }

  $$('[data-project]').forEach((trigger) => {
    trigger.addEventListener('click', () => openDemo(trigger.dataset.project, trigger));
  });

  if (dialog) {
    demoClose.addEventListener('click', closeDemo);
    demoPrev.addEventListener('click', () => {
      if (demoState.index > 0) {
        demoState.index -= 1;
        renderSlide();
      }
    });
    demoNext.addEventListener('click', () => {
      if (demoState.project && demoState.index < demoState.project.slides.length - 1) {
        demoState.index += 1;
        renderSlide();
      }
    });

    dialog.addEventListener('click', (event) => {
      if (event.target === dialog) closeDemo();
    });

    dialog.addEventListener('close', () => {
      document.body.classList.remove('no-scroll');
      if (demoState.trigger) demoState.trigger.focus();
    });

    document.addEventListener('keydown', (event) => {
      if (!dialog.open) return;
      if (event.key === 'ArrowLeft') {
        event.preventDefault();
        demoPrev.click();
      }
      if (event.key === 'ArrowRight') {
        event.preventDefault();
        demoNext.click();
      }
    });
  }

  const toast = $('[data-toast]');

  function showToast(message) {
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add('is-visible');
    window.clearTimeout(showToast.timer);
    showToast.timer = window.setTimeout(() => {
      toast.classList.remove('is-visible');
    }, 2400);
  }

  async function copyText(value) {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(value);
      return true;
    }
    const area = document.createElement('textarea');
    area.value = value;
    area.setAttribute('readonly', '');
    area.style.position = 'fixed';
    area.style.opacity = '0';
    document.body.appendChild(area);
    area.select();
    const ok = document.execCommand('copy');
    area.remove();
    return ok;
  }

  $$('[data-copy]').forEach((button) => {
    button.addEventListener('click', async () => {
      const value = button.getAttribute('data-copy');
      const label = $('span', button);
      const original = label ? label.textContent : '';
      try {
        await copyText(value);
        if (label) label.textContent = 'Скопировано';
        showToast('E-mail скопирован');
      } catch (error) {
        if (label) label.textContent = 'Не вышло';
        showToast('Скопируйте e-mail: ' + value);
      }
      window.setTimeout(() => {
        if (label && label.textContent !== original) label.textContent = original;
      }, 2400);
    });
  });
})();
