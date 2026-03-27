## TNG Music StudioART en Netlify

Este directorio existe para publicar `TNG Music StudioART` como un sitio separado de `La Misma Nota`, usando el mismo repo.

### Configuracion recomendada en Netlify

- Repositorio: `lamismanota/la-misma-nota-web`
- Base directory: `sites/studioart`
- Build command: `python3 build.py`
- Publish directory: `dist`

### Resultado

- `La Misma Nota` se publica desde la raiz del repo.
- `TNG Music StudioART` se publica desde este package directory como un segundo sitio independiente.
