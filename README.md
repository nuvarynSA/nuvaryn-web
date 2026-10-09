# Nuvaryn S.A. — Sitio web

Sitio institucional de **Nuvaryn S.A.**, empresa de desarrollo de software a medida para empresas. Una sola página, estático.

- **Stack:** HTML + CSS + JavaScript vanilla, [GSAP](https://gsap.com/) (CDN), Google Fonts.
- **Idiomas:** Español / Inglés (switch en la barra de navegación).
- **Tema:** claro / oscuro (switch día / noche, persistente).
- **Secciones:** Inicio · Nosotros · Productos · Proyectos · Preguntas · Contacto.
- **Demos de productos** (inspiradas en la estructura de módulos de [Dolibarr](https://www.dolibarr.org/)):
  - `demo/erp.html` — **Nuvaryn ERP**: terceros, productos, stock multialmacén, fabricación (BOM, órdenes de fabricación, capacidad), presupuestos, pedidos, facturación y cobranzas, compras, bancos, RR.HH. e informes.
  - `demo/crm.html` — **Nuvaryn CRM**: leads con puntaje, pipeline Kanban con arrastrar y soltar, empresas y contactos, agenda/calendario, cotizaciones, tickets de postventa con SLA, campañas de email e informes.
  - Datos ficticios generados en el navegador; los cambios se guardan en `localStorage` y se pueden restablecer desde la barra superior.

## Desarrollo

Es un sitio estático. Abrir `index.html` directamente o servirlo localmente:

```bash
python -m http.server 5600
# http://127.0.0.1:5600/
```

## Contacto

- Email: nuvarynsa@gmail.com
- LinkedIn: https://www.linkedin.com/in/nuvarynsa
