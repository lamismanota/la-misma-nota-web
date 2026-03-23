const SITE_CONFIG = window.siteConfig || {
  brand: "Banda",
  contact: {
    whatsapp: "",
  },
  admin: {
    pageTitle: "Panel de Consultas",
  },
};

const STORAGE_KEY = "la-misma-nota-leads";
const WHATSAPP_NUMBER = SITE_CONFIG.contact?.whatsapp || "";

const STATUS_OPTIONS = [
  { value: "nuevo", label: "Nuevo" },
  { value: "contactado", label: "Contactado" },
  { value: "reservado", label: "Reservado" },
  { value: "perdido", label: "Perdido" },
];

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

const readLeads = () => {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
};

const writeLeads = (leads) => {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(leads));
  } catch {
    return;
  }
};

const buildWhatsAppLink = (message) =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

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

const applyAdminContent = () => {
  document.title = SITE_CONFIG.admin?.pageTitle || `Panel de Consultas | ${SITE_CONFIG.brand}`;
  setText("#admin-brand-name", SITE_CONFIG.brand);
  setText("#admin-brand-subtitle", SITE_CONFIG.admin?.brandSubtitle);
  setText("#admin-header-button", SITE_CONFIG.admin?.headerButton);
  setText("#admin-hero-kicker", SITE_CONFIG.admin?.heroKicker);
  setText("#admin-hero-title", SITE_CONFIG.admin?.heroTitle);
  setText("#admin-hero-lead", SITE_CONFIG.admin?.heroLead);
  setText("#admin-filter-label", SITE_CONFIG.admin?.filterLabel);
  setText("#admin-empty-title", SITE_CONFIG.admin?.emptyTitle);
  setHtml("#admin-empty-text", SITE_CONFIG.admin?.emptyText);
  setText("#admin-scenarios-kicker", SITE_CONFIG.admin?.scenariosKicker);
  setText("#admin-scenarios-title", SITE_CONFIG.admin?.scenariosTitle);
  setText("#admin-scenarios-lead", SITE_CONFIG.admin?.scenariosLead);
};

const getStatusLabel = (value) =>
  STATUS_OPTIONS.find((option) => option.value === value)?.label || "Nuevo";

const getLeadEstimate = (lead) => {
  const pricing = getPricing();
  if (pricing && typeof pricing.buildQuoteBreakdown === "function") {
    return pricing.buildQuoteBreakdown(lead);
  }

  return {
    total: Number(lead.presupuesto) || 0,
    subtotal: Number(lead.subtotal) || 0,
    discountTotal: Number(lead.descuentoTotal) || 0,
    deposit: Number(lead.seña) || 0,
    balance: Number(lead.saldo) || 0,
    lines: [],
    warnings: [],
  };
};

const buildLeadMessage = (lead) => {
  const estimate = getLeadEstimate(lead);
  const discountText = estimate.discountTotal ? `- ${formatCurrency(estimate.discountTotal)}` : formatCurrency(0);

  return [
    `Hola ${SITE_CONFIG.brand}, retomo esta consulta desde el panel comercial.`,
    "",
    `Nombre: ${lead.nombre || "-"}`,
    `WhatsApp: ${lead.telefono || "-"}`,
    `Fecha estimada: ${lead.fecha || "-"}`,
    `Zona: ${lead.zona || lead.ciudad || "-"}`,
    `Tipo de evento: ${lead.evento || "-"}`,
    `Cantidad de personas: ${lead.personas || lead.invitados || "-"}`,
    `Duración: ${lead.duracion ? `${lead.duracion} minutos` : "-"}`,
    `Cantidad de músicos: ${lead.musicos || "-"}`,
    `Sonido: ${getAddonLabel("soundAddons", lead.sonido, lead.sonido)}`,
    `Traslado: ${getTrasladoLabel(lead)}`,
    `Presupuesto estimado: ${formatCurrency(estimate.total)}`,
    `Subtotal: ${formatCurrency(estimate.subtotal)}`,
    `Descuento aplicado: ${discountText}`,
    `Seña requerida: ${formatCurrency(estimate.deposit)}`,
    `Saldo pendiente: ${formatCurrency(estimate.balance)}`,
    `Estado: ${getStatusLabel(lead.estado)}`,
    "",
    "Desglose:",
    ...estimate.lines.map((line) => `- ${line.label}: ${formatCurrency(line.amount)}`),
    ...(estimate.warnings.length
      ? ["", "Valores pendientes de configurar:", ...estimate.warnings.map((warning) => `- ${warning}`)]
      : []),
    "",
    `Detalles: ${lead.mensaje || "Sin detalles extra."}`,
  ].join("\n");
};

const updateSummary = (leads) => {
  const total = leads.length;
  const newCount = leads.filter((lead) => lead.estado === "nuevo").length;
  const bookedCount = leads.filter((lead) => lead.estado === "reservado").length;
  const budget = leads.reduce((sum, lead) => sum + (Number(lead.presupuesto) || getLeadEstimate(lead).total), 0);

  document.querySelector("#summary-total").textContent = String(total);
  document.querySelector("#summary-new").textContent = String(newCount);
  document.querySelector("#summary-booked").textContent = String(bookedCount);
  document.querySelector("#summary-budget").textContent = formatCurrency(budget);
};

const createMetaDetail = (label, value) => {
  const wrapper = document.createElement("div");
  const dt = document.createElement("dt");
  const dd = document.createElement("dd");

  dt.textContent = label;
  dd.textContent = String(value);
  wrapper.append(dt, dd);
  return wrapper;
};

const renderLeadCard = (lead) => {
  const estimate = getLeadEstimate(lead);
  const article = document.createElement("article");
  article.className = "lead-card";

  const top = document.createElement("div");
  top.className = "lead-card-top";

  const identity = document.createElement("div");
  const title = document.createElement("h2");
  title.textContent = lead.nombre || "Consulta sin nombre";
  const phone = document.createElement("a");
  phone.className = "lead-phone";
  phone.href = lead.telefono ? `https://wa.me/${lead.telefono.replace(/\D/g, "")}` : "#";
  phone.target = "_blank";
  phone.rel = "noreferrer";
  phone.textContent = lead.telefono || "Sin teléfono";
  identity.append(title, phone);

  const statusWrap = document.createElement("label");
  statusWrap.className = "status-control";
  statusWrap.textContent = "Estado del lead";

  const select = document.createElement("select");
  select.className = "lead-status";
  select.dataset.id = lead.id;

  STATUS_OPTIONS.forEach((option) => {
    const item = document.createElement("option");
    item.value = option.value;
    item.textContent = option.label;
    item.selected = option.value === (lead.estado || "nuevo");
    select.append(item);
  });

  statusWrap.append(select);
  top.append(identity, statusWrap);

  const details = document.createElement("dl");
  details.className = "lead-meta";

  [
    { label: "Fecha", value: lead.fecha || "-" },
    { label: "Zona", value: lead.zona || lead.ciudad || "-" },
    { label: "Tipo de evento", value: lead.evento || "-" },
    { label: "Cantidad de personas", value: lead.personas || lead.invitados || "-" },
  ].forEach((item) => {
    details.append(createMetaDetail(item.label, item.value));
  });

  const actions = document.createElement("div");
  actions.className = "lead-actions";

  const budget = document.createElement("span");
  budget.className = "lead-budget";
  budget.textContent = `Estimado ${formatCurrency(estimate.total)}`;

  const whatsapp = document.createElement("a");
  whatsapp.className = "lead-whatsapp";
  whatsapp.href = buildWhatsAppLink(buildLeadMessage(lead));
  whatsapp.target = "_blank";
  whatsapp.rel = "noreferrer";
  whatsapp.textContent = "Abrir WhatsApp";

  actions.append(budget, whatsapp);
  article.append(top, details, actions);

  return article;
};

const renderLeads = () => {
  const filter = document.querySelector("#status-filter").value;
  const list = document.querySelector("#lead-list");
  const empty = document.querySelector("#empty-state");

  const leads = readLeads().sort((a, b) => {
    const left = new Date(b.updatedAt || b.createdAt || 0).getTime();
    const right = new Date(a.updatedAt || a.createdAt || 0).getTime();
    return left - right;
  });

  updateSummary(leads);
  list.innerHTML = "";

  const filtered = filter === "todos" ? leads : leads.filter((lead) => (lead.estado || "nuevo") === filter);

  if (!filtered.length) {
    empty.hidden = false;
    return;
  }

  empty.hidden = true;
  filtered.forEach((lead) => {
    list.append(renderLeadCard(lead));
  });
};

const renderScenarioCard = (scenario) => {
  const pricing = getPricing();
  if (!pricing) return null;

  const estimate = pricing.buildQuoteBreakdown(scenario.quote);
  const article = document.createElement("article");
  article.className = "scenario-card";

  const top = document.createElement("div");
  top.className = "scenario-card-top";

  const copy = document.createElement("div");
  const title = document.createElement("h3");
  title.textContent = scenario.title;
  const summary = document.createElement("p");
  summary.textContent = estimate.summary;
  copy.append(title, summary);

  const total = document.createElement("span");
  total.className = "scenario-total";
  total.textContent = formatCurrency(estimate.total);

  top.append(copy, total);

  const meta = document.createElement("div");
  meta.className = "scenario-meta";

  [
    estimate.quote.evento,
    estimate.quote.zona,
    `${estimate.quote.duracion} min`,
    `${estimate.quote.musicos} músicos`,
    `${estimate.quote.personas} personas`,
  ].forEach((item) => {
    const chip = document.createElement("span");
    chip.textContent = item;
    meta.append(chip);
  });

  const breakdown = document.createElement("ul");
  breakdown.className = "scenario-breakdown";

  estimate.lines.forEach((line) => {
    const item = document.createElement("li");
    const label = document.createElement("span");
    const value = document.createElement("strong");

    if (line.kind === "discount" || line.amount < 0) {
      item.classList.add("is-discount");
    }

    if (line.configured === false) {
      item.classList.add("is-pending");
    }

    label.textContent = line.label;
    value.textContent = formatCurrency(line.amount);
    item.append(label, value);
    breakdown.append(item);
  });

  const finance = document.createElement("div");
  finance.className = "scenario-finance";

  [
    { label: "Subtotal", value: formatCurrency(estimate.subtotal) },
    {
      label: "Descuento aplicado",
      value: estimate.discountTotal ? `- ${formatCurrency(estimate.discountTotal)}` : formatCurrency(0),
    },
    { label: "Seña requerida", value: formatCurrency(estimate.deposit) },
    { label: "Saldo pendiente", value: formatCurrency(estimate.balance) },
  ].forEach((item) => {
    const block = document.createElement("article");
    const label = document.createElement("span");
    const value = document.createElement("strong");
    label.textContent = item.label;
    value.textContent = item.value;
    block.append(label, value);
    finance.append(block);
  });

  article.append(top, meta, breakdown, finance);

  if (estimate.warnings.length) {
    const warning = document.createElement("p");
    warning.className = "scenario-warning";
    warning.textContent = `Pendiente: ${estimate.warnings.join(" ")}`;
    article.append(warning);
  }

  return article;
};

const renderScenarios = () => {
  const pricing = getPricing();
  const list = document.querySelector("#scenario-list");
  if (!pricing || !list) return;

  list.innerHTML = "";
  pricing.testCases.forEach((scenario) => {
    const card = renderScenarioCard(scenario);
    if (card) {
      list.append(card);
    }
  });
};

const bindStatusChanges = () => {
  document.addEventListener("change", (event) => {
    const target = event.target;

    if (!(target instanceof HTMLSelectElement)) return;
    if (!target.matches(".lead-status")) return;

    const leads = readLeads();
    const lead = leads.find((item) => item.id === target.dataset.id);
    if (!lead) return;

    lead.estado = target.value;
    lead.updatedAt = new Date().toISOString();
    writeLeads(leads);
    renderLeads();
  });
};

document.addEventListener("DOMContentLoaded", () => {
  applyAdminContent();

  const filter = document.querySelector("#status-filter");
  if (filter) {
    filter.addEventListener("change", renderLeads);
  }

  bindStatusChanges();
  renderLeads();
  renderScenarios();
});
