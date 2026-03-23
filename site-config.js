// Edit this file to change contact data, social links, main texts and CTA copy.
// Pricing rules live in pricing.js.
const siteConfig = {
  brand: "La Misma Nota",
  contact: {
    whatsapp: "5491154752924",
    phone: "+54 9 11 5475-2924",
    email: "lamismanotaok@gmail.com",
    instagram: "https://instagram.com/lamismanota",
    instagramHandle: "@lamismanota",
    tiktok: "https://tiktok.com/@lamismanotaok",
    tiktokHandle: "@lamismanotaok",
    youtube: "https://youtube.com/lamismanotaok",
    youtubeHandle: "/lamismanotaok",
    city: "Buenos Aires, Argentina",
    addressLocality: "Buenos Aires",
    addressRegion: "Buenos Aires",
    addressCountry: "AR",
  },
  seo: {
    title: "Banda de Cumbia Para Eventos en Buenos Aires | La Misma Nota",
    description:
      "La Misma Nota es una banda de cumbia para eventos en Buenos Aires, CABA, GBA, La Plata y Argentina. Casamientos, cumpleaños, eventos privados y corporativos con show premium y reservas por WhatsApp.",
    ogTitle: "Banda de Cumbia Para Eventos en Buenos Aires | La Misma Nota",
    ogDescription:
      "Show de cumbia en vivo para casamientos, cumpleaños y eventos privados en Buenos Aires y Argentina, con reservas rápidas por WhatsApp.",
    twitterTitle: "Banda de Cumbia Para Eventos en Buenos Aires | La Misma Nota",
    twitterDescription:
      "Banda de cumbia para casamientos, cumpleaños y eventos en CABA, GBA, La Plata y Argentina.",
    musicGroupDescription:
      "Banda de cumbia para casamientos, cumpleaños, eventos privados y corporativos en Buenos Aires y Argentina, con show premium y reservas por WhatsApp.",
    genres: ["Cumbia", "Show en vivo para eventos"],
    areaServed: [
      { "@type": "City", name: "Ciudad Autónoma de Buenos Aires" },
      { "@type": "AdministrativeArea", name: "Gran Buenos Aires" },
      { "@type": "AdministrativeArea", name: "Provincia de Buenos Aires" },
      { "@type": "City", name: "La Plata" },
      { "@type": "Country", name: "Argentina" },
    ],
    offerCatalog: ["Cumpleaños", "Casamientos", "Eventos privados", "Formato reducido premium"],
  },
  navigation: [
    { label: "Inicio", href: "#inicio" },
    { label: "Formatos", href: "#formatos" },
    { label: "Paquetes", href: "#paquetes" },
    { label: "Videos", href: "#videos" },
    { label: "Testimonios", href: "#testimonios" },
    { label: "FAQ", href: "#faq" },
    { label: "Cotizador", href: "#consulta" },
  ],
  forms: {
    eventQuoteName: "consulta-evento",
  },
  buttons: {
    floatingWhatsapp: {
      label: "Reservar",
      href: "#consulta",
      whatsappMessage: "Hola La Misma Nota, quiero consultar disponibilidad y presupuesto para mi evento.",
      ariaLabel: "Consultar por WhatsApp",
    },
    headerReserve: {
      label: "Reservar fecha",
      href: "#consulta",
      whatsappMessage: "Hola La Misma Nota, quiero reservar una fecha.",
    },
    footerCta: {
      label: "Consultar ahora",
      href: "#consulta",
      whatsappMessage: "Hola La Misma Nota, quiero consultar una fecha disponible.",
    },
  },
  hero: {
    brandTag: "Cumbia premium en Buenos Aires",
    eyebrow: "Banda de cumbia para eventos en Buenos Aires, CABA, GBA y Argentina",
    titleHtml: 'Show de cumbia <span>premium</span> para eventos en Buenos Aires con pista encendida.',
    leadHtml:
      "La Misma Nota lleva cumbia en vivo a <strong>CABA, Zona Norte, Zona Oeste, Zona Sur, La Plata y Provincia de Buenos Aires</strong>, con una propuesta prolija, moderna y pensada para casamientos, cumpleaños, eventos privados y corporativos en Argentina.",
    primaryCta: {
      label: "Consultar fecha",
      href: "#consulta",
      whatsappMessage: "Hola La Misma Nota, quiero consultar disponibilidad para mi evento.",
    },
    secondaryCta: {
      label: "Ver videos",
      href: "#videos",
    },
    bookingBadges: ["Agenda 2026 abierta", "Buenos Aires y Argentina", "Formatos de 45 a 120 min"],
    serviceAreas: ["CABA", "Zona Norte", "Zona Oeste", "Zona Sur", "La Plata", "Provincia de Buenos Aires"],
    stats: [
      {
        value: "+180",
        text: "eventos sociales y corporativos en Buenos Aires y fechas puntuales en Argentina.",
      },
      {
        value: "3 formatos",
        text: "para resolver desde bodas premium en CABA hasta fiestas privadas en GBA.",
      },
      {
        value: "1 contacto",
        text: "para pedir propuesta, videos y disponibilidad por WhatsApp sin vueltas.",
      },
    ],
    posterTopline: "Banda de cumbia en vivo en Buenos Aires",
    posterLogoTop: "La Misma",
    posterLogoBottom: "Nota",
    posterStageMeta: [
      { label: "Lectura de pista", value: "Elegante al entrar, arriba al cerrar." },
      { label: "Reserva directa", value: "WhatsApp, videos y propuesta en el mismo flujo." },
    ],
    miniFormats: ["Casamientos", "Fiestas privadas", "Corporativos"],
    chips: [
      { label: "Entrada fina", title: "Imagen escénica prolija" },
      { label: "Reserva directa", title: "Presupuesto y fecha por WhatsApp" },
    ],
  },
  conversionSection: {
    eyebrow: "Pensada para convertir",
    title: "Una landing rápida, fuerte y clara para búsquedas locales en Buenos Aires y Argentina.",
    lead:
      "El diseño usa una paleta neón elegante inspirada en el logo, una jerarquía más agresiva en el hero y bloques orientados a objeciones reales: cobertura local, videos, prueba social, preguntas y contacto inmediato.",
    cards: [
      { index: "01", title: "Imagen premium", text: "El look transmite nivel sin caer en estética genérica ni saturada." },
      { index: "02", title: "Repertorio adaptable", text: "La propuesta se ajusta al tipo de evento, al público y al momento de la noche." },
      { index: "03", title: "Prueba social visible", text: "Los testimonios y videos aparecen antes del formulario para reforzar confianza." },
      { index: "04", title: "Reserva simple", text: "WhatsApp flotante, CTAs claros y formulario que ya arma el mensaje comercial." },
    ],
  },
  localSeoSection: {
    eyebrow: "Buenos Aires / Argentina",
    title:
      "Banda de cumbia para casamientos, cumpleaños y eventos privados en CABA, GBA, La Plata y Argentina.",
    leadHtml:
      'Si estás buscando una <strong>banda de cumbia para eventos en Buenos Aires</strong>, un show para casamiento en CABA o música en vivo para fiestas privadas en Zona Norte, esta landing responde esas búsquedas con oferta clara, prueba social y contacto directo.',
    cards: [
      {
        tag: "CABA",
        title: "Casamientos, cumpleaños y marcas en Ciudad de Buenos Aires.",
        text: "Ideal para salones, rooftops, hoteles, fiestas privadas y eventos corporativos con timing prolijo.",
      },
      {
        tag: "GBA",
        title: "Fechas frecuentes en Zona Norte, Zona Oeste, Zona Sur y quintas de Provincia.",
        text: "Formato adaptable para venues grandes, medianos o fiestas íntimas con repertorio bailable.",
      },
      {
        tag: "Argentina",
        title: "También coordinamos eventos en La Plata y otras ciudades del país.",
        text: "Se evalúa logística, formato y producción para mantener el nivel del show fuera de Buenos Aires.",
      },
    ],
    chips: [
      "Casamientos en Buenos Aires",
      "Cumpleaños en CABA",
      "Eventos privados en Zona Norte",
      "Shows corporativos en GBA",
      "Fechas en La Plata",
      "Eventos en Argentina",
    ],
  },
  formatsSection: {
    eyebrow: "Formatos",
    title: "Formatos para casamientos, fiestas privadas y eventos corporativos.",
    lead: "Elegí el formato que mejor encaja con tu evento y pedí propuesta por WhatsApp.",
    cards: [
      {
        featured: true,
        tag: "Casamientos",
        title: "Boda premium",
        description:
          "Ideal para bodas que necesitan una entrada elegante, una pista encendida y coordinación prolija con el salón o DJ.",
        items: [
          "Ideal para salones, quintas y estancias.",
          "Coordinación con DJ, planner o técnica del venue.",
          "Formato más pedido para eventos con impronta premium.",
        ],
        cta: {
          label: "Cotizar boda premium",
          href: "#consulta",
          whatsappMessage: "Hola La Misma Nota, quiero cotizar el formato Boda premium.",
        },
      },
      {
        featured: false,
        tag: "Fiestas privadas",
        title: "Noche arriba",
        description:
          "Un show pensado para cumpleaños, aniversarios y celebraciones donde la energía tiene que subir rápido y sostenerse toda la noche.",
        items: [
          "Setlist popular y coreable.",
          "Escala bien en espacios chicos o medianos.",
          "Perfecto para clientes que quieren resolver sin producir de más.",
        ],
        cta: {
          label: "Pedir propuesta",
          href: "#consulta",
          whatsappMessage: "Hola La Misma Nota, quiero cotizar el formato Noche arriba.",
        },
      },
      {
        featured: false,
        tag: "Corporativos",
        title: "Marca y after",
        description:
          "Formato adaptable para lanzamientos, after office y cierres de evento donde importan tanto la imagen como la lectura del público.",
        items: [
          "Timing preciso y operación ordenada.",
          "Versión full band o set boutique.",
          "Ideal para marcas, empresas y agencias.",
        ],
        cta: {
          label: "Consultar formato corporativo",
          href: "#consulta",
          whatsappMessage: "Hola La Misma Nota, quiero cotizar el formato corporativo.",
        },
      },
    ],
  },
  packagesSection: {
    eyebrow: "Paquetes",
    title: "Paquetes para resolver tu evento con una propuesta clara.",
    lead: "Cada opción está pensada para que sepas rápido cuál conviene según tu evento y tu presupuesto.",
    cards: [
      {
        featured: false,
        tag: "Cumpleaños",
        title: "Fiesta resuelta",
        description:
          "Un formato ágil para cumpleaños y aniversarios donde importa entrar rápido, sostener la energía y dejar a la gente bailando sin complicar la producción.",
        items: [
          "Set dinámico para enganchar desde el primer bloque.",
          "Ideal para salones, quintas, terrazas y eventos sociales.",
          "Perfecto para clientes que quieren decidir rápido y resolver bien.",
        ],
        closing: "Si ya tenés fecha, te pasamos propuesta y disponibilidad por WhatsApp.",
        cta: {
          label: "Cotizar cumpleaños",
          href: "#consulta",
          whatsappMessage: "Hola La Misma Nota, quiero cotizar el paquete Cumpleaños.",
        },
      },
      {
        featured: true,
        tag: "Casamientos",
        title: "Boda premium",
        description:
          "La opción más fuerte para parejas que buscan estética, impacto y una pista llena, con coordinación prolija y propuesta comercial clara desde el primer contacto.",
        items: [
          "Entrada elegante, bloque central arriba y cierre alto.",
          "Coordinación con planner, DJ y técnica del venue.",
          "El paquete más fácil de defender cuando el evento exige nivel.",
        ],
        closing: "Ideal para parejas que quieren seguridad, presencia y una pista bien arriba.",
        cta: {
          label: "Reservar casamiento",
          href: "#consulta",
          whatsappMessage: "Hola La Misma Nota, quiero cotizar el paquete Casamientos.",
        },
      },
      {
        featured: false,
        tag: "Eventos privados",
        title: "Social exclusivo",
        description:
          "Para celebraciones premium, reuniones especiales y eventos donde la banda tiene que leer el clima del lugar y levantarlo con precisión.",
        items: [
          "Formato adaptable al espacio, timing y perfil del público.",
          "Presencia escénica prolija y repertorio de alta rotación.",
          "Muy vendible para clientes exigentes que priorizan experiencia.",
        ],
        closing: "Una opción sólida para eventos donde cada detalle importa.",
        cta: {
          label: "Pedir propuesta privada",
          href: "#consulta",
          whatsappMessage: "Hola La Misma Nota, quiero cotizar el paquete Eventos privados.",
        },
      },
      {
        featured: false,
        tag: "Formato reducido premium",
        title: "Promo hasta 80 personas",
        description:
          "Una propuesta ágil para eventos chicos que necesitan música en vivo, presencia y cierre comercial simple, sin inflar el presupuesto.",
        items: [
          "Formato voz/teclado + percusión para espacios más íntimos.",
          "Sonido base incluido para resolver rápido sin sumar extras.",
          "Precio promo de AR$ 450.000 para eventos de hasta 80 personas.",
        ],
        closing: "Perfecta para eventos chicos que buscan música en vivo sin sumar estructura de más.",
        cta: {
          label: "Quiero la promo",
          href: "#consulta",
          whatsappMessage:
            "Hola La Misma Nota, quiero cotizar la promo de formato reducido hasta 80 personas.",
        },
      },
    ],
    closeCopy: "Si ya tenés fecha, zona o salón, escribinos y te pasamos una propuesta clara.",
    closeCta: {
      label: "Quiero cerrar una propuesta",
      href: "#consulta",
      whatsappMessage: "Hola La Misma Nota, ya vi los paquetes y quiero avanzar con una propuesta.",
    },
  },
  videosSection: {
    eyebrow: "Videos",
    title: "Mirá cómo suena y se vive La Misma Nota en eventos reales.",
    lead: "Reels de casamientos, fiestas privadas y eventos corporativos para que veas el clima del show.",
    featured: {
      posterClass: "video-poster--wedding",
      tag: "Casamientos",
      duration: "0:42",
      playLabel: "Pedir video de casamientos",
      playMessage: "Hola La Misma Nota, quiero ver el reel de casamientos.",
      title: "Entrada fina y pista explotando",
      description:
        "Una muestra de bodas y fiestas premium con entrada prolija, presencia escénica y pista encendida.",
      meta: ["Bodas", "Alta energía", "Estética premium"],
      cta: {
        label: "Recibir reel",
        href: "#consulta",
        whatsappMessage: "Hola La Misma Nota, quiero recibir el reel de casamientos.",
      },
    },
    stack: [
      {
        posterClass: "video-poster--private",
        tag: "Fiestas privadas",
        duration: "0:58",
        playLabel: "Pedir video de fiestas privadas",
        playMessage: "Hola La Misma Nota, quiero ver el reel de fiestas privadas.",
        title: "Clásicos coreables y cierre arriba",
        description: "Una muestra de cómo la banda levanta cumpleaños y eventos sociales.",
        meta: ["Coreable", "Setlist flexible"],
      },
      {
        posterClass: "video-poster--corporate",
        tag: "Corporativos",
        duration: "1:04",
        playLabel: "Pedir video corporativo",
        playMessage: "Hola La Misma Nota, quiero ver el reel corporativo.",
        title: "Formato adaptable para marcas",
        description: "Un ejemplo de timing preciso, estética cuidada y lectura de público mixto.",
        meta: ["After office", "Marca"],
      },
    ],
  },
  processSection: {
    eyebrow: "Reserva",
    title: "Cómo reservar",
    lead: "Mandanos fecha, lugar y tipo de evento. Te respondemos con disponibilidad, formato sugerido y presupuesto.",
    steps: [
      {
        index: "01",
        title: "Pasás fecha y lugar",
        text: "Con ciudad, tipo de evento y fecha estimada ya se puede orientar la propuesta.",
      },
      {
        index: "02",
        title: "Recibís formato sugerido",
        text: "La respuesta comercial apunta a decirte rápido qué formato encaja mejor.",
      },
      {
        index: "03",
        title: "Avanzás con la reserva",
        text: "Videos, detalles y siguiente paso de cierre en el mismo canal para no perder impulso.",
      },
    ],
  },
  testimonialsSection: {
    eyebrow: "Testimonios",
    title: "La confianza se gana antes del evento, pero se confirma cuando la pista responde en Buenos Aires.",
    items: [
      {
        quote:
          '"Entraron con una presencia increíble, respetaron el momento del casamiento y después levantaron todo. La gente no se quería ir de la pista."',
        author: "Lucía y Martín",
        context: "Casamiento en quinta · Zona Norte",
      },
      {
        quote:
          '"Queríamos algo prolijo, con estética y buen timing. La propuesta fue clara desde el primer mensaje y en vivo estuvieron impecables."',
        author: "Agustina R.",
        context: "Evento corporativo · Puerto Madero",
      },
      {
        quote:
          '"Lo mejor fue que entendieron el clima del cumpleaños y no necesitaron demasiada explicación. Sonaron bárbaro y la coordinación fue muy simple."',
        author: "Federico P.",
        context: "Fiesta privada · CABA",
      },
    ],
  },
  faqSection: {
    eyebrow: "Preguntas frecuentes",
    title: "Respuestas rápidas antes de reservar.",
    lead: "Lo más consultado antes de cerrar una fecha.",
    items: [
      {
        question: "¿Qué tipo de eventos cubre La Misma Nota en Buenos Aires y Argentina?",
        answer:
          "Casamientos, cumpleaños, fiestas privadas, eventos corporativos, marcas y fechas sociales en CABA, GBA, Provincia de Buenos Aires y otras ciudades de Argentina.",
      },
      {
        question: "¿El repertorio se adapta al evento?",
        answer:
          "Sí. Se ajusta la energía, los temas y el timing según el público, el momento y el objetivo.",
      },
      {
        question: "¿Trabajan con planners, DJ o técnica del salón?",
        answer: "Sí. La propuesta está pensada para integrarse sin fricción con otros proveedores.",
      },
      {
        question: "¿Cubren CABA, GBA, La Plata y otras ciudades de Argentina?",
        answer:
          "Sí. La Misma Nota trabaja en Ciudad de Buenos Aires, Zona Norte, Zona Oeste, Zona Sur, La Plata y coordina fechas en otras ciudades según logística y formato.",
      },
      {
        question: "¿Cuánto dura el show?",
        answer: "El show base dura 45 minutos y se puede extender en bloques de 15 minutos según el evento.",
      },
      {
        question: "¿Cómo pido presupuesto?",
        answer: "Con fecha, ciudad y tipo de evento alcanza para recibir una primera propuesta rápida.",
      },
    ],
  },
  contactSection: {
    eyebrow: "Cotizador",
    title: "Pedí tu presupuesto",
    lead:
      "Completá los datos del evento y recibí un valor estimado al instante. Después podés enviar la consulta por WhatsApp con todo listo.",
    points: [
      {
        title: "Presupuesto estimado",
        text: "Vas a ver un valor de referencia para tu evento en el momento.",
      },
      {
        title: "Consulta completa",
        text: "El mensaje sale con los datos del evento ya cargados para no perder tiempo.",
      },
      {
        title: "Respuesta rápida",
        text: "Con fecha, zona y tipo de evento podemos avanzar más rápido con la propuesta.",
      },
    ],
    alternateContactTitle: "Contacto alternativo",
    checklistTitle: "Qué impacta en el valor",
    checklistItems: ["Fecha", "Zona o venue", "Tipo de evento", "Duración", "Músicos", "Sonido y traslado"],
    promoNoteHtml:
      "Promo especial: <strong>voz/teclado + percusión por AR$ 450.000 con sonido base incluido</strong> para eventos de hasta 80 personas.",
    formActions: {
      submitLabel: "Calcular presupuesto",
      exampleLabel: "Cargar ejemplo",
      statusIdle: "El valor es estimado y sirve como primera referencia.",
    },
    result: {
      badge: "Presupuesto estimado",
      emptyCopy: "Completá el cotizador para ver el presupuesto estimado.",
      subtotalLabel: "Subtotal",
      discountLabel: "Descuento aplicado",
      depositLabel: "Seña requerida (30%)",
      balanceLabel: "Saldo pendiente",
      whatsappLabel: "Enviar consulta por WhatsApp",
      note: "Después de enviar la consulta por WhatsApp te respondemos con disponibilidad y propuesta.",
    },
  },
  footer: {
    brandTag: "Banda de cumbia premium para eventos en Buenos Aires y Argentina",
    description:
      "Show de cumbia en vivo para casamientos, cumpleaños, eventos privados y corporativos en Buenos Aires y Argentina.",
    adminLabel: "",
  },
  admin: {
    pageTitle: "Panel de Consultas | La Misma Nota",
    brandSubtitle: "Panel simple de consultas y seguimiento comercial",
    headerButton: "Ver landing",
    heroKicker: "Leads de eventos",
    heroTitle: "Consultas guardadas desde el cotizador",
    heroLead:
      "Este panel usa almacenamiento local del navegador. Sirve para seguimiento simple de leads, cambio de estado y acceso rápido a los datos de cada evento.",
    filterLabel: "Estado",
    emptyTitle: "No hay consultas guardadas",
    emptyText:
      "Cuando uses el cotizador de la landing, las consultas van a aparecer acá con estado inicial nuevo.",
    scenariosKicker: "Casos de prueba",
    scenariosTitle: "Escenarios de referencia con desglose final",
    scenariosLead:
      "Estos casos usan la misma fórmula del cotizador. Sirven para validar importes, seña, saldo pendiente y descuentos antes de seguir afinando valores.",
  },
};

if (typeof window !== "undefined") {
  window.siteConfig = siteConfig;
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = { siteConfig };
}
