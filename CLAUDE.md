# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Proyecto

Web corporativa de EPCA · Enginyeria i Projectes Cardener, SL (epca.es). Sitio estático (HTML/CSS/JS sin framework ni build), desplegado en Netlify. Bilingüe: castellano en la raíz, catalán en `ca/` (páginas estáticas generadas, enlazadas con `hreflang`).

## Estructura

- `index.html` — home (servicios, asistentes, nosotros, contacto)
- `licitaciones.html`, `peritajes.html`, `hosteleria.html`, `licencias-actividad.html`, `legalizacion-instalaciones.html`, `reformas-industriales.html`, `seguridad-salud.html` — landings de servicio
- `asistente-peritajes.html`, `asistente-licencias.html`, `asistente-hosteleria.html` — formularios guiados públicos (autocontenidos: CSS/JS inline, toggle de idioma por JS)
- `asistente-licencias-actividad.html` — herramienta INTERNA (lleva `noindex, nofollow`; no enlazar desde la web)
- `ca/` — versión catalana de home, landings y páginas legales
- `aviso-legal.html`, `politica-privacidad.html` (+ versiones en `ca/`) — páginas legales (LSSI/RGPD)
- `styles.css`, `script.js` — compartidos por home y landings (no por los asistentes)
- `sitemap.xml`, `robots.txt`, `favicon.png`, `apple-touch-icon.png`

## Convenciones importantes

- **Idiomas**: las páginas ES llevan los textos también en atributos `data-es`/`data-ca`; las páginas de `ca/` se generan a partir de ellos (sustitución del texto por el valor de `data-ca` + traducción de `<title>`/metas). Si cambias un texto en una página ES, actualiza también su `data-ca` y la página correspondiente en `ca/`.
- **Formularios**: envío AJAX a Web3Forms desde `script.js` (home/landings) o JS inline (asistentes). Todos llevan casilla de consentimiento RGPD obligatoria y mensaje de error de envío (`#formError` / `#sendErr`).
- **Cache-busting**: `script.js` se referencia con `?v=N`; incrementa N si lo modificas.
- **SEO**: cada página tiene `canonical` + `hreflang` (es/ca/x-default). Si añades una página, añádela a `sitemap.xml`.
- No hay cookies ni analítica (la política de privacidad lo afirma); no añadir trackers sin actualizar la política.

## Desarrollo

Sitio estático: abrir `index.html` en el navegador o servir con `py -m http.server`.

## Flujo de contribución

1. Crea una rama descriptiva: `git checkout -b mi-mejora`
2. Realiza los cambios y haz commit: `git commit -m "Descripción del cambio"`
3. Abre un Pull Request contra `main`
