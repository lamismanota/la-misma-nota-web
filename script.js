document.documentElement.classList.add("js");

const SITE_CONFIG = window.siteConfig || {
  brand: "Banda",
  contact: {
    whatsapp: "",
    phone: "",
    email: "",
    instagram: "#",
    instagramHandle: "",
    tiktok: "#",
    tiktokHandle: "",
    youtube: "#",
    youtubeHandle: "",
  },
  buttons: {
    floatingWhatsapp: {
      whatsappMessage: "Hola, quiero consultar disponibilidad y presupuesto para mi evento.",
    },
  },
};

const BAND_CONFIG = {
  whatsappNumber: SITE_CONFIG.contact?.whatsapp || "",
  defaultMessage:
    SITE_CONFIG.buttons?.floatingWhatsapp?.whatsappMessage ||
    `Hola ${SITE_CONFIG.brand}, quiero consultar disponibilidad y presupuesto para mi evento.`,
  storageKey: "la-misma-nota-leads",
};

const FORM_CONFIG = {
  eventQuoteName: SITE_CONFIG.forms?.eventQuoteName || "consulta-evento",
};

const LEAD_STATUS = {
  nuevo: "nuevo",
  contactado: "contactado",
  reservado: "reservado",
  perdido: "perdido",
};

const fallbackCurrencyFormatter = new Intl.NumberFormat("es-AR", {
  style: "currency",
  currency: "ARS",
  maximumFractionDigits: 0,
});

const getPricing = () => window.LaMismaNotaPricing;

const formatCurrency = (value) => {
  const pricing = getPricing();
  if (pricing && typeof pricing.formatCurrency === "function") {
    return pricing.formatCurrency(value);
  }

  return fallbackCurrencyFormatter.format(Number(value) || 0);
};

const buildWhatsAppLink = (message) => {
  const base = `https://wa.me/${BAND_CONFIG.whatsappNumber}`;
  return `${base}?text=${encodeURIComponent(message || BAND_CONFIG.defaultMessage)}`;
};

const setFormFieldValue = (form, fieldName, value) => {
  const field = form.elements.namedItem(fieldName);
  if (field instanceof HTMLInputElement || field instanceof HTMLTextAreaElement || field instanceof HTMLSelectElement) {
    field.value = value ?? "";
  }
};

const encodeFormData = (formData) => new URLSearchParams(Array.from(formData.entries())).toString();

const syncLeadToNetlify = (form) => {
  setFormFieldValue(form, "form-name", FORM_CONFIG.eventQuoteName);
  const payload = new FormData(form);
  payload.set("form-name", FORM_CONFIG.eventQuoteName);

  const body = encodeFormData(payload);

  if (navigator.sendBeacon) {
    const blob = new Blob([body], { type: "application/x-www-form-urlencoded" });
    const sent = navigator.sendBeacon("/", blob);
    if (sent) {
      return Promise.resolve(true);
    }
  }

  return fetch("/", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body,
    keepalive: true,
  }).catch(() => null);
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

  if ("label" in config) {
    element.textContent = config.label || "";
  }

  if (config.href) {
    element.setAttribute("href", config.href);
  }

  if (config.whatsappMessage) {
    element.dataset.whatsappMessage = config.whatsappMessage;
    element.dataset.whatsappLink = "";
  }

  if (config.ariaLabel) {
    element.setAttribute("aria-label", config.ariaLabel);
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

const renderHeroStats = () => {
  const container = document.querySelector("#hero-stat-row");
  if (!container) return;

  container.innerHTML = "";
  (SITE_CONFIG.hero?.stats || []).forEach((item) => {
    const article = document.createElement("article");
    article.className = "stat-card";

    const value = document.createElement("strong");
    value.textContent = item.value;

    const text = document.createElement("span");
    text.textContent = item.text;

    article.append(value, text);
    container.append(article);
  });
};

const renderPosterStageMeta = () => {
  const container = document.querySelector("#poster-stage-meta");
  if (!container) return;

  container.innerHTML = "";
  (SITE_CONFIG.hero?.posterStageMeta || []).forEach((item) => {
    const article = document.createElement("article");
    article.className = "poster-stat";

    const label = document.createElement("span");
    label.className = "poster-label";
    label.textContent = item.label;

    const value = document.createElement("strong");
    value.textContent = item.value;

    article.append(label, value);
    container.append(article);
  });
};

const renderValueCards = () => {
  const container = document.querySelector("#value-grid");
  if (!container) return;

  container.innerHTML = "";
  (SITE_CONFIG.conversionSection?.cards || []).forEach((item) => {
    const article = document.createElement("article");
    article.className = "value-card";

    const index = document.createElement("span");
    index.className = "value-index";
    index.textContent = item.index;

    const title = document.createElement("h3");
    title.textContent = item.title;

    const text = document.createElement("p");
    text.textContent = item.text;

    article.append(index, title, text);
    container.append(article);
  });
};

const renderLocalSeo = () => {
  const grid = document.querySelector("#local-grid");
  const chips = document.querySelector("#local-chip-row");
  if (!grid || !chips) return;

  grid.innerHTML = "";
  (SITE_CONFIG.localSeoSection?.cards || []).forEach((item) => {
    const article = document.createElement("article");
    article.className = "local-card";

    const tag = document.createElement("span");
    tag.className = "local-card-tag";
    tag.textContent = item.tag;

    const title = document.createElement("h3");
    title.textContent = item.title;

    const text = document.createElement("p");
    text.textContent = item.text;

    article.append(tag, title, text);
    grid.append(article);
  });

  chips.innerHTML = "";
  (SITE_CONFIG.localSeoSection?.chips || []).forEach((item) => {
    const chip = document.createElement("span");
    chip.textContent = item;
    chips.append(chip);
  });
};

const renderFormats = () => {
  const container = document.querySelector("#formats-grid");
  if (!container) return;

  container.innerHTML = "";
  (SITE_CONFIG.formatsSection?.cards || []).forEach((item) => {
    const article = document.createElement("article");
    article.className = item.featured ? "format-card format-card--featured" : "format-card";

    const tag = document.createElement("span");
    tag.className = "format-pill";
    tag.textContent = item.tag;

    const title = document.createElement("h3");
    title.textContent = item.title;

    const description = document.createElement("p");
    description.textContent = item.description;

    const list = document.createElement("ul");
    list.className = "format-list";
    item.items.forEach((line) => {
      const li = document.createElement("li");
      li.textContent = line;
      list.append(li);
    });

    const cta = document.createElement("a");
    cta.className = "button button--full";
    cta.textContent = item.cta.label;
    cta.href = item.cta.href;
    cta.dataset.whatsappLink = "";
    cta.dataset.whatsappMessage = item.cta.whatsappMessage;

    article.append(tag, title, description, list, cta);
    container.append(article);
  });
};

const renderPackages = () => {
  const container = document.querySelector("#package-grid");
  if (!container) return;

  container.innerHTML = "";
  (SITE_CONFIG.packagesSection?.cards || []).forEach((item) => {
    const article = document.createElement("article");
    article.className = item.featured ? "package-card package-card--featured" : "package-card";

    const tag = document.createElement("span");
    tag.className = "package-tag";
    tag.textContent = item.tag;

    const title = document.createElement("h3");
    title.textContent = item.title;

    const description = document.createElement("p");
    description.textContent = item.description;

    const list = document.createElement("ul");
    list.className = "package-list";
    item.items.forEach((line) => {
      const li = document.createElement("li");
      li.textContent = line;
      list.append(li);
    });

    const footer = document.createElement("div");
    footer.className = "package-footer";

    const closing = document.createElement("strong");
    closing.textContent = item.closing;

    const cta = document.createElement("a");
    cta.className = "button button--full";
    cta.textContent = item.cta.label;
    cta.href = item.cta.href;
    cta.dataset.whatsappLink = "";
    cta.dataset.whatsappMessage = item.cta.whatsappMessage;

    footer.append(closing, cta);
    article.append(tag, title, description, list, footer);
    container.append(article);
  });

  setText("#packages-close-copy", SITE_CONFIG.packagesSection?.closeCopy);
  applyCta("#packages-close-button", SITE_CONFIG.packagesSection?.closeCta);
};

const buildVideoCard = (item, options = {}) => {
  const article = document.createElement("article");
  article.className = options.featured ? "video-card video-card--featured" : "video-card";

  const poster = document.createElement("div");
  poster.className = `video-poster ${item.posterClass}`;

  const tag = document.createElement("span");
  tag.className = "video-tag";
  tag.textContent = item.tag;

  const duration = document.createElement("span");
  duration.className = "video-duration";
  duration.textContent = item.duration;

  const play = document.createElement("a");
  play.className = "video-play";
  play.href = "#consulta";
  play.dataset.whatsappLink = "";
  play.dataset.whatsappMessage = item.playMessage;
  play.setAttribute("aria-label", item.playLabel);

  poster.append(tag, duration, play);

  const body = document.createElement("div");
  body.className = "video-body";

  const title = document.createElement("h3");
  title.textContent = item.title;

  const description = document.createElement("p");
  description.textContent = item.description;

  const meta = document.createElement("div");
  meta.className = "video-meta";
  item.meta.forEach((line) => {
    const span = document.createElement("span");
    span.textContent = line;
    meta.append(span);
  });

  body.append(title, description, meta);

  if (item.cta) {
    const cta = document.createElement("a");
    cta.className = "button video-link";
    cta.textContent = item.cta.label;
    cta.href = item.cta.href;
    cta.dataset.whatsappLink = "";
    cta.dataset.whatsappMessage = item.cta.whatsappMessage;
    body.append(cta);
  }

  article.append(poster, body);
  return article;
};

const renderVideos = () => {
  const container = document.querySelector("#video-layout");
  if (!container) return;

  container.innerHTML = "";

  if (SITE_CONFIG.videosSection?.featured) {
    container.append(buildVideoCard(SITE_CONFIG.videosSection.featured, { featured: true }));
  }

  const stack = document.createElement("div");
  stack.className = "video-stack";

  (SITE_CONFIG.videosSection?.stack || []).forEach((item) => {
    stack.append(buildVideoCard(item));
  });

  container.append(stack);
};

const renderProcess = () => {
  const container = document.querySelector("#process-grid");
  if (!container) return;

  container.innerHTML = "";
  (SITE_CONFIG.processSection?.steps || []).forEach((item) => {
    const article = document.createElement("article");
    article.className = "process-card";

    const step = document.createElement("span");
    step.className = "process-step";
    step.textContent = item.index;

    const title = document.createElement("h3");
    title.textContent = item.title;

    const text = document.createElement("p");
    text.textContent = item.text;

    article.append(step, title, text);
    container.append(article);
  });
};

const renderTestimonials = () => {
  const container = document.querySelector("#testimonial-grid");
  if (!container) return;

  container.innerHTML = "";
  (SITE_CONFIG.testimonialsSection?.items || []).forEach((item) => {
    const article = document.createElement("article");
    article.className = "testimonial-card";

    const stars = document.createElement("div");
    stars.className = "testimonial-stars";
    stars.setAttribute("aria-label", "5 de 5 estrellas");
    stars.textContent = "★★★★★";

    const quote = document.createElement("p");
    quote.textContent = item.quote;

    const author = document.createElement("strong");
    author.textContent = item.author;

    const context = document.createElement("span");
    context.textContent = item.context;

    article.append(stars, quote, author, context);
    container.append(article);
  });
};

const renderFaq = () => {
  const container = document.querySelector("#faq-list");
  if (!container) return;

  container.innerHTML = "";
  (SITE_CONFIG.faqSection?.items || []).forEach((item) => {
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

const renderContactPoints = () => {
  const container = document.querySelector("#contact-points");
  if (!container) return;

  container.innerHTML = "";

  (SITE_CONFIG.contactSection?.points || []).forEach((item) => {
    const article = document.createElement("article");
    const title = document.createElement("strong");
    const text = document.createElement("p");
    title.textContent = item.title;
    text.textContent = item.text;
    article.append(title, text);
    container.append(article);
  });

  const contact = SITE_CONFIG.contact || {};
  const article = document.createElement("article");
  const title = document.createElement("strong");
  title.textContent = SITE_CONFIG.contactSection?.alternateContactTitle || "Contacto";
  article.append(title);

  const makeLine = (labelText, href, value) => {
    const paragraph = document.createElement("p");
    paragraph.append(`${labelText}: `);
    const link = document.createElement("a");
    link.className = "inline-link";
    link.href = href;
    link.target = "_blank";
    link.rel = "noreferrer";
    link.textContent = value;
    paragraph.append(link);
    return paragraph;
  };

  article.append(makeLine("WhatsApp", `https://wa.me/${contact.whatsapp || ""}`, contact.phone || ""));

  const emailParagraph = document.createElement("p");
  emailParagraph.append("Email: ");
  const emailLink = document.createElement("a");
  emailLink.className = "inline-link";
  emailLink.href = `mailto:${contact.email || ""}`;
  emailLink.textContent = contact.email || "";
  emailParagraph.append(emailLink);
  article.append(emailParagraph);

  article.append(makeLine("Instagram", contact.instagram || "#", contact.instagramHandle || ""));
  article.append(makeLine("TikTok", contact.tiktok || "#", contact.tiktokHandle || ""));
  article.append(makeLine("YouTube", contact.youtube || "#", contact.youtubeHandle || ""));

  container.append(article);
};

const applyNavigation = () => {
  const links = document.querySelectorAll(".site-nav a");
  links.forEach((link, index) => {
    const item = SITE_CONFIG.navigation?.[index];
    if (!item) return;
    link.textContent = item.label;
    link.href = item.href;
  });
};

const applySiteContent = () => {
  document.querySelectorAll("[data-brand-name]").forEach((element) => {
    element.textContent = SITE_CONFIG.brand;
  });

  setText("#header-brand-tag", SITE_CONFIG.hero?.brandTag);
  setText("#footer-brand-tag", SITE_CONFIG.footer?.brandTag);

  applyCta("#floating-whatsapp-link", SITE_CONFIG.buttons?.floatingWhatsapp);
  setText("#floating-whatsapp-label", SITE_CONFIG.buttons?.floatingWhatsapp?.label);
  applyCta("#header-reserve-button", SITE_CONFIG.buttons?.headerReserve);
  applyCta("#footer-cta-button", SITE_CONFIG.buttons?.footerCta);

  applyNavigation();

  setText("#hero-eyebrow", SITE_CONFIG.hero?.eyebrow);
  setHtml("#hero-title", SITE_CONFIG.hero?.titleHtml);
  setHtml("#hero-lead", SITE_CONFIG.hero?.leadHtml);
  applyCta("#hero-primary-cta", SITE_CONFIG.hero?.primaryCta);
  applyCta("#hero-secondary-cta", SITE_CONFIG.hero?.secondaryCta);
  renderChips("#hero-booking-pulse", SITE_CONFIG.hero?.bookingBadges || []);
  renderChips("#hero-service-areas", SITE_CONFIG.hero?.serviceAreas || []);
  renderHeroStats();
  setText("#poster-topline", SITE_CONFIG.hero?.posterTopline);
  setText("#poster-logo-top", SITE_CONFIG.hero?.posterLogoTop);
  setText("#poster-logo-bottom", SITE_CONFIG.hero?.posterLogoBottom);
  renderPosterStageMeta();
  renderChips("#poster-mini-formats", SITE_CONFIG.hero?.miniFormats || []);
  setText("#hero-chip-left-label", SITE_CONFIG.hero?.chips?.[0]?.label);
  setText("#hero-chip-left-title", SITE_CONFIG.hero?.chips?.[0]?.title);
  setText("#hero-chip-right-label", SITE_CONFIG.hero?.chips?.[1]?.label);
  setText("#hero-chip-right-title", SITE_CONFIG.hero?.chips?.[1]?.title);

  setText("#conversion-eyebrow", SITE_CONFIG.conversionSection?.eyebrow);
  setText("#conversion-title", SITE_CONFIG.conversionSection?.title);
  setText("#conversion-lead", SITE_CONFIG.conversionSection?.lead);
  renderValueCards();

  setText("#local-seo-eyebrow", SITE_CONFIG.localSeoSection?.eyebrow);
  setText("#local-seo-title", SITE_CONFIG.localSeoSection?.title);
  setHtml("#local-seo-lead", SITE_CONFIG.localSeoSection?.leadHtml);
  renderLocalSeo();

  setText("#formats-eyebrow", SITE_CONFIG.formatsSection?.eyebrow);
  setText("#formats-title", SITE_CONFIG.formatsSection?.title);
  setText("#formats-lead", SITE_CONFIG.formatsSection?.lead);
  renderFormats();

  setText("#packages-eyebrow", SITE_CONFIG.packagesSection?.eyebrow);
  setText("#packages-title", SITE_CONFIG.packagesSection?.title);
  setText("#packages-lead", SITE_CONFIG.packagesSection?.lead);
  renderPackages();

  setText("#videos-eyebrow", SITE_CONFIG.videosSection?.eyebrow);
  setText("#videos-title", SITE_CONFIG.videosSection?.title);
  setText("#videos-lead", SITE_CONFIG.videosSection?.lead);
  renderVideos();

  setText("#process-eyebrow", SITE_CONFIG.processSection?.eyebrow);
  setText("#process-title", SITE_CONFIG.processSection?.title);
  setText("#process-lead", SITE_CONFIG.processSection?.lead);
  renderProcess();

  setText("#testimonials-eyebrow", SITE_CONFIG.testimonialsSection?.eyebrow);
  setText("#testimonials-title", SITE_CONFIG.testimonialsSection?.title);
  renderTestimonials();

  setText("#faq-eyebrow", SITE_CONFIG.faqSection?.eyebrow);
  setText("#faq-title", SITE_CONFIG.faqSection?.title);
  setText("#faq-lead", SITE_CONFIG.faqSection?.lead);
  renderFaq();

  setText("#contact-eyebrow", SITE_CONFIG.contactSection?.eyebrow);
  setText("#contact-title", SITE_CONFIG.contactSection?.title);
  setText("#contact-lead", SITE_CONFIG.contactSection?.lead);
  renderContactPoints();
  setText("#contact-checklist-title", SITE_CONFIG.contactSection?.checklistTitle);
  renderChips("#contact-checklist-row", SITE_CONFIG.contactSection?.checklistItems || []);
  setHtml("#contact-promo-note", SITE_CONFIG.contactSection?.promoNoteHtml);
  setText("#quote-submit-button", SITE_CONFIG.contactSection?.formActions?.submitLabel);
  setText("#load-example", SITE_CONFIG.contactSection?.formActions?.exampleLabel);
  setText("#form-status", SITE_CONFIG.contactSection?.formActions?.statusIdle);
  setText("#quote-badge-label", SITE_CONFIG.contactSection?.result?.badge);
  setText("#quote-summary", SITE_CONFIG.contactSection?.result?.emptyCopy);
  setText("#quote-subtotal-label", SITE_CONFIG.contactSection?.result?.subtotalLabel);
  setText("#quote-discount-label", SITE_CONFIG.contactSection?.result?.discountLabel);
  setText("#quote-deposit-label", SITE_CONFIG.contactSection?.result?.depositLabel);
  setText("#quote-balance-label", SITE_CONFIG.contactSection?.result?.balanceLabel);
  setText("#quote-whatsapp", SITE_CONFIG.contactSection?.result?.whatsappLabel);
  setText("#quote-result-note", SITE_CONFIG.contactSection?.result?.note);
  const quoteForm = document.querySelector("#quote-form");
  if (quoteForm) {
    quoteForm.setAttribute("name", FORM_CONFIG.eventQuoteName);
    setFormFieldValue(quoteForm, "form-name", FORM_CONFIG.eventQuoteName);
  }

  setText("#footer-description", SITE_CONFIG.footer?.description);
  setText("#footer-admin-link", SITE_CONFIG.footer?.adminLabel);
};

const readLeads = () => {
  try {
    const raw = window.localStorage.getItem(BAND_CONFIG.storageKey);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
};

const writeLeads = (leads) => {
  try {
    window.localStorage.setItem(BAND_CONFIG.storageKey, JSON.stringify(leads));
  } catch {
    return;
  }
};

const upsertLead = (lead) => {
  const leads = readLeads();
  const index = leads.findIndex((item) => item.id === lead.id);

  if (index >= 0) {
    leads[index] = { ...leads[index], ...lead };
  } else {
    leads.unshift(lead);
  }

  writeLeads(leads);
};

const createLeadId = () => {
  if (window.crypto && typeof window.crypto.randomUUID === "function") {
    return window.crypto.randomUUID();
  }

  return `lead-${Date.now()}-${Math.floor(Math.random() * 10000)}`;
};

const getAddonLabel = (group, key, fallback) => {
  const pricing = getPricing();
  const label = pricing?.config?.[group]?.[key]?.label;
  return label || fallback || key || "-";
};

const getTrasladoLabel = (lead) => {
  if (lead.traslado === "si" || lead.traslado === true) {
    return `Sí, cotizar traslado para ${lead.zona || "la zona elegida"}`;
  }

  return "No";
};

const buildLeadMessage = (lead, estimate) => {
  const breakdown = estimate || getPricing()?.buildQuoteBreakdown(lead);
  const lines = breakdown?.lines || [];
  const warnings = breakdown?.warnings || [];
  const discountText = breakdown?.discountTotal
    ? `- ${formatCurrency(breakdown.discountTotal)}`
    : formatCurrency(0);

  return [
    `Hola ${SITE_CONFIG.brand}, quiero avanzar con esta consulta.`,
    "",
    `Nombre: ${lead.nombre}`,
    `WhatsApp: ${lead.telefono}`,
    `Fecha estimada: ${lead.fecha}`,
    `Zona: ${lead.zona}`,
    `Tipo de evento: ${lead.evento}`,
    `Cantidad de personas: ${lead.personas}`,
    `Duración: ${lead.duracion} minutos`,
    `Cantidad de músicos: ${lead.musicos}`,
    `Sonido: ${getAddonLabel("soundAddons", lead.sonido, lead.sonido)}`,
    `Traslado: ${getTrasladoLabel(lead)}`,
    `Presupuesto estimado: ${formatCurrency(breakdown?.total || lead.presupuesto)}`,
    `Subtotal: ${formatCurrency(breakdown?.subtotal || lead.subtotal || 0)}`,
    `Descuento aplicado: ${discountText}`,
    `Seña requerida: ${formatCurrency(breakdown?.deposit || lead.seña || 0)}`,
    `Saldo pendiente: ${formatCurrency(breakdown?.balance || lead.saldo || 0)}`,
    "",
    "Desglose:",
    ...lines.map((line) => `- ${line.label}: ${formatCurrency(line.amount)}`),
    ...(warnings.length
      ? ["", "Valores pendientes de configurar:", ...warnings.map((warning) => `- ${warning}`)]
      : []),
    "",
    `Detalles: ${lead.mensaje || "Sin detalles extra por ahora."}`,
  ].join("\n");
};

const applyWhatsAppLinks = () => {
  const links = document.querySelectorAll("[data-whatsapp-link]");

  links.forEach((link) => {
    const message = link.dataset.whatsappMessage || BAND_CONFIG.defaultMessage;
    link.href = buildWhatsAppLink(message);
    link.target = "_blank";
    link.rel = "noreferrer";
  });
};

const readQuoteDraft = (formData) => ({
  nombre: String(formData.get("nombre") || "").trim(),
  telefono: String(formData.get("telefono") || "").trim(),
  personas: Number(formData.get("personas") || 0),
  fecha: String(formData.get("fecha") || "").trim(),
  zona: String(formData.get("zona") || "").trim(),
  evento: String(formData.get("evento") || "").trim(),
  duracion: Number(formData.get("duracion") || 0),
  musicos: Number(formData.get("musicos") || 0),
  sonido: String(formData.get("sonido") || "").trim(),
  luces: "sin_luces",
  traslado: formData.get("traslado") ? "si" : "no",
  karaoke: false,
  descuento_porcentaje: Number(formData.get("descuento_porcentaje") || 0),
  descuento_fijo: Number(formData.get("descuento_fijo") || 0),
  mensaje: String(formData.get("mensaje") || "").trim(),
});

const normalizeQuoteData = (rawInput) => {
  const pricing = getPricing();

  if (pricing && typeof pricing.normalizeQuoteInput === "function") {
    return pricing.normalizeQuoteInput(rawInput);
  }

  return rawInput;
};

const fillQuoteForm = (form, values) => {
  const fieldNameMap = {
    descuentoPorcentaje: "descuento_porcentaje",
    descuentoFijo: "descuento_fijo",
  };

  Object.entries(values).forEach(([key, value]) => {
    const field = form.elements.namedItem(fieldNameMap[key] || key);
    if (!field) return;

    if (field instanceof RadioNodeList) {
      Array.from(field).forEach((item) => {
        if (item instanceof HTMLInputElement && item.type === "checkbox") {
          item.checked = Boolean(value === true || value === "si" || value === "on");
        }
      });
      return;
    }

    if (field instanceof HTMLInputElement && field.type === "checkbox") {
      field.checked = Boolean(value === true || value === "si" || value === "on");
      return;
    }

    field.value = value ?? "";
  });
};

const validateQuoteDraft = (quote) => {
  const requiredFields = ["nombre", "telefono", "personas", "fecha", "zona", "evento", "duracion", "musicos", "sonido"];

  return requiredFields.find((field) => {
    const value = quote[field];
    return value === "" || value === 0 || value === null || Number.isNaN(value);
  });
};

const bindQuoteForm = () => {
  const pricing = getPricing();
  if (!pricing) return;

  const form = document.querySelector("#quote-form");
  const status = document.querySelector("#form-status");
  const result = document.querySelector("#quote-result");
  const resultTotal = document.querySelector("#quote-total");
  const resultSummary = document.querySelector("#quote-summary");
  const resultMeta = document.querySelector("#quote-meta");
  const resultBreakdown = document.querySelector("#quote-breakdown");
  const resultSubtotal = document.querySelector("#quote-subtotal");
  const resultDiscount = document.querySelector("#quote-discount");
  const resultDeposit = document.querySelector("#quote-deposit");
  const resultBalance = document.querySelector("#quote-balance");
  const resultNote = document.querySelector("#quote-result-note");
  const whatsappButton = document.querySelector("#quote-whatsapp");
  const exampleButton = document.querySelector("#load-example");

  if (
    !form ||
    !status ||
    !result ||
    !resultTotal ||
    !resultSummary ||
    !resultMeta ||
    !resultBreakdown ||
    !resultSubtotal ||
    !resultDiscount ||
    !resultDeposit ||
    !resultBalance ||
    !resultNote ||
    !whatsappButton
  ) {
    return;
  }

  let currentLeadId = null;
  let lastSyncedLeadId = null;

  const showStatus = (message, tone) => {
    status.textContent = message;
    status.classList.remove("is-error", "is-success", "is-warning");

    if (tone) {
      status.classList.add(`is-${tone}`);
    }
  };

  const dateInput = form.querySelector('input[name="fecha"]');
  if (dateInput) {
    const today = new Date();
    today.setMinutes(today.getMinutes() - today.getTimezoneOffset());
    dateInput.min = today.toISOString().split("T")[0];
  }

  const renderResult = (lead, estimate) => {
    result.hidden = false;
    resultTotal.textContent = formatCurrency(estimate.total);
    resultSummary.textContent = estimate.summary;
    resultMeta.innerHTML = "";
    resultBreakdown.innerHTML = "";
    resultSubtotal.textContent = formatCurrency(estimate.subtotal);
    resultDiscount.textContent = estimate.discountTotal
      ? `- ${formatCurrency(estimate.discountTotal)}`
      : formatCurrency(0);
    resultDeposit.textContent = formatCurrency(estimate.deposit);
    resultBalance.textContent = formatCurrency(estimate.balance);

    estimate.meta.forEach((item) => {
      if (!item) return;
      const span = document.createElement("span");
      span.textContent = item;
      resultMeta.append(span);
    });

    estimate.lines.forEach((item) => {
      const line = document.createElement("li");
      const label = document.createElement("span");
      const value = document.createElement("strong");

      if (item.kind === "discount" || item.amount < 0) {
        line.classList.add("is-discount");
      }

      if (item.configured === false) {
        line.classList.add("is-pending");
      }

      label.textContent = item.label;
      value.textContent = formatCurrency(item.amount);
      line.append(label, value);
      resultBreakdown.append(line);
    });

    if (estimate.warnings.length) {
      resultNote.textContent = `Atención: ${estimate.warnings.join(" ")}`;
      resultNote.classList.add("is-warning");
    } else {
      resultNote.textContent = SITE_CONFIG.contactSection?.result?.note || "";
      resultNote.classList.remove("is-warning");
    }

    const message = buildLeadMessage(lead, estimate);
    whatsappButton.href = buildWhatsAppLink(message);
    whatsappButton.target = "_blank";
    whatsappButton.rel = "noreferrer";

    setFormFieldValue(form, "estado_lead", lead.estado || LEAD_STATUS.nuevo);
    setFormFieldValue(form, "lead_id", lead.id || "");
    setFormFieldValue(form, "presupuesto_estimado", formatCurrency(estimate.total));
    setFormFieldValue(form, "subtotal_estimado", formatCurrency(estimate.subtotal));
    setFormFieldValue(
      form,
      "descuento_total",
      estimate.discountTotal ? `- ${formatCurrency(estimate.discountTotal)}` : formatCurrency(0),
    );
    setFormFieldValue(form, "sena_requerida", formatCurrency(estimate.deposit));
    setFormFieldValue(form, "saldo_pendiente", formatCurrency(estimate.balance));
    setFormFieldValue(
      form,
      "desglose_presupuesto",
      estimate.lines.map((item) => `${item.label}: ${formatCurrency(item.amount)}`).join(" | "),
    );
  };

  const buildLeadRecord = (quote, estimate, existingLead, persist) => {
    if (!persist) {
      return {
        ...quote,
        presupuesto: estimate.total,
        subtotal: estimate.subtotal,
        descuentoTotal: estimate.discountTotal,
        seña: estimate.deposit,
        saldo: estimate.balance,
      };
    }

    return {
      id: existingLead?.id || createLeadId(),
      createdAt: existingLead?.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      estado: existingLead?.estado || LEAD_STATUS.nuevo,
      origen: "cotizador",
      presupuesto: estimate.total,
      subtotal: estimate.subtotal,
      descuentoTotal: estimate.discountTotal,
      seña: estimate.deposit,
      saldo: estimate.balance,
      ...quote,
    };
  };

  const calculateQuote = ({ persist }) => {
    const draft = readQuoteDraft(new FormData(form));
    const missingField = validateQuoteDraft(draft);

    if (missingField) {
      showStatus(
        "Completá nombre, WhatsApp, personas, fecha, zona, evento, duración, músicos y extras para cotizar.",
        "error",
      );
      return false;
    }

    const quote = normalizeQuoteData(draft);
    const estimate = pricing.buildQuoteBreakdown(quote);
    const existingLead = persist && currentLeadId ? readLeads().find((lead) => lead.id === currentLeadId) : null;
    const lead = buildLeadRecord(quote, estimate, existingLead, persist);

    if (persist) {
      currentLeadId = lead.id;
      lastSyncedLeadId = null;
      upsertLead(lead);
      showStatus(
        estimate.warnings.length
          ? "Presupuesto listo y consulta guardada. Revisá los extras que siguen con valor pendiente."
          : "Presupuesto estimado listo. También guardé la consulta en el panel de leads.",
        estimate.warnings.length ? "warning" : "success",
      );
    } else {
      showStatus("Ejemplo cargado. Ajustá los datos si hace falta y enviá la consulta cuando quieras.", "success");
    }

    renderResult(lead, estimate);

    if (persist && currentLeadId && lastSyncedLeadId !== currentLeadId) {
      lastSyncedLeadId = currentLeadId;
      void syncLeadToNetlify(form);
    }

    return true;
  };

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    calculateQuote({ persist: true });
  });

  exampleButton?.addEventListener("click", () => {
    currentLeadId = null;
    lastSyncedLeadId = null;
    fillQuoteForm(form, pricing.exampleQuote || {});
    calculateQuote({ persist: false });
  });

  whatsappButton.addEventListener("click", () => {
    if (!currentLeadId) return;
    if (lastSyncedLeadId !== currentLeadId) {
      lastSyncedLeadId = currentLeadId;
      void syncLeadToNetlify(form);
    }
  });
};

const bindAccordion = () => {
  const items = document.querySelectorAll(".faq-item");
  if (!items.length) return;

  items.forEach((item) => {
    item.addEventListener("toggle", () => {
      if (!item.open) return;

      items.forEach((other) => {
        if (other !== item) {
          other.open = false;
        }
      });
    });
  });
};

const bindReveal = () => {
  const sections = document.querySelectorAll("[data-reveal]");
  if (!sections.length) return;

  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (prefersReducedMotion || !("IntersectionObserver" in window)) {
    sections.forEach((section) => section.classList.add("is-visible"));
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
    { threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
  );

  sections.forEach((section) => observer.observe(section));
};

const bindHeaderState = () => {
  const header = document.querySelector(".site-header");
  if (!header) return;

  let ticking = false;

  const toggleHeader = () => {
    header.classList.toggle("is-compact", window.scrollY > 18);
  };

  const onScroll = () => {
    if (ticking) return;

    ticking = true;
    window.requestAnimationFrame(() => {
      toggleHeader();
      ticking = false;
    });
  };

  toggleHeader();
  window.addEventListener("scroll", onScroll, { passive: true });
};

const bindNavigation = () => {
  const header = document.querySelector(".site-header");
  const toggle = document.querySelector(".nav-toggle");
  const navLinks = document.querySelectorAll(".site-nav a, .site-nav-shell .button");

  if (!header || !toggle) return;

  const closeNav = () => {
    header.classList.remove("is-open");
    toggle.setAttribute("aria-expanded", "false");
  };

  toggle.addEventListener("click", () => {
    const isOpen = header.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", String(isOpen));
  });

  navLinks.forEach((link) => {
    link.addEventListener("click", closeNav);
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 860) {
      closeNav();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeNav();
    }
  });
};

document.addEventListener("DOMContentLoaded", () => {
  applySiteContent();
  applyWhatsAppLinks();
  bindQuoteForm();
  bindAccordion();
  bindReveal();
  bindHeaderState();
  bindNavigation();
});
