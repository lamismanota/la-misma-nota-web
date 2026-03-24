from __future__ import annotations

import ast
import html
import json
import re
import shutil
from pathlib import Path


ROOT = Path(__file__).parent
DIST = ROOT / "dist"
STATIC_FILES = [
    "styles.css",
    "admin.css",
    "pricing.js",
    "script.js",
    "admin.js",
    "site-config.js",
    "muestra-minimal.html",
]


def extract_object_literal(source: str, variable_name: str) -> str:
    marker = f"const {variable_name} ="
    start = source.find(marker)
    if start == -1:
        raise ValueError(f"No se encontro {variable_name} en el archivo de config.")

    brace_start = source.find("{", start)
    if brace_start == -1:
        raise ValueError("No se encontro el inicio del objeto de config.")

    depth = 0
    in_string = False
    escape = False
    quote = ""

    for index in range(brace_start, len(source)):
        char = source[index]

        if in_string:
            if escape:
                escape = False
            elif char == "\\":
                escape = True
            elif char == quote:
                in_string = False
            continue

        if char in ('"', "'"):
            in_string = True
            quote = char
            continue

        if char == "{":
            depth += 1
        elif char == "}":
            depth -= 1
            if depth == 0:
                return source[brace_start : index + 1]

    raise ValueError("No se pudo extraer el objeto de config.")


def strip_line_comments(source: str) -> str:
    result = []
    in_string = False
    escape = False
    quote = ""
    index = 0

    while index < len(source):
        char = source[index]
        next_char = source[index + 1] if index + 1 < len(source) else ""

        if in_string:
            result.append(char)
            if escape:
                escape = False
            elif char == "\\":
                escape = True
            elif char == quote:
                in_string = False
            index += 1
            continue

        if char in ('"', "'"):
            in_string = True
            quote = char
            result.append(char)
            index += 1
            continue

        if char == "/" and next_char == "/":
            while index < len(source) and source[index] != "\n":
                index += 1
            continue

        result.append(char)
        index += 1

    return "".join(result)


def quote_object_keys(source: str) -> str:
    result = []
    in_string = False
    escape = False
    quote = ""
    index = 0

    while index < len(source):
        char = source[index]

        if in_string:
            result.append(char)
            if escape:
                escape = False
            elif char == "\\":
                escape = True
            elif char == quote:
                in_string = False
            index += 1
            continue

        if char in ('"', "'"):
            in_string = True
            quote = char
            result.append(char)
            index += 1
            continue

        if char.isalpha() or char in ("_", "$"):
            previous = source[index - 1] if index > 0 else ""
            if previous in "{,\n ":
                start = index
                while index < len(source) and (source[index].isalnum() or source[index] in ("_", "$")):
                    index += 1
                key = source[start:index]
                lookahead = index
                while lookahead < len(source) and source[lookahead].isspace():
                    lookahead += 1
                if lookahead < len(source) and source[lookahead] == ":":
                    result.append(f'"{key}"')
                    continue
                result.append(key)
                continue

        result.append(char)
        index += 1

    return "".join(result)


def remove_trailing_commas(source: str) -> str:
    result = []
    in_string = False
    escape = False
    quote = ""
    index = 0

    while index < len(source):
        char = source[index]

        if in_string:
            result.append(char)
            if escape:
                escape = False
            elif char == "\\":
                escape = True
            elif char == quote:
                in_string = False
            index += 1
            continue

        if char in ('"', "'"):
            in_string = True
            quote = char
            result.append(char)
            index += 1
            continue

        if char == ",":
            lookahead = index + 1
            while lookahead < len(source) and source[lookahead].isspace():
                lookahead += 1
            if lookahead < len(source) and source[lookahead] in "]}":
                index += 1
                continue

        result.append(char)
        index += 1

    return "".join(result)


def replace_js_literals(source: str) -> str:
    result = []
    in_string = False
    escape = False
    quote = ""
    index = 0

    literal_map = {
        "true": "True",
        "false": "False",
        "null": "None",
    }

    while index < len(source):
        char = source[index]

        if in_string:
            result.append(char)
            if escape:
                escape = False
            elif char == "\\":
                escape = True
            elif char == quote:
                in_string = False
            index += 1
            continue

        if char in ('"', "'"):
            in_string = True
            quote = char
            result.append(char)
            index += 1
            continue

        replaced = False
        for js_literal, py_literal in literal_map.items():
            if source.startswith(js_literal, index):
                previous = source[index - 1] if index > 0 else ""
                next_index = index + len(js_literal)
                next_char = source[next_index] if next_index < len(source) else ""
                if not (previous.isalnum() or previous in ("_", "$")) and not (
                    next_char.isalnum() or next_char in ("_", "$")
                ):
                    result.append(py_literal)
                    index += len(js_literal)
                    replaced = True
                    break

        if replaced:
            continue

        result.append(char)
        index += 1

    return "".join(result)


def load_site_config() -> dict:
    source = (ROOT / "site-config.js").read_text(encoding="utf-8")
    object_literal = extract_object_literal(source, "siteConfig")
    without_comments = strip_line_comments(object_literal)
    with_quoted_keys = quote_object_keys(without_comments)
    without_trailing_commas = remove_trailing_commas(with_quoted_keys)
    python_literal = replace_js_literals(without_trailing_commas)
    return ast.literal_eval(python_literal)


def set_inner_by_id(source: str, element_id: str, value: str) -> str:
    pattern = re.compile(
        rf'(<(?P<tag>[a-zA-Z0-9]+)(?P<attrs>[^>]*\bid="{re.escape(element_id)}"[^>]*)>)(?P<content>.*?)(</(?P=tag)>)',
        re.S,
    )
    return pattern.sub(lambda match: f"{match.group(1)}{value}{match.group(5)}", source, count=1)


def set_attr_by_id(source: str, element_id: str, attribute: str, value: str) -> str:
    pattern = re.compile(rf'(<[^>]*\bid="{re.escape(element_id)}"[^>]*\b{re.escape(attribute)}=")([^"]*)(")', re.S)
    return pattern.sub(lambda match: f'{match.group(1)}{html.escape(value, quote=True)}{match.group(3)}', source, count=1)


def set_attr_by_name(source: str, element_name: str, attribute: str, value: str) -> str:
    pattern = re.compile(rf'(<[^>]*\bname="{re.escape(element_name)}"[^>]*\b{re.escape(attribute)}=")([^"]*)(")', re.S)
    return pattern.sub(lambda match: f'{match.group(1)}{html.escape(value, quote=True)}{match.group(3)}', source, count=1)


def replace_data_brand_names(source: str, value: str) -> str:
    pattern = re.compile(r'(<(?P<tag>[a-zA-Z0-9]+)(?P<attrs>[^>]*data-brand-name[^>]*)>)(?P<content>.*?)(</(?P=tag)>)', re.S)
    return pattern.sub(lambda match: f"{match.group(1)}{html.escape(value)}{match.group(5)}", source)


def set_title(source: str, value: str) -> str:
    return re.sub(r"<title>.*?</title>", f"<title>{html.escape(value)}</title>", source, count=1, flags=re.S)


def set_nav(source: str, items: list[dict]) -> str:
    inner = "".join(f'<a href="{html.escape(item["href"], quote=True)}">{html.escape(item["label"])}</a>' for item in items)
    pattern = re.compile(r'(<nav class="site-nav" aria-label="Navegación principal">)(.*?)(</nav>)', re.S)
    return pattern.sub(lambda match: f"{match.group(1)}{inner}{match.group(3)}", source, count=1)


def render_spans(items: list[str]) -> str:
    return "".join(f"<span>{html.escape(item)}</span>" for item in items)


def render_stats(items: list[dict]) -> str:
    return "".join(
        f'<article class="stat-card"><strong>{html.escape(item["value"])}</strong><span>{html.escape(item["text"])}</span></article>'
        for item in items
    )


def render_poster_stage_meta(items: list[dict]) -> str:
    return "".join(
        f'<article class="poster-stat"><span class="poster-label">{html.escape(item["label"])}</span><strong>{html.escape(item["value"])}</strong></article>'
        for item in items
    )


def render_value_cards(items: list[dict]) -> str:
    return "".join(
        f'<article class="value-card"><span class="value-index">{html.escape(item["index"])}</span><h3>{html.escape(item["title"])}</h3><p>{html.escape(item["text"])}</p></article>'
        for item in items
    )


def render_local_cards(items: list[dict]) -> str:
    return "".join(
        f'<article class="local-card"><span class="local-card-tag">{html.escape(item["tag"])}</span><h3>{html.escape(item["title"])}</h3><p>{html.escape(item["text"])}</p></article>'
        for item in items
    )


def render_format_cards(items: list[dict]) -> str:
    cards = []
    for item in items:
        classes = "format-card format-card--featured" if item.get("featured") else "format-card"
        lines = "".join(f"<li>{html.escape(line)}</li>" for line in item["items"])
        card = (
            f'<article class="{classes}">'
            f'<span class="format-pill">{html.escape(item["tag"])}</span>'
            f"<h3>{html.escape(item['title'])}</h3>"
            f"<p>{html.escape(item['description'])}</p>"
            f'<ul class="format-list">{lines}</ul>'
            f'<a class="button button--full" href="{html.escape(item["cta"]["href"], quote=True)}" data-whatsapp-link data-whatsapp-message="{html.escape(item["cta"]["whatsappMessage"], quote=True)}">{html.escape(item["cta"]["label"])}</a>'
            "</article>"
        )
        cards.append(card)
    return "".join(cards)


def render_package_cards(items: list[dict]) -> str:
    cards = []
    for item in items:
        classes = "package-card package-card--featured" if item.get("featured") else "package-card"
        lines = "".join(f"<li>{html.escape(line)}</li>" for line in item["items"])
        card = (
            f'<article class="{classes}">'
            f'<span class="package-tag">{html.escape(item["tag"])}</span>'
            f"<h3>{html.escape(item['title'])}</h3>"
            f"<p>{html.escape(item['description'])}</p>"
            f'<ul class="package-list">{lines}</ul>'
            '<div class="package-footer">'
            f"<strong>{html.escape(item['closing'])}</strong>"
            f'<a class="button button--full" href="{html.escape(item["cta"]["href"], quote=True)}" data-whatsapp-link data-whatsapp-message="{html.escape(item["cta"]["whatsappMessage"], quote=True)}">{html.escape(item["cta"]["label"])}</a>'
            "</div>"
            "</article>"
        )
        cards.append(card)
    return "".join(cards)


def render_featured_video(item: dict) -> str:
    meta = render_spans(item["meta"])
    cta = item["cta"]
    return (
        '<article class="video-card video-card--featured">'
        f'<div class="video-poster {html.escape(item["posterClass"])}">'
        f'<span class="video-tag">{html.escape(item["tag"])}</span>'
        f'<span class="video-duration">{html.escape(item["duration"])}</span>'
        f'<a class="video-play" href="#consulta" aria-label="{html.escape(item["playLabel"], quote=True)}" data-whatsapp-link data-whatsapp-message="{html.escape(item["playMessage"], quote=True)}"></a>'
        "</div>"
        '<div class="video-body">'
        f"<h3>{html.escape(item['title'])}</h3>"
        f"<p>{html.escape(item['description'])}</p>"
        f'<div class="video-meta">{meta}</div>'
        f'<a class="button video-link" href="{html.escape(cta["href"], quote=True)}" data-whatsapp-link data-whatsapp-message="{html.escape(cta["whatsappMessage"], quote=True)}">{html.escape(cta["label"])}</a>'
        "</div>"
        "</article>"
    )


def render_stack_video(item: dict) -> str:
    meta = render_spans(item["meta"])
    return (
        '<article class="video-card">'
        f'<div class="video-poster {html.escape(item["posterClass"])}">'
        f'<span class="video-tag">{html.escape(item["tag"])}</span>'
        f'<span class="video-duration">{html.escape(item["duration"])}</span>'
        f'<a class="video-play" href="#consulta" aria-label="{html.escape(item["playLabel"], quote=True)}" data-whatsapp-link data-whatsapp-message="{html.escape(item["playMessage"], quote=True)}"></a>'
        "</div>"
        '<div class="video-body">'
        f"<h3>{html.escape(item['title'])}</h3>"
        f"<p>{html.escape(item['description'])}</p>"
        f'<div class="video-meta">{meta}</div>'
        "</div>"
        "</article>"
    )


def render_video_layout(config: dict) -> str:
    featured = render_featured_video(config["featured"])
    stack = "".join(render_stack_video(item) for item in config["stack"])
    return f'{featured}<div class="video-stack">{stack}</div>'


def render_process_cards(items: list[dict]) -> str:
    return "".join(
        f'<article class="process-card"><span class="process-step">{html.escape(item["index"])}</span><h3>{html.escape(item["title"])}</h3><p>{html.escape(item["text"])}</p></article>'
        for item in items
    )


def render_testimonials(items: list[dict]) -> str:
    return "".join(
        '<article class="testimonial-card">'
        '<div class="testimonial-stars" aria-label="5 de 5 estrellas">★★★★★</div>'
        f"<p>{html.escape(item['quote'])}</p>"
        f"<strong>{html.escape(item['author'])}</strong>"
        f"<span>{html.escape(item['context'])}</span>"
        "</article>"
        for item in items
    )


def render_faq(items: list[dict]) -> str:
    return "".join(
        f'<details class="faq-item"><summary>{html.escape(item["question"])}</summary><p>{html.escape(item["answer"])}</p></details>'
        for item in items
    )


def render_contact_points(config: dict) -> str:
    blocks = []
    for item in config["contactSection"]["points"]:
        blocks.append(
            f"<article><strong>{html.escape(item['title'])}</strong><p>{html.escape(item['text'])}</p></article>"
        )

    contact = config["contact"]
    blocks.append(
        "<article>"
        f"<strong>{html.escape(config['contactSection']['alternateContactTitle'])}</strong>"
        f'<p>WhatsApp: <a class="inline-link" href="https://wa.me/{html.escape(contact["whatsapp"], quote=True)}" target="_blank" rel="noreferrer">{html.escape(contact["phone"])}</a></p>'
        f'<p>Email: <a class="inline-link" href="mailto:{html.escape(contact["email"], quote=True)}">{html.escape(contact["email"])}</a></p>'
        f'<p>Instagram: <a class="inline-link" href="{html.escape(contact["instagram"], quote=True)}" target="_blank" rel="noreferrer">{html.escape(contact["instagramHandle"])}</a></p>'
        f'<p>TikTok: <a class="inline-link" href="{html.escape(contact["tiktok"], quote=True)}" target="_blank" rel="noreferrer">{html.escape(contact["tiktokHandle"])}</a></p>'
        f'<p>YouTube: <a class="inline-link" href="{html.escape(contact["youtube"], quote=True)}" target="_blank" rel="noreferrer">{html.escape(contact["youtubeHandle"])}</a></p>'
        "</article>"
    )
    return "".join(blocks)


def render_music_group_schema(config: dict) -> str:
    schema = {
        "@context": "https://schema.org",
        "@type": "MusicGroup",
        "name": config["brand"],
        "description": config["seo"]["musicGroupDescription"],
        "genre": config["seo"]["genres"],
        "telephone": config["contact"]["phone"],
        "email": config["contact"]["email"],
        "sameAs": [
            config["contact"]["instagram"],
            config["contact"]["tiktok"],
            config["contact"]["youtube"],
        ],
        "address": {
            "@type": "PostalAddress",
            "addressLocality": config["contact"]["addressLocality"],
            "addressRegion": config["contact"]["addressRegion"],
            "addressCountry": config["contact"]["addressCountry"],
        },
        "contactPoint": [
            {
                "@type": "ContactPoint",
                "contactType": "sales",
                "telephone": config["contact"]["phone"],
                "email": config["contact"]["email"],
                "availableLanguage": ["es"],
                "areaServed": "AR",
            }
        ],
        "areaServed": config["seo"]["areaServed"],
        "hasOfferCatalog": {
            "@type": "OfferCatalog",
            "name": "Paquetes para eventos",
            "itemListElement": [{"@type": "Offer", "name": item} for item in config["seo"]["offerCatalog"]],
        },
    }
    return json.dumps(schema, ensure_ascii=False)


def render_faq_schema(config: dict) -> str:
    schema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
            {
                "@type": "Question",
                "name": item["question"],
                "acceptedAnswer": {"@type": "Answer", "text": item["answer"]},
            }
            for item in config["faqSection"]["items"]
        ],
    }
    return json.dumps(schema, ensure_ascii=False)


def render_index(source: str, config: dict) -> str:
    source = set_title(source, config["seo"]["title"])
    source = set_attr_by_id(source, "meta-description", "content", config["seo"]["description"])
    source = set_attr_by_id(source, "meta-og-title", "content", config["seo"]["ogTitle"])
    source = set_attr_by_id(source, "meta-og-description", "content", config["seo"]["ogDescription"])
    source = set_attr_by_id(source, "meta-twitter-title", "content", config["seo"]["twitterTitle"])
    source = set_attr_by_id(source, "meta-twitter-description", "content", config["seo"]["twitterDescription"])
    source = set_inner_by_id(source, "music-group-schema", render_music_group_schema(config))
    source = set_inner_by_id(source, "faq-schema", render_faq_schema(config))
    source = replace_data_brand_names(source, config["brand"])
    source = set_nav(source, config["navigation"])

    simple_html_fields = {
        "hero-title": config["hero"]["titleHtml"],
        "hero-lead": config["hero"]["leadHtml"],
        "local-seo-lead": config["localSeoSection"]["leadHtml"],
        "contact-promo-note": config["contactSection"]["promoNoteHtml"],
    }
    for key, value in simple_html_fields.items():
        source = set_inner_by_id(source, key, value)

    simple_text_fields = {
        "floating-whatsapp-label": config["buttons"]["floatingWhatsapp"]["label"],
        "header-brand-tag": config["hero"]["brandTag"],
        "hero-eyebrow": config["hero"]["eyebrow"],
        "poster-topline": config["hero"]["posterTopline"],
        "poster-logo-top": config["hero"]["posterLogoTop"],
        "poster-logo-bottom": config["hero"]["posterLogoBottom"],
        "hero-chip-left-label": config["hero"]["chips"][0]["label"],
        "hero-chip-left-title": config["hero"]["chips"][0]["title"],
        "hero-chip-right-label": config["hero"]["chips"][1]["label"],
        "hero-chip-right-title": config["hero"]["chips"][1]["title"],
        "conversion-eyebrow": config["conversionSection"]["eyebrow"],
        "conversion-title": config["conversionSection"]["title"],
        "conversion-lead": config["conversionSection"]["lead"],
        "local-seo-eyebrow": config["localSeoSection"]["eyebrow"],
        "local-seo-title": config["localSeoSection"]["title"],
        "formats-eyebrow": config["formatsSection"]["eyebrow"],
        "formats-title": config["formatsSection"]["title"],
        "formats-lead": config["formatsSection"]["lead"],
        "packages-eyebrow": config["packagesSection"]["eyebrow"],
        "packages-title": config["packagesSection"]["title"],
        "packages-lead": config["packagesSection"]["lead"],
        "packages-close-copy": config["packagesSection"]["closeCopy"],
        "videos-eyebrow": config["videosSection"]["eyebrow"],
        "videos-title": config["videosSection"]["title"],
        "videos-lead": config["videosSection"]["lead"],
        "process-eyebrow": config["processSection"]["eyebrow"],
        "process-title": config["processSection"]["title"],
        "process-lead": config["processSection"]["lead"],
        "testimonials-eyebrow": config["testimonialsSection"]["eyebrow"],
        "testimonials-title": config["testimonialsSection"]["title"],
        "faq-eyebrow": config["faqSection"]["eyebrow"],
        "faq-title": config["faqSection"]["title"],
        "faq-lead": config["faqSection"]["lead"],
        "contact-eyebrow": config["contactSection"]["eyebrow"],
        "contact-title": config["contactSection"]["title"],
        "contact-lead": config["contactSection"]["lead"],
        "contact-checklist-title": config["contactSection"]["checklistTitle"],
        "quote-submit-button": config["contactSection"]["formActions"]["submitLabel"],
        "load-example": config["contactSection"]["formActions"]["exampleLabel"],
        "form-status": config["contactSection"]["formActions"]["statusIdle"],
        "quote-badge-label": config["contactSection"]["result"]["badge"],
        "quote-summary": config["contactSection"]["result"]["emptyCopy"],
        "quote-subtotal-label": config["contactSection"]["result"]["subtotalLabel"],
        "quote-discount-label": config["contactSection"]["result"]["discountLabel"],
        "quote-deposit-label": config["contactSection"]["result"]["depositLabel"],
        "quote-balance-label": config["contactSection"]["result"]["balanceLabel"],
        "quote-whatsapp": config["contactSection"]["result"]["whatsappLabel"],
        "quote-result-note": config["contactSection"]["result"]["note"],
        "footer-brand-tag": config["footer"]["brandTag"],
        "footer-description": config["footer"]["description"],
        "footer-admin-link": config["footer"]["adminLabel"],
    }
    for key, value in simple_text_fields.items():
        source = set_inner_by_id(source, key, html.escape(value))

    source = set_inner_by_id(source, "hero-booking-pulse", render_spans(config["hero"]["bookingBadges"]))
    source = set_inner_by_id(source, "hero-service-areas", render_spans(config["hero"]["serviceAreas"]))
    source = set_inner_by_id(source, "hero-stat-row", render_stats(config["hero"]["stats"]))
    source = set_inner_by_id(source, "poster-stage-meta", render_poster_stage_meta(config["hero"]["posterStageMeta"]))
    source = set_inner_by_id(source, "poster-mini-formats", render_spans(config["hero"]["miniFormats"]))
    source = set_inner_by_id(source, "value-grid", render_value_cards(config["conversionSection"]["cards"]))
    source = set_inner_by_id(source, "local-grid", render_local_cards(config["localSeoSection"]["cards"]))
    source = set_inner_by_id(source, "local-chip-row", render_spans(config["localSeoSection"]["chips"]))
    source = set_inner_by_id(source, "formats-grid", render_format_cards(config["formatsSection"]["cards"]))
    source = set_inner_by_id(source, "package-grid", render_package_cards(config["packagesSection"]["cards"]))
    source = set_inner_by_id(source, "video-layout", render_video_layout(config["videosSection"]))
    source = set_inner_by_id(source, "process-grid", render_process_cards(config["processSection"]["steps"]))
    source = set_inner_by_id(source, "testimonial-grid", render_testimonials(config["testimonialsSection"]["items"]))
    source = set_inner_by_id(source, "faq-list", render_faq(config["faqSection"]["items"]))
    source = set_inner_by_id(source, "contact-points", render_contact_points(config))
    source = set_inner_by_id(source, "contact-checklist-row", render_spans(config["contactSection"]["checklistItems"]))

    cta_ids = {
        "header-reserve-button": config["buttons"]["headerReserve"],
        "hero-primary-cta": config["hero"]["primaryCta"],
        "hero-secondary-cta": config["hero"]["secondaryCta"],
        "packages-close-button": config["packagesSection"]["closeCta"],
        "footer-cta-button": config["buttons"]["footerCta"],
    }
    for element_id, cta in cta_ids.items():
        source = set_inner_by_id(source, element_id, html.escape(cta["label"]))
        source = set_attr_by_id(source, element_id, "href", cta["href"])
        if "whatsappMessage" in cta:
            source = set_attr_by_id(source, element_id, "data-whatsapp-message", cta["whatsappMessage"])

    source = set_attr_by_id(source, "floating-whatsapp-link", "href", config["buttons"]["floatingWhatsapp"]["href"])
    source = set_attr_by_id(
        source,
        "floating-whatsapp-link",
        "data-whatsapp-message",
        config["buttons"]["floatingWhatsapp"]["whatsappMessage"],
    )
    source = set_attr_by_id(
        source,
        "floating-whatsapp-link",
        "aria-label",
        config["buttons"]["floatingWhatsapp"]["ariaLabel"],
    )

    source = set_attr_by_id(source, "quote-form", "name", config["forms"]["eventQuoteName"])
    source = set_attr_by_name(source, "form-name", "value", config["forms"]["eventQuoteName"])
    source = set_attr_by_id(source, "quote-whatsapp", "href", "#consulta")
    source = set_attr_by_id(source, "footer-admin-link", "href", "admin.html")
    return source


def render_admin(source: str, config: dict) -> str:
    source = set_title(source, config["admin"]["pageTitle"])
    fields = {
        "admin-brand-name": config["brand"],
        "admin-brand-subtitle": config["admin"]["brandSubtitle"],
        "admin-header-button": config["admin"]["headerButton"],
        "admin-hero-kicker": config["admin"]["heroKicker"],
        "admin-hero-title": config["admin"]["heroTitle"],
        "admin-hero-lead": config["admin"]["heroLead"],
        "admin-filter-label": config["admin"]["filterLabel"],
        "admin-empty-title": config["admin"]["emptyTitle"],
        "admin-empty-text": config["admin"]["emptyText"],
        "admin-scenarios-kicker": config["admin"]["scenariosKicker"],
        "admin-scenarios-title": config["admin"]["scenariosTitle"],
        "admin-scenarios-lead": config["admin"]["scenariosLead"],
    }
    for key, value in fields.items():
        source = set_inner_by_id(source, key, html.escape(value))
    return source


def build_dist() -> None:
    config = load_site_config()

    if DIST.exists():
        shutil.rmtree(DIST)

    DIST.mkdir(parents=True, exist_ok=True)

    for filename in STATIC_FILES:
        shutil.copy2(ROOT / filename, DIST / filename)

    shutil.copytree(ROOT / "assets", DIST / "assets")

    index_source = (ROOT / "index.html").read_text(encoding="utf-8")
    admin_source = (ROOT / "admin.html").read_text(encoding="utf-8")

    (DIST / "index.html").write_text(render_index(index_source, config), encoding="utf-8")
    (DIST / "admin.html").write_text(render_admin(admin_source, config), encoding="utf-8")


if __name__ == "__main__":
    build_dist()
    print("Build listo en dist/")
