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
      label: "WhatsApp",
      href: "#consulta",
      whatsappMessage: "Hola La Misma Nota, quiero consultar disponibilidad y presupuesto para mi evento.",
      ariaLabel: "Consultar por WhatsApp",
    },
    headerReserve: {
      label: "Pedir propuesta",
      href: "#consulta",
      whatsappMessage: "Hola La Misma Nota, quiero reservar una fecha.",
    },
    footerCta: {
      label: "Reservar fecha",
      href: "#consulta",
      whatsappMessage: "Hola La Misma Nota, quiero consultar una fecha disponible.",
    },
  },
  hero: {
    brandTag: "Cumbia premium para eventos",
    eyebrow: "Casamientos, cumpleaños y fiestas en Buenos Aires",
    titleHtml: 'La banda que deja <span>la pista arriba</span>',
    leadHtml:
      "Show de cumbia en vivo para casamientos, cumpleaños, eventos privados y corporativos en <strong>CABA, GBA, La Plata e interior</strong>. Pedí fecha, formato y presupuesto por WhatsApp.",
    primaryCta: {
      label: "Pedir propuesta",
      href: "#consulta",
      whatsappMessage: "Hola La Misma Nota, quiero consultar disponibilidad para mi evento.",
    },
    secondaryCta: {
      label: "Ver reels",
      href: "#videos",
    },
    bookingBadges: ["Agenda abierta", "45 a 120 min", "Respuesta rápida"],
    serviceAreas: ["CABA", "GBA", "La Plata", "Interior"],
    stats: [
      {
        value: "+180",
        text: "eventos realizados.",
      },
      {
        value: "3 formatos",
        text: "según tu evento.",
      },
      {
        value: "1 WhatsApp",
        text: "para cotizar y reservar.",
      },
    ],
    posterTopline: "Show en vivo para tu evento",
    posterLogoTop: "La Misma",
    posterLogoBottom: "Nota",
    posterStageMeta: [
      { label: "Entrada", value: "Presencia fina y timing prolijo." },
      { label: "Cierre", value: "Pista arriba y salida fuerte." },
    ],
    miniFormats: ["Casamientos", "Fiestas privadas", "Corporativos"],
    chips: [
      { label: "Imagen", title: "Presencia premium" },
      { label: "Respuesta", title: "Fecha y propuesta rápido" },
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
    title: "Elegí el formato ideal para tu evento.",
    lead: "Casamientos, fiestas privadas y corporativos con propuesta rápida por WhatsApp.",
    cards: [
      {
        featured: true,
        tag: "Casamientos",
        title: "Boda premium",
        description:
          "Entrada elegante, show arriba y coordinación prolija con salón, planner o DJ.",
        items: [
          "Salones, quintas y estancias.",
          "Coordinación con DJ o planner.",
          "Ideal para bodas premium.",
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
          "Cumpleaños y celebraciones donde la energía tiene que subir rápido y sostenerse toda la noche.",
        items: [
          "Setlist popular y coreable.",
          "Espacios chicos o medianos.",
          "Consulta rápida y sin vueltas.",
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
          "Para marcas y empresas que necesitan imagen prolija, timing y lectura de público.",
        items: [
          "After office, lanzamientos y cierres.",
          "Versión full band o set boutique.",
          "Operación ordenada.",
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
    title: "Paquetes listos para reservar.",
    lead: "Cuatro opciones claras para elegir rápido según tu evento y tu presupuesto.",
    cards: [
      {
        featured: false,
        tag: "Cumpleaños",
        title: "Fiesta resuelta",
        description:
          "Cumpleaños y aniversarios con entrada rápida en clima y pista activa.",
        items: [
          "Set dinámico desde el primer bloque.",
          "Salones, quintas, terrazas y eventos sociales.",
          "Ideal para resolver rápido.",
        ],
        closing: "Te pasamos propuesta y disponibilidad por WhatsApp.",
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
          "La opción más fuerte para bodas con imagen, coordinación y pista llena.",
        items: [
          "Entrada elegante, bloque central arriba y cierre alto.",
          "Coordinación con planner, DJ y técnica del venue.",
          "El paquete más fácil de defender cuando el evento exige nivel.",
        ],
        closing: "Para parejas que quieren seguridad y show.",
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
          "Para celebraciones y eventos donde la lectura del clima y la presencia hacen diferencia.",
        items: [
          "Formato adaptable al espacio, timing y perfil del público.",
          "Presencia escénica prolija y repertorio de alta rotación.",
          "Muy vendible para clientes exigentes que priorizan experiencia.",
        ],
        closing: "Ideal para eventos donde importa cada detalle.",
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
          "Formato reducido para eventos chicos, con música en vivo y sonido base incluido.",
        items: [
          "Formato voz/teclado + percusión para espacios más íntimos.",
          "Sonido base incluido para resolver rápido sin sumar extras.",
          "Precio promo de AR$ 450.000 para eventos de hasta 80 personas.",
        ],
        closing: "La opción más ágil para eventos de hasta 80 personas.",
        cta: {
          label: "Quiero la promo",
          href: "#consulta",
          whatsappMessage:
            "Hola La Misma Nota, quiero cotizar la promo de formato reducido hasta 80 personas.",
        },
      },
    ],
    closeCopy: "Si ya tenés fecha o zona, escribinos y te pasamos propuesta.",
    closeCta: {
      label: "Quiero mi propuesta",
      href: "#consulta",
      whatsappMessage: "Hola La Misma Nota, ya vi los paquetes y quiero avanzar con una propuesta.",
    },
  },
  videosSection: {
    eyebrow: "Videos",
    title: "Reels reales de casamientos, fiestas y corporativos.",
    lead: "Mirá el clima del show y pedí el material completo por WhatsApp.",
    featured: {
      posterClass: "video-poster--wedding",
      tag: "Casamientos",
      duration: "0:42",
      playLabel: "Pedir video de casamientos",
      playMessage: "Hola La Misma Nota, quiero ver el reel de casamientos.",
      title: "Entrada fina y pista explotando",
      description:
        "Una muestra de bodas y fiestas premium con entrada prolija y pista encendida.",
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
        description: "Así se vive el show en cumpleaños y eventos sociales.",
        meta: ["Coreable", "Setlist flexible"],
      },
      {
        posterClass: "video-poster--corporate",
        tag: "Corporativos",
        duration: "1:04",
        playLabel: "Pedir video corporativo",
        playMessage: "Hola La Misma Nota, quiero ver el reel corporativo.",
        title: "Formato adaptable para marcas",
        description: "Timing preciso, estética cuidada y lectura de público mixto.",
        meta: ["After office", "Marca"],
      },
    ],
  },
  processSection: {
    eyebrow: "Reserva",
    title: "Reservar es simple.",
    lead: "Pasanos fecha, zona y tipo de evento. Te respondemos con disponibilidad y propuesta.",
    steps: [
      {
        index: "01",
        title: "Nos pasás fecha",
        text: "Con fecha, zona y tipo de evento ya podemos orientarte.",
      },
      {
        index: "02",
        title: "Te sugerimos formato",
        text: "Te decimos qué opción encaja mejor con tu evento.",
      },
      {
        index: "03",
        title: "Cerrás la reserva",
        text: "Seguimos todo por WhatsApp para avanzar sin vueltas.",
      },
    ],
  },
  testimonialsSection: {
    eyebrow: "Testimonios",
    title: "Clientes que ya vivieron el show.",
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
    title: "Lo más consultado antes de reservar.",
    lead: "Respuestas cortas para decidir más rápido.",
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
    eyebrow: "Presupuesto",
    title: "Recibí tu estimado ahora",
    lead:
      "Completá los datos y te mostramos un valor de referencia al instante. Después enviás la consulta por WhatsApp con todo listo.",
    points: [
      {
        title: "Valor estimado",
        text: "Una referencia rápida para tu evento.",
      },
      {
        title: "Consulta lista",
        text: "El mensaje sale completo y sin escribir de más.",
      },
      {
        title: "Respuesta rápida",
        text: "Con fecha, zona y tipo de evento avanzamos más rápido.",
      },
    ],
    alternateContactTitle: "También podés escribir directo",
    checklistTitle: "Qué define el valor",
    checklistItems: ["Fecha", "Zona o venue", "Tipo de evento", "Duración", "Músicos", "Sonido y traslado"],
    promoNoteHtml:
      "Promo especial: <strong>voz/teclado + percusión por AR$ 450.000 con sonido base incluido</strong> para eventos de hasta 80 personas.",
    formActions: {
      submitLabel: "Calcular presupuesto",
      exampleLabel: "Cargar ejemplo",
      statusIdle: "Es un valor estimado para avanzar más rápido.",
    },
    result: {
      badge: "Presupuesto estimado",
      emptyCopy: "Completá el cotizador para ver tu estimado.",
      subtotalLabel: "Subtotal",
      discountLabel: "Descuento aplicado",
      depositLabel: "Seña requerida (30%)",
      balanceLabel: "Saldo pendiente",
      whatsappLabel: "Enviar consulta por WhatsApp",
      note: "Enviá la consulta y te respondemos con disponibilidad.",
    },
  },
  footer: {
    brandTag: "Cumbia en vivo para eventos",
    description: "Casamientos, cumpleaños, privados y corporativos en Buenos Aires y Argentina.",
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
