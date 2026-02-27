# Javier Rodríguez González — Portfolio & CV

Sitio web personal de CV y portfolio de proyectos. Diseño minimalista con estética pastel + accents vibrantes, optimizado para empleabilidad en el sector de la comunicación y el periodismo audiovisual.

**Demo en vivo:** `https://TU_USUARIO.github.io/TU_REPO/`

---

## Estructura del proyecto

```
PORTFOLIO/
├── index.html          ← Sitio completo (una sola página)
├── assets/
│   ├── css/
│   │   └── style.css   ← Sistema de diseño completo
│   └── js/
│       └── main.js     ← Interactividad y screenshots
└── README.md
```

---

## Publicar en GitHub Pages (paso a paso)

### Paso 1 — Crear el repositorio

1. Ve a [github.com](https://github.com) y haz login (o crea una cuenta si no tienes).
2. Clic en **"New repository"**.
3. Nombre del repositorio:
   - Para que la URL sea `tunombre.github.io` usa exactamente: `TU_USUARIO.github.io`
   - Para una URL como `tunombre.github.io/portfolio` usa cualquier nombre, por ejemplo: `portfolio`
4. Deja el repositorio como **Public**.
5. No marques "Add a README" (ya tienes uno).
6. Clic en **"Create repository"**.

### Paso 2 — Subir los archivos

**Opción A — Sin Git (más sencilla):**
1. En la página del repositorio vacío, clic en **"uploading an existing file"**.
2. Arrastra toda la carpeta `PORTFOLIO` o los archivos `index.html`, `assets/` completo.
3. Clic en **"Commit changes"**.

**Opción B — Con Git (recomendada):**
```bash
# Abre una terminal en la carpeta PORTFOLIO
cd "C:\Users\Lenovo\Downloads\PORTFOLIO"

git init
git add .
git commit -m "feat: primer commit del portfolio"
git branch -M main
git remote add origin https://github.com/TU_USUARIO/TU_REPO.git
git push -u origin main
```

### Paso 3 — Activar GitHub Pages

1. En el repositorio, ve a **Settings** (⚙️).
2. En el menú lateral, clic en **"Pages"**.
3. En "Branch", selecciona `main` y carpeta `/root`.
4. Clic en **Save**.
5. Espera ~2 minutos y tu sitio estará vivo en:
   - `https://TU_USUARIO.github.io/TU_REPO/`

---

## Personalización pendiente

### Añadir foto de perfil (opcional)

1. Coloca tu foto en `assets/img/foto.jpg`.
2. En `index.html`, dentro de la sección `#sobre-mi`, añade antes del texto:
   ```html
   <img src="assets/img/foto.jpg" alt="Javier Rodríguez" class="about__photo" />
   ```
3. En `style.css`, añade:
   ```css
   .about__photo {
     width: 180px; height: 180px;
     border-radius: 50%;
     object-fit: cover;
     border: 4px solid var(--lavender-light);
     box-shadow: var(--shadow-md);
   }
   ```

### Añadir LinkedIn y GitHub

En `index.html`, en la sección `#contacto`, descomenta y rellena:
```html
<div class="contact__socials reveal">
  <a href="https://linkedin.com/in/TU_PERFIL" target="_blank" rel="noopener" class="social-link">LinkedIn ↗</a>
  <a href="https://github.com/TU_USUARIO"     target="_blank" rel="noopener" class="social-link">GitHub ↗</a>
</div>
```

### Añadir capturas manuales de proyectos

Si quieres capturas reales propias en vez de las auto-generadas:
1. Guarda las capturas en `assets/img/projects/`.
2. En el artículo del proyecto en `index.html`, reemplaza el `<img>` de screenshot:
   ```html
   <img class="project-card__screenshot loaded"
        src="assets/img/projects/masa-zaragallada.jpg"
        alt="Masa e Zaragallada" />
   ```
3. Elimina el `data-preview-url` del `<article>` para que no llame a la API.

---

## Cómo funcionan los pantallazos automáticos

Los 3 proyectos con URL de web pública (Masa e Zaragallada, Habitar o Baleiro, O Marisquiño) **cargan automáticamente** una captura de pantalla en tiempo real usando la API gratuita de [Microlink.io](https://microlink.io/). No requiere configuración adicional.

Los proyectos con enlaces de Google Drive muestran un placeholder ilustrado con gradiente pastel acorde a la categoría.

---

## Actualizar el sitio

Cada vez que hagas cambios locales:
```bash
git add .
git commit -m "update: descripción del cambio"
git push
```
Los cambios se reflejan en la web en ~1 minuto.

---

*Generado con GitHub Copilot · 2026*
