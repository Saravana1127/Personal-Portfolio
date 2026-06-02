# Saravana Vel Narayanan — Portfolio Website

A clean, responsive, and professional personal portfolio website built with vanilla HTML, CSS, and JavaScript. No frameworks or build tools required.

## 📁 File Structure

```
Personal Portfolio/
├── index.html              # Main single-page portfolio
├── css/
│   └── styles.css          # Complete stylesheet with CSS variables & BEM naming
├── js/
│   └── main.js             # Modular JavaScript (nav, forms, animations)
├── assets/
│   ├── favicon.svg          # SVG favicon
│   └── SaravanavelCV.pdf    # Downloadable resume (TODO: add your PDF)
├── template.md              # Original requirements
├── portfolioidea.md         # Portfolio ideas
└── README.md                # This file
```

## 🚀 Deployment

### GitHub Pages

1. Create a new GitHub repository (e.g., `portfolio`)
2. Push this entire folder to the repository:
   ```bash
   git init
   git add .
   git commit -m "Initial portfolio site"
   git branch -M main
   git remote add origin https://github.com/saravanaveln/portfolio.git
   git push -u origin main
   ```
3. Go to **Settings → Pages** in your repository
4. Under **Source**, select `main` branch and `/ (root)` folder
5. Click **Save** — your site will be live at `https://saravanaveln.github.io/portfolio`

### Netlify

1. Go to [netlify.com](https://www.netlify.com/) and sign up/log in
2. Click **"Add new site" → "Deploy manually"**
3. Drag and drop this project folder
4. Your site will be live instantly with a Netlify URL
5. (Optional) Configure a custom domain in **Site settings → Domain management**

### Local Preview

Simply open `index.html` in any modern browser, or use a local server:

```bash
# Using Python
python -m http.server 8000

# Using Node.js (npx)
npx serve .
```

## ✏️ Placeholders to Replace

| What | Where | Current Placeholder |
|------|-------|-------------------|
| Headshot photo | `index.html` Hero section | SVG user icon placeholder |
| Resume PDF | `assets/SaravanavelCV.pdf` | File not included — add your PDF |
| Project 1 GitHub | `index.html` Projects section | `https://github.com/saravanaveln/crop-disease-prediction` |
| Project 2 GitHub | `index.html` Projects section | `https://github.com/saravanaveln/emotion-detection` |
| Project 3 (template) | `index.html` Projects section | `https://github.com/saravanaveln/PROJECT-NAME` |
| GitHub profile | Footer | `https://github.com/saravanaveln` |
| OG image | `<head>` meta tags | `assets/og-image.png` |

## 🎨 Theming

All colors are defined as CSS custom properties in `css/styles.css` at the top. To change the theme, simply update the `:root` variables:

```css
:root {
  --color-primary: #0f7b6c;     /* Main teal accent */
  --color-accent: #1e3a5f;      /* Navy heading color */
  --color-bg: #f8fafb;          /* Page background */
  /* ... more variables */
}
```

## ✅ Acceptance Criteria Checklist

- [x] Vanilla HTML, CSS, JavaScript only (no frameworks)
- [x] Responsive, mobile-first design
- [x] Semantic HTML (header, main, nav, section, article, footer)
- [x] CSS variables and BEM-like class naming
- [x] Modular, unobtrusive JavaScript
- [x] Sticky header with smooth scroll navigation
- [x] Hero with name, title, summary, headshot placeholder, CTA buttons
- [x] About section with education, location, CGPA info
- [x] Skills with visual progress bars (Frontend + Backend groups)
- [x] Projects with card layout, tech tags, GitHub links, and filter
- [x] Experience timeline with detailed responsibilities
- [x] Certificates section
- [x] Contact form with client-side validation and honeypot spam protection
- [x] Downloadable resume PDF link
- [x] SEO meta tags and Open Graph tags
- [x] SVG icons for social links
- [x] Alt text and ARIA labels for accessibility
- [x] Keyboard-accessible navigation
- [x] Inline code comments
- [x] Lightweight page weight (no external heavy libraries)
- [x] Deployment instructions (GitHub Pages + Netlify)
- [x] Placeholder GitHub URLs clearly marked with TODO
