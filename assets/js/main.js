'use strict';

(function () {
  const $$ = (selector, root = document) => Array.from(root.querySelectorAll(selector));
  const $ = (selector, root = document) => root.querySelector(selector);

  const timeFormat = new Intl.DateTimeFormat('ru-RU', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
    timeZone: 'UTC',
  });

  function tickClock() {
    const value = timeFormat.format(new Date());
    $$('[data-clock]').forEach((node) => {
      node.textContent = value;
    });
  }

  tickClock();
  window.setInterval(tickClock, 20000);
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
          caption: 'Главная',
          title: 'Первый экран',
          text: 'Крупная типографика, фактуры материала и понятный путь к каталогу. Тон бренда — тёплый и ремесленный, без стоковых клише.',
        },
        {
          src: 'assets/img/testa-catalog.webp',
          alt: 'Каталог Testa с фильтрами по категориям и карточками серий',
          caption: 'Каталог',
          title: '11 серий, фильтры и цены',
          text: 'Плитка, кирпич и декор с форматами и ценой «от». Карточки листаются как образцы материала, а не как товары в корзине.',
        },
        {
          src: 'assets/img/testa-product.webp',
          alt: 'Карточка товара Testa с форматами, ценами и оттенками глазури',
          caption: 'Карточка',
          title: 'Материал в деталях',
          text: 'Таблица размеров и цен, палитра глазурей, характеристики и запрос образца или прайса в один клик.',
        },
        {
          src: 'assets/img/testa-admin.webp',
          alt: 'Админ-панель Testa со статистикой заявок и последними обращениями',
          caption: 'Админка',
          title: 'Управление без разработчика',
          text: 'Товары, SEO-поля, заявки и тексты сайта. Загрузка фото, статусы обращений и внутренние заметки — всё в одном месте.',
        },
        {
          src: 'assets/img/testa-mobile.webp',
          alt: 'Мобильная версия сайта Testa с крупным заголовком и кнопками',
          caption: 'Мобильная',
          title: 'Один материал — любой экран',
          text: 'Адаптив до 360 px: каталог, формы и админка остаются удобными, а типографика не теряет характер.',
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
          caption: 'Лендинг',
          title: 'Продукт с человеческим лицом',
          text: 'Лендинг объясняет ценность за десять секунд: подписки, платежи и рассылки в Telegram — под полным контролем.',
        },
        {
          src: 'assets/img/flowdesk-dashboard.webp',
          alt: 'Дашборд Flowdesk с метриками, графиками выручки и тарифами',
          caption: 'Дашборд',
          title: 'Метрики, которые читаются',
          text: 'Выручка, MRR, конверсия и удержание на одном экране. Графики не спорят с цифрами, а помогают принимать решения.',
        },
        {
          src: 'assets/img/flowdesk-users.webp',
          alt: 'Раздел пользователей Flowdesk с таблицей и фильтрами',
          caption: 'Пользователи',
          title: 'База и подписки',
          text: 'Поиск, фильтры, тарифы и история платежей. Администратор видит картину по каждому пользователю без переключения вкладок.',
        },
        {
          src: 'assets/img/flowdesk-plans.webp',
          alt: 'Раздел тарифов Flowdesk с карточками планов',
          caption: 'Тарифы',
          title: 'Тарифы и платежи',
          text: 'Free, Pro и Business с ценами в Stars. Тарифы редактируются без деплоя — продукт меняется вместе с бизнесом.',
        },
        {
          src: 'assets/img/flowdesk-login.webp',
          alt: 'Страница входа в админку Flowdesk',
          caption: 'Вход',
          title: 'Доступ и роли',
          text: 'Отдельный вход для администраторов, безопасные сессии и двуязычный интерфейс. Всё, что нужно для ежедневной работы.',
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
          caption: 'Overview',
          title: 'Вся картина за один экран',
          text: 'MRR, активные клиенты, churn и NRR. Метрики считаются из счетов и событий, а не вбиваются руками.',
        },
        {
          src: 'assets/img/pulse-revenue.webp',
          alt: 'Раздел Revenue в Pulse с историей MRR и разложением движения выручки',
          caption: 'Revenue',
          title: 'Выручка, которая сходится',
          text: 'New, expansion, contraction и churn складываются в честный MRR. Каждый бар можно разложить до конкретных клиентов.',
        },
        {
          src: 'assets/img/pulse-retention.webp',
          alt: 'Когортная таблица Retention в Pulse с heatmap удержания по месяцам',
          caption: 'Retention',
          title: 'Когорты, а не средние',
          text: '12 месячных когорт в heatmap и взвешенная кривая удержания. Видно, какие месяцы действительно удерживают пользователей.',
        },
        {
          src: 'assets/img/pulse-funnel.webp',
          alt: 'Воронка активации Pulse с конверсией по шагам и источниками',
          caption: 'Funnel',
          title: 'Воронка активации',
          text: 'Signup → activated → project → team → paid: конверсия шагов, drop-off и среднее время до оплаты.',
        },
        {
          src: 'assets/img/pulse-landing.webp',
          alt: 'Светлый лендинг Pulse с превью аналитического дашборда',
          caption: 'Landing',
          title: 'Кейс с живым демо',
          text: 'Лендинг объясняет продукт и пускает в демо под тремя ролями: owner, admin и viewer.',
        },
      ],
    },
  };

  const dialog = $('#demo-dialog');
  const demoTitle = $('[data-demo-title]');
  const demoImage = $('[data-demo-image]');
  const demoCaption = $('[data-demo-caption]');
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
    demoCaption.textContent = slide.caption;
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
      button.setAttribute('aria-label', `${slide.caption}: ${slide.title}`);
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

  const tiltCard = $('[data-tilt]');
  if (tiltCard && window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');

    tiltCard.addEventListener('pointermove', (event) => {
      if (reduced.matches) return;
      const rect = tiltCard.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - 0.5;
      const y = (event.clientY - rect.top) / rect.height - 0.5;
      tiltCard.style.transition = 'transform .12s linear';
      tiltCard.style.transform = `rotate(${-1.2 + x * 1.2}deg) rotateX(${-y * 2}deg) rotateY(${x * 2.4}deg)`;
    });

    tiltCard.addEventListener('pointerleave', () => {
      tiltCard.style.transition = '';
      tiltCard.style.transform = '';
    });
  }
})();
