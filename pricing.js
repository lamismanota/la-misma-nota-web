(function () {
  const PRICING_CONFIG = {
    defaultBasePrice: 500000,
    depositRate: 0.3,
    baseShowDurationMinutes: 45,
    durationIncrementMinutes: 15,
    durationIncrementFee: 50000,
    eventBasePrices: {
      "Show en vivo": 500000,
      Casamiento: 750000,
      Cumpleaños: 650000,
      "Evento privado": 700000,
      "Evento corporativo": 900000,
    },
    includedMusicians: 4,
    includedFormation: "Voz + teclado, batería electrónica, acordeón y animación + guiro",
    extraMusicianFee: 60000,
    reducedFormatDiscountRate: 0.15,
    karaokeAvailable: false,
    karaokeAddon: {
      label: "Karaoke",
      amount: 0,
      configured: true,
    },
    specialPromo: {
      enabled: true,
      label: "Promo formato reducido",
      price: 450000,
      maxPeople: 80,
      requiredMusicians: 2,
      formation: "Voz/teclado + percusión",
      includedSound: "basico",
    },
    soundAddons: {
      venue: {
        label: "Sonido provisto por venue",
        amount: 0,
        configured: true,
      },
      basico: {
        label: "Sonido básico",
        amount: 200000,
        configured: true,
      },
      full: {
        label: "Sonido full grande",
        amount: 550000,
        configured: true,
      },
    },
    lightsAddons: {
      sin_luces: {
        label: "Sin luces adicionales",
        amount: 0,
        configured: true,
      },
      show: {
        label: "Luces de show",
        amount: 0,
        configured: true,
      },
      show_pista: {
        label: "Luces de show + pista",
        amount: 0,
        configured: true,
      },
    },
    transportByZone: {
      CABA: 45000,
      "Zona Norte": 60000,
      "Zona Oeste": 60000,
      "Zona Sur": 60000,
      "La Plata": 60000,
      "Interior de Buenos Aires": 100000,
      "Interior de Argentina": 100000,
    },
  };

  const EXAMPLE_QUOTE = {
    nombre: "Lucía Fernández",
    telefono: "+54 9 11 5555 1234",
    personas: 150,
    fecha: "2026-11-14",
    zona: "Zona Norte",
    evento: "Casamiento",
    duracion: 90,
    musicos: 5,
    sonido: "venue",
    luces: "sin_luces",
    traslado: "si",
    karaoke: false,
    descuentoPorcentaje: 0,
    descuentoFijo: 0,
    mensaje: "Evento de noche con entrada elegante y cierre bien arriba.",
  };

  const TEST_CASES = [
    {
      title: "Cumpleaños en CABA, formato base",
      quote: {
        evento: "Cumpleaños",
        zona: "CABA",
        duracion: 45,
        musicos: 4,
        traslado: "si",
        karaoke: false,
        sonido: "venue",
        luces: "sin_luces",
        descuentoPorcentaje: 0,
        descuentoFijo: 0,
        personas: 100,
      },
    },
    {
      title: "Casamiento en Zona Norte, 90 min, 5 músicos",
      quote: {
        evento: "Casamiento",
        zona: "Zona Norte",
        duracion: 90,
        musicos: 5,
        traslado: "si",
        karaoke: false,
        sonido: "venue",
        luces: "sin_luces",
        descuentoPorcentaje: 0,
        descuentoFijo: 0,
        personas: 180,
      },
    },
    {
      title: "Evento privado en CABA, 60 min, formato reducido",
      quote: {
        evento: "Evento privado",
        zona: "CABA",
        duracion: 60,
        musicos: 3,
        traslado: "si",
        karaoke: false,
        sonido: "venue",
        luces: "sin_luces",
        descuentoPorcentaje: 0,
        descuentoFijo: 0,
        personas: 90,
      },
    },
    {
      title: "Corporativo interior BA, 90 min, 6 músicos",
      quote: {
        evento: "Evento corporativo",
        zona: "Interior de Buenos Aires",
        duracion: 90,
        musicos: 6,
        traslado: "si",
        karaoke: false,
        sonido: "venue",
        luces: "sin_luces",
        descuentoPorcentaje: 0,
        descuentoFijo: 100000,
        personas: 250,
      },
    },
    {
      title: "Show en vivo en Zona Sur, 45 min",
      quote: {
        evento: "Show en vivo",
        zona: "Zona Sur",
        duracion: 45,
        musicos: 4,
        traslado: "si",
        karaoke: false,
        sonido: "venue",
        luces: "sin_luces",
        descuentoPorcentaje: 0,
        descuentoFijo: 0,
        personas: 80,
      },
    },
    {
      title: "Cumpleaños en La Plata con 10% de descuento",
      quote: {
        evento: "Cumpleaños",
        zona: "La Plata",
        duracion: 60,
        musicos: 4,
        traslado: "si",
        karaoke: false,
        sonido: "basico",
        luces: "sin_luces",
        descuentoPorcentaje: 10,
        descuentoFijo: 0,
        personas: 120,
      },
    },
    {
      title: "Casamiento interior Argentina, 7 músicos, descuento mixto",
      quote: {
        evento: "Casamiento",
        zona: "Interior de Argentina",
        duracion: 60,
        musicos: 7,
        traslado: "si",
        karaoke: false,
        sonido: "venue",
        luces: "sin_luces",
        descuentoPorcentaje: 5,
        descuentoFijo: 50000,
        personas: 220,
      },
    },
    {
      title: "Evento privado en CABA con descuento fijo",
      quote: {
        evento: "Evento privado",
        zona: "CABA",
        duracion: 45,
        musicos: 3,
        traslado: "no",
        karaoke: false,
        sonido: "venue",
        luces: "sin_luces",
        descuentoPorcentaje: 0,
        descuentoFijo: 25000,
        personas: 70,
      },
    },
    {
      title: "Corporativo en CABA con sonido full",
      quote: {
        evento: "Evento corporativo",
        zona: "CABA",
        duracion: 90,
        musicos: 4,
        traslado: "no",
        karaoke: false,
        sonido: "full",
        luces: "sin_luces",
        descuentoPorcentaje: 0,
        descuentoFijo: 0,
        personas: 200,
      },
    },
    {
      title: "Promo 2 músicos con sonido base incluido",
      quote: {
        evento: "Cumpleaños",
        zona: "CABA",
        duracion: 45,
        musicos: 2,
        traslado: "no",
        karaoke: false,
        sonido: "basico",
        luces: "sin_luces",
        descuentoPorcentaje: 0,
        descuentoFijo: 0,
        personas: 80,
      },
    },
  ];

  const currencyFormatter = new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
    maximumFractionDigits: 0,
  });

  const toNumber = (value) => {
    const numeric = Number(value || 0);
    return Number.isFinite(numeric) ? numeric : 0;
  };

  const roundMoney = (value) => Math.round(toNumber(value));

  const formatCurrency = (value) => currencyFormatter.format(roundMoney(value));

  const normalizeQuoteInput = (input = {}) => ({
    nombre: String(input.nombre || "").trim(),
    telefono: String(input.telefono || "").trim(),
    personas: toNumber(input.personas),
    fecha: String(input.fecha || "").trim(),
    zona: String(input.zona || "").trim(),
    evento: String(input.evento || "Show en vivo").trim(),
    duracion: toNumber(input.duracion || 45),
    musicos: toNumber(input.musicos || PRICING_CONFIG.includedMusicians),
    karaoke: Boolean(input.karaoke === true || input.karaoke === "si" || input.karaoke === "on"),
    sonido: String(input.sonido || "venue").trim(),
    luces: String(input.luces || "sin_luces").trim(),
    traslado: String(input.traslado || "no").trim(),
    descuentoPorcentaje: Math.max(0, toNumber(input.descuentoPorcentaje || input.descuento_porcentaje)),
    descuentoFijo: Math.max(0, toNumber(input.descuentoFijo || input.descuento_fijo)),
    mensaje: String(input.mensaje || "").trim(),
  });

  const getEventBasePrice = (evento) =>
    PRICING_CONFIG.eventBasePrices[evento] || PRICING_CONFIG.defaultBasePrice;

  const getDurationAddon = (duracion) => {
    const extraMinutes = Math.max(toNumber(duracion) - PRICING_CONFIG.baseShowDurationMinutes, 0);
    const steps = Math.ceil(extraMinutes / PRICING_CONFIG.durationIncrementMinutes);
    return steps * PRICING_CONFIG.durationIncrementFee;
  };

  const getSpecialPromo = (quote) => {
    const promo = PRICING_CONFIG.specialPromo;
    if (!promo.enabled) return null;
    if (quote.musicos !== promo.requiredMusicians) return null;

    if (quote.personas > promo.maxPeople) {
      return {
        applies: false,
        warning: `La promo de ${promo.formation} con sonido base incluido aplica solo hasta ${promo.maxPeople} personas.`,
      };
    }

    return {
      applies: true,
      label: `${promo.label} ${promo.formation}`,
      price: promo.price,
      includedSound: promo.includedSound,
    };
  };

  const getMusicianAdjustment = (basePrice, musicos) => {
    if (musicos > PRICING_CONFIG.includedMusicians) {
      return {
        label: `${musicos - PRICING_CONFIG.includedMusicians} músico${musicos - PRICING_CONFIG.includedMusicians > 1 ? "s" : ""} extra`,
        amount: (musicos - PRICING_CONFIG.includedMusicians) * PRICING_CONFIG.extraMusicianFee,
        kind: "charge",
      };
    }

    if (musicos < PRICING_CONFIG.includedMusicians) {
      return {
        label: `Descuento formato reducido (${Math.round(PRICING_CONFIG.reducedFormatDiscountRate * 100)}%)`,
        amount: -roundMoney(basePrice * PRICING_CONFIG.reducedFormatDiscountRate),
        kind: "discount",
      };
    }

    return null;
  };

  const getKaraokeAddon = (enabled) => {
    if (!enabled) return null;
    if (!PRICING_CONFIG.karaokeAvailable) return null;

    return {
      label: PRICING_CONFIG.karaokeAddon.label,
      amount: PRICING_CONFIG.karaokeAddon.amount,
      configured: PRICING_CONFIG.karaokeAddon.configured,
      kind: "charge",
    };
  };

  const getSoundAddon = (soundKey, specialPromo) => {
    if (specialPromo?.applies) {
      if (soundKey === "full") {
        return {
          label: "Upgrade a sonido full grande",
          amount: Math.max(
            (PRICING_CONFIG.soundAddons.full?.amount || 0) - (PRICING_CONFIG.soundAddons.basico?.amount || 0),
            0,
          ),
          configured: true,
          kind: "charge",
        };
      }

      if (soundKey === specialPromo.includedSound) {
        return {
          label: "Sonido base incluido en promo",
          amount: 0,
          configured: true,
          kind: "charge",
        };
      }
    }

    return getMappedAddon(PRICING_CONFIG.soundAddons, soundKey);
  };

  const getMappedAddon = (map, key) => {
    const option = map[key];
    if (!option) return null;

    return {
      label: option.label,
      amount: option.amount,
      configured: option.configured,
      kind: "charge",
    };
  };

  const getTransportAddon = (zona, traslado) => {
    if (!(traslado === "si" || traslado === true)) return null;

    return {
      label: `Traslado ${zona}`,
      amount: PRICING_CONFIG.transportByZone[zona] || 0,
      configured: true,
      kind: "charge",
    };
  };

  const getManualDiscounts = (subtotal, percentage, fixedAmount) => {
    const percentValue = Math.max(0, percentage);
    const fixedValue = Math.max(0, fixedAmount);
    const percentageDiscount = roundMoney(subtotal * (percentValue / 100));

    return {
      percentageDiscount,
      fixedDiscount: roundMoney(fixedValue),
      totalDiscount: percentageDiscount + roundMoney(fixedValue),
    };
  };

  const calculateDeposit = (total) => roundMoney(total * PRICING_CONFIG.depositRate);

  const buildQuoteBreakdown = (rawInput) => {
    const quote = normalizeQuoteInput(rawInput);
    const lines = [];
    const warnings = [];
    const specialPromo = getSpecialPromo(quote);

    const pushLine = (line) => {
      if (!line) return;
      lines.push(line);
      if (line.configured === false) {
        warnings.push(`${line.label} sigue en $0 porque ese valor real todavía no está cargado.`);
      }
    };

    if (specialPromo?.warning) {
      warnings.push(specialPromo.warning);
    }

    const basePrice = specialPromo?.applies ? specialPromo.price : getEventBasePrice(quote.evento);
    pushLine({
      label: specialPromo?.applies ? specialPromo.label : `Base ${quote.evento}`,
      amount: basePrice,
      configured: true,
      kind: "charge",
    });

    pushLine({
      label: `${quote.duracion} minutos`,
      amount: getDurationAddon(quote.duracion),
      configured: true,
      kind: "charge",
    });

    if (!specialPromo?.applies) {
      pushLine(getMusicianAdjustment(basePrice, quote.musicos));
    }

    pushLine(getKaraokeAddon(quote.karaoke));
    pushLine(getSoundAddon(quote.sonido, specialPromo));
    pushLine(getTransportAddon(quote.zona, quote.traslado));

    const subtotal = roundMoney(lines.reduce((sum, line) => sum + line.amount, 0));
    const discounts = getManualDiscounts(subtotal, quote.descuentoPorcentaje, quote.descuentoFijo);

    if (discounts.percentageDiscount > 0) {
      pushLine({
        label: `Descuento manual ${quote.descuentoPorcentaje}%`,
        amount: -discounts.percentageDiscount,
        configured: true,
        kind: "discount",
      });
    }

    if (discounts.fixedDiscount > 0) {
      pushLine({
        label: "Descuento manual fijo",
        amount: -discounts.fixedDiscount,
        configured: true,
        kind: "discount",
      });
    }

    const total = Math.max(roundMoney(subtotal - discounts.totalDiscount), 0);
    const deposit = calculateDeposit(total);
    const balance = Math.max(total - deposit, 0);

    return {
      quote,
      lines,
      subtotal,
      total,
      discountTotal: discounts.totalDiscount,
      deposit,
      balance,
      warnings,
      summary: `Estimado para ${quote.evento.toLowerCase()} en ${quote.zona}, ${quote.duracion} minutos y ${quote.musicos} músico${quote.musicos > 1 ? "s" : ""}.`,
      meta: [
        quote.fecha,
        quote.zona,
        `${quote.personas} personas`,
        `${quote.duracion} min`,
        `${quote.musicos} músicos`,
      ],
    };
  };

  window.LaMismaNotaPricing = {
    config: PRICING_CONFIG,
    exampleQuote: EXAMPLE_QUOTE,
    testCases: TEST_CASES,
    normalizeQuoteInput,
    getEventBasePrice,
    getDurationAddon,
    getSpecialPromo,
    getMusicianAdjustment,
    getKaraokeAddon,
    getMappedAddon,
    getSoundAddon,
    getTransportAddon,
    getManualDiscounts,
    calculateDeposit,
    buildQuoteBreakdown,
    formatCurrency,
  };
})();
