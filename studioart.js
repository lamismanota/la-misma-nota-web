document.documentElement.classList.add("js");

const STUDIO_CONFIG = window.studioArtConfig || {
  brand: "TNG Music StudioART",
  homeHref: "#inicio",
  contact: {
    whatsapp: "",
  },
  navigation: [],
};

const buildWhatsAppLink = (message) => {
  const number = STUDIO_CONFIG.contact?.whatsapp || "";
  return `https://wa.me/${number}?text=${encodeURIComponent(message || "")}`;
};

const setText = (selector, value) => {
  const element = document.querySelector(selector);
  if (element) {
    element.textContent = value || "";
  }
};

const setHtml = (selector, value) => {
  const element = document.querySelector(selector);
  if (element) {
    element.innerHTML = value || "";
  }
};

const applyCta = (selector, config) => {
  const element = document.querySelector(selector);
  if (!element || !config) return;

  if (config.label) {
    element.textContent = config.label;
  }

  if (config.href) {
    element.setAttribute("href", config.href);
  }

  if (config.whatsappMessage) {
    element.dataset.whatsappLink = "";
    element.dataset.whatsappMessage = config.whatsappMessage;
  }
};

const renderChips = (selector, items) => {
  const container = document.querySelector(selector);
  if (!container) return;

  container.innerHTML = "";
  items.forEach((item) => {
    const chip = document.createElement("span");
    chip.textContent = item;
    container.append(chip);
  });
};

const renderSocialLinks = (selector, items, className) => {
  const container = document.querySelector(selector);
  if (!container) return;

  container.innerHTML = "";
  items.forEach((item) => {
    if (!item?.href) return;

    const link = document.createElement("a");
    link.className = className;
    link.href = item.href;
    link.target = "_blank";
    link.rel = "noreferrer";

    const platform = document.createElement("span");
    platform.className = `${className}__platform`;
    platform.textContent = item.platform || "Canal";

    const handle = document.createElement("strong");
    handle.className = `${className}__handle`;
    handle.textContent = item.handle || item.href;

    link.append(platform, handle);
    container.append(link);
  });
};

const renderNavigation = () => {
  const links = document.querySelectorAll(".studio-nav a");
  links.forEach((link, index) => {
    const item = STUDIO_CONFIG.navigation?.[index];
    if (!item) return;
    link.textContent = item.label;
    link.href = item.href;
  });
};

const renderSignalCards = () => {
  const container = document.querySelector("#hero-signal-stack");
  if (!container) return;

  container.innerHTML = "";
  (STUDIO_CONFIG.hero?.signalCards || []).forEach((item) => {
    const article = document.createElement("article");
    article.className = "signal-card";

    const label = document.createElement("span");
    label.className = "signal-label";
    label.textContent = item.label;

    const title = document.createElement("strong");
    title.textContent = item.title;

    const text = document.createElement("p");
    text.textContent = item.text;

    article.append(label, title, text);
    container.append(article);
  });
};

const renderPathCards = () => {
  const container = document.querySelector("#paths-grid");
  if (!container) return;

  container.innerHTML = "";
  (STUDIO_CONFIG.pathsSection?.cards || []).forEach((item) => {
    const article = document.createElement("article");
    article.className = "path-card";

    const tag = document.createElement("span");
    tag.className = "path-tag";
    tag.textContent = item.tag;

    const title = document.createElement("h3");
    title.textContent = item.title;

    const text = document.createElement("p");
    text.textContent = item.text;

    article.append(tag, title, text);
    container.append(article);
  });
};

const createPrice = (value, className = "card-price") => {
  const price = document.createElement("strong");
  price.className = className;
  price.textContent = value;
  return price;
};

const renderServices = () => {
  const container = document.querySelector("#services-grid");
  if (!container) return;

  container.innerHTML = "";
  (STUDIO_CONFIG.servicesSection?.items || []).forEach((item) => {
    const article = document.createElement("article");
    article.className = item.featured ? "service-card service-card--featured" : "service-card";

    const tag = document.createElement("span");
    tag.className = "service-tag";
    tag.textContent = item.tag;

    const title = document.createElement("h3");
    title.textContent = item.title;

    const description = document.createElement("p");
    description.textContent = item.description;

    const list = document.createElement("ul");
    list.className = "service-list";
    (item.bullets || []).forEach((line) => {
      const li = document.createElement("li");
      li.textContent = line;
      list.append(li);
    });

    const footer = document.createElement("div");
    footer.className = "card-footer";

    footer.append(createPrice(item.price));

    const cta = document.createElement("a");
    cta.className = "button button--secondary button--full";
    cta.textContent = item.cta?.label || "Consultar";
    cta.dataset.whatsappLink = "";
    cta.dataset.whatsappMessage = item.cta?.whatsappMessage || "";
    cta.href = "#contacto";

    footer.append(cta);
    article.append(tag, title, description, list, footer);
    container.append(article);
  });
};

const renderPackages = () => {
  const container = document.querySelector("#packages-grid");
  if (!container) return;

  container.innerHTML = "";
  (STUDIO_CONFIG.packagesSection?.items || []).forEach((item) => {
    const article = document.createElement("article");
    article.className = item.featured ? "package-card package-card--featured" : "package-card";

    const tier = document.createElement("span");
    tier.className = "package-tier";
    tier.textContent = item.tier;

    const title = document.createElement("h3");
    title.textContent = item.title;

    const songs = document.createElement("p");
    songs.className = "package-songs";
    songs.textContent = item.songs;

    const description = document.createElement("p");
    description.textContent = item.description;

    article.append(tier, title, songs, description);

    if (item.badge) {
      const badge = document.createElement("span");
      badge.className = "package-badge";
      badge.textContent = item.badge;
      article.append(badge);
    }

    const footer = document.createElement("div");
    footer.className = "card-footer";
    footer.append(createPrice(item.price, "card-price card-price--package"));

    const cta = document.createElement("a");
    cta.className = item.featured ? "button button--primary button--full" : "button button--secondary button--full";
    cta.textContent = item.cta?.label || "Consultar paquete";
    cta.dataset.whatsappLink = "";
    cta.dataset.whatsappMessage = item.cta?.whatsappMessage || "";
    cta.href = "#contacto";

    footer.append(cta);
    article.append(footer);
    container.append(article);
  });
};

const renderBrands = () => {
  const container = document.querySelector("#brands-grid");
  if (!container) return;

  container.innerHTML = "";
  (STUDIO_CONFIG.brandsSection?.items || []).forEach((item) => {
    const article = document.createElement("article");
    article.className = "brand-card";

    const title = document.createElement("h3");
    title.textContent = item.title;

    const text = document.createElement("p");
    text.textContent = item.text;

    article.append(title, text);
    container.append(article);
  });
};

const renderProcess = () => {
  const container = document.querySelector("#process-grid");
  if (!container) return;

  container.innerHTML = "";
  (STUDIO_CONFIG.processSection?.steps || []).forEach((item) => {
    const article = document.createElement("article");
    article.className = "process-card";

    const index = document.createElement("span");
    index.className = "process-index";
    index.textContent = item.index;

    const title = document.createElement("h3");
    title.textContent = item.title;

    const text = document.createElement("p");
    text.textContent = item.text;

    article.append(index, title, text);
    container.append(article);
  });
};

const renderHighlights = () => {
  const container = document.querySelector("#highlights-grid");
  if (!container) return;

  container.innerHTML = "";
  (STUDIO_CONFIG.highlightsSection?.cards || []).forEach((item) => {
    const article = document.createElement("article");
    article.className = "highlight-card";

    const title = document.createElement("h3");
    title.textContent = item.title;

    const text = document.createElement("p");
    text.textContent = item.text;

    article.append(title, text);
    container.append(article);
  });
};

const renderFaq = () => {
  const container = document.querySelector("#faq-list");
  if (!container) return;

  container.innerHTML = "";
  (STUDIO_CONFIG.faqSection?.items || []).forEach((item) => {
    const details = document.createElement("details");
    details.className = "faq-item";

    const summary = document.createElement("summary");
    summary.textContent = item.question;

    const answer = document.createElement("p");
    answer.textContent = item.answer;

    details.append(summary, answer);
    container.append(details);
  });
};

const applyContent = () => {
  document.querySelectorAll("[data-brand-name]").forEach((element) => {
    element.textContent = STUDIO_CONFIG.brand || "";
  });

  renderNavigation();

  setText("#header-tagline", STUDIO_CONFIG.tagline);
  setText("#hero-eyebrow", STUDIO_CONFIG.hero?.eyebrow);
  setHtml("#hero-title", STUDIO_CONFIG.hero?.titleHtml);
  setHtml("#hero-lead", STUDIO_CONFIG.hero?.leadHtml);
  renderChips("#hero-service-pills", STUDIO_CONFIG.hero?.servicePills || []);
  setText("#hero-sign-tag", STUDIO_CONFIG.hero?.signTag);
  setText("#hero-sign-subtitle", STUDIO_CONFIG.hero?.signSubtitle);
  renderSignalCards();

  const heroLogo = document.querySelector("#hero-logo");
  if (heroLogo && STUDIO_CONFIG.logo?.src) {
    heroLogo.src = STUDIO_CONFIG.logo.src;
    heroLogo.alt = STUDIO_CONFIG.logo.alt || STUDIO_CONFIG.brand;
  }

  applyCta("#header-home-link", STUDIO_CONFIG.buttons?.headerHome);
  applyCta("#header-cta", STUDIO_CONFIG.buttons?.headerCta);
  applyCta("#hero-primary-cta", STUDIO_CONFIG.buttons?.heroPrimary);
  applyCta("#hero-secondary-cta", STUDIO_CONFIG.buttons?.heroSecondary);

  setText("#paths-eyebrow", STUDIO_CONFIG.pathsSection?.eyebrow);
  setText("#paths-title", STUDIO_CONFIG.pathsSection?.title);
  setText("#paths-lead", STUDIO_CONFIG.pathsSection?.lead);
  renderPathCards();
  applyCta("#paths-primary-cta", STUDIO_CONFIG.buttons?.pathsPrimary);

  setText("#services-eyebrow", STUDIO_CONFIG.servicesSection?.eyebrow);
  setText("#services-title", STUDIO_CONFIG.servicesSection?.title);
  setText("#services-lead", STUDIO_CONFIG.servicesSection?.lead);
  setText("#services-note", STUDIO_CONFIG.servicesSection?.note);
  renderServices();

  setText("#packages-eyebrow", STUDIO_CONFIG.packagesSection?.eyebrow);
  setText("#packages-title", STUDIO_CONFIG.packagesSection?.title);
  setText("#packages-lead", STUDIO_CONFIG.packagesSection?.lead);
  setText("#packages-note", STUDIO_CONFIG.packagesSection?.note);
  renderPackages();

  setText("#brands-eyebrow", STUDIO_CONFIG.brandsSection?.eyebrow);
  setText("#brands-title", STUDIO_CONFIG.brandsSection?.title);
  setText("#brands-lead", STUDIO_CONFIG.brandsSection?.lead);
  renderBrands();
  setText("#brands-callout-title", STUDIO_CONFIG.brandsSection?.calloutTitle);
  setText("#brands-callout-text", STUDIO_CONFIG.brandsSection?.calloutText);
  applyCta("#brands-primary-cta", STUDIO_CONFIG.buttons?.brandsPrimary);

  setText("#process-eyebrow", STUDIO_CONFIG.processSection?.eyebrow);
  setText("#process-title", STUDIO_CONFIG.processSection?.title);
  setText("#process-lead", STUDIO_CONFIG.processSection?.lead);
  renderProcess();

  setText("#highlights-eyebrow", STUDIO_CONFIG.highlightsSection?.eyebrow);
  setText("#highlights-title", STUDIO_CONFIG.highlightsSection?.title);
  setText("#highlights-lead", STUDIO_CONFIG.highlightsSection?.lead);
  renderHighlights();

  setText("#faq-eyebrow", STUDIO_CONFIG.faqSection?.eyebrow);
  setText("#faq-title", STUDIO_CONFIG.faqSection?.title);
  setText("#faq-lead", STUDIO_CONFIG.faqSection?.lead);
  renderFaq();

  setText("#contact-eyebrow", STUDIO_CONFIG.contactSection?.eyebrow);
  setText("#contact-title", STUDIO_CONFIG.contactSection?.title);
  setText("#contact-lead", STUDIO_CONFIG.contactSection?.lead);
  setText("#contact-panel-title", STUDIO_CONFIG.contactSection?.panelTitle);
  setText("#contact-panel-text", STUDIO_CONFIG.contactSection?.panelText);
  renderChips("#contact-checklist", STUDIO_CONFIG.contactSection?.checklist || []);
  setText("#contact-socials-lead", STUDIO_CONFIG.contactSection?.socialsLead);
  renderSocialLinks("#contact-social-links", STUDIO_CONFIG.contact?.socials || [], "social-link");
  applyCta("#closing-primary-cta", STUDIO_CONFIG.buttons?.closingPrimary);
  applyCta("#closing-secondary-link", STUDIO_CONFIG.buttons?.closingSecondary);

  setText("#footer-copy", STUDIO_CONFIG.footer?.copy);
  setText("#footer-home-link", STUDIO_CONFIG.footer?.homeLabel);
  document.querySelector("#footer-home-link")?.setAttribute("href", STUDIO_CONFIG.homeHref || "#inicio");
  applyCta("#footer-whatsapp-link", STUDIO_CONFIG.buttons?.footerWhatsapp);
  renderSocialLinks("#footer-social-links", STUDIO_CONFIG.contact?.socials || [], "footer-social-link");
};

const applyWhatsAppLinks = () => {
  const links = document.querySelectorAll("[data-whatsapp-link]");
  links.forEach((link) => {
    link.href = buildWhatsAppLink(link.dataset.whatsappMessage || "");
    link.target = "_blank";
    link.rel = "noreferrer";
  });
};

const bindNavToggle = () => {
  const button = document.querySelector(".nav-toggle");
  const shell = document.querySelector("#studio-nav-shell");
  if (!button || !shell) return;

  const closeMenu = () => {
    shell.classList.remove("is-open");
    button.setAttribute("aria-expanded", "false");
  };

  button.addEventListener("click", () => {
    const nextOpen = !shell.classList.contains("is-open");
    shell.classList.toggle("is-open", nextOpen);
    button.setAttribute("aria-expanded", String(nextOpen));
  });

  shell.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      if (window.innerWidth <= 900) {
        closeMenu();
      }
    });
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 900) {
      closeMenu();
    }
  });
};

const bindHeaderState = () => {
  const header = document.querySelector(".studio-header");
  if (!header) return;

  const sync = () => {
    header.classList.toggle("is-compact", window.scrollY > 18);
  };

  sync();
  window.addEventListener("scroll", sync, { passive: true });
};

const bindReveals = () => {
  const items = document.querySelectorAll("[data-reveal]");
  if (!("IntersectionObserver" in window) || !items.length) {
    items.forEach((item) => item.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.16 },
  );

  items.forEach((item) => observer.observe(item));
};

document.addEventListener("DOMContentLoaded", () => {
  applyContent();
  applyWhatsAppLinks();
  bindNavToggle();
  bindHeaderState();
  bindReveals();
});
