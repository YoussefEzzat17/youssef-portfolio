<div align="center">

# ✦ Youssef Ezzat — Portfolio

**A premium, highly interactive personal portfolio crafted with Angular 18, TailwindCSS, and modern CSS.**

[![Angular](https://img.shields.io/badge/Angular-18-DD0031?style=for-the-badge&logo=angular&logoColor=white)](https://angular.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3-38BDF8?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](LICENSE)

[🌐 Live Demo](https://youssefezzat.dev) · [💼 LinkedIn](https://www.linkedin.com/in/youssef-ezzat17/) · [🐱 GitHub](https://github.com/YoussefEzzat17)

</div>

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Live Demo](#-live-demo)
- [Features](#-features)
- [Sections](#-sections)
- [Tech Stack](#-tech-stack)
- [Architecture](#-architecture)
- [Theming System](#-theming-system)
- [Animations & Effects](#-animations--effects)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
- [Scripts](#-scripts)
- [Author](#-author)

---

## 🌟 Overview

This is Youssef Ezzat's personal developer portfolio — a **production-grade, pixel-perfect** single-page application built with **Angular 18 standalone components**. It showcases my professional work, skills, and background with a premium design language featuring glassmorphism, 3D card carousels, real-time section tracking, smooth micro-animations, and a fully dynamic theming system.

Every component is **performance-optimized**, mobile-first, and built with clean, maintainable code following Angular best practices.

---

## 🚀 Live Demo

> 🌐 **[youssefezzat.dev](https://youssefezzat.dev)** *(update with your deployed URL)*

---

## ✨ Features

### 🎨 Design & UI
| Feature | Details |
|---|---|
| **Premium Dark / Light Modes** | Smooth transition, persisted via `localStorage` |
| **3 Color Themes** | Blue (default), Purple, Green — switchable at runtime |
| **Glassmorphism Cards** | `backdrop-blur`, semi-transparent borders, layered shadows |
| **Responsive Design** | Mobile-first layout — perfect on all screen sizes |
| **Custom Typography** | Display + sans-serif font pairing via Google Fonts |

### 🧭 Navigation
| Feature | Details |
|---|---|
| **Sticky Navbar** | Transparent → frosted glass on scroll using `IntersectionObserver` |
| **Active Section Tracking** | `IntersectionObserver` highlights the current section link in real time |
| **Animated Nav Links** | Hover lifts the link + shows a glowing gradient underline bar |
| **Pulsing Active Dot** | A small CSS-animated dot appears above the current section link |
| **Mobile Side Drawer** | Full-height right-side drawer with slide-in animation |
| **Animated Drawer Bar** | A leading bar grows from 0→24px on mobile link hover/active |

### 🖥️ Hero Section
| Feature | Details |
|---|---|
| **Typing Animation** | Cycles through role titles with realistic typing + deleting |
| **Blinking Cursor** | CSS `border-right` blink animation |
| **3D Laptop Mockup** | Fully CSS-crafted MacBook with keyboard grid, webcam, hinge, trackpad |
| **Floating Effect** | Laptop + hero image gently float with a sinusoidal keyframe animation |
| **Ambient Glow Blobs** | Two blurred radial blobs animate in background |
| **Scroll Indicator** | Bouncing arrow guiding users to the next section |

### 👤 About Section
| Feature | Details |
|---|---|
| **Mouse Parallax** | Hero image responds to mouse movement (desktop only) |
| **Floating Glass Cards** | Angular Developer & Years Experience cards float beside the photo |
| **Reveal-on-Scroll** | Content slides in from left/right as it enters the viewport |
| **Animated Background Blobs** | Three staggered blob shapes animate behind content |

### 🛠 Skills Section
| Feature | Details |
|---|---|
| **3-Row Infinite Marquee** | Three rows of skill icons scroll left/right endlessly |
| **Scroll-Direction Aware** | Marquee direction flips based on scroll direction |
| **Hover to Pause** | Hovering any row pauses that row's animation |
| **Edge Fade Mask** | CSS `mask-image` fades icon rows at left/right edges |
| **Scale on Hover** | Individual skill icons lift and scale on hover |

### 💼 Projects Section
| Feature | Details |
|---|---|
| **3D Card Carousel** | Mouse-parallax container tilt + curved `rotateY` card stacking |
| **Active Card Focus** | Center card elevates with `translateZ(50px)` and glows |
| **Keyboard Navigation** | `←` / `→` arrow keys navigate the carousel |
| **Project Detail Modal** | Full project modal with image, description, features, tags, links |
| **Animated Modal** | Scale-up + fade-in entrance for both overlay and card |
| **Tech Tag Pills** | Styled tags use the current primary theme color |
| **View Details CTA** | Hover overlay on active card image reveals a "View Details" button |
| **Pagination Dots** | Active dot expands + glows to indicate current slide |

### 📅 Experience Section
| Feature | Details |
|---|---|
| **Vertical Timeline** | Alternating left/right cards on desktop, single column on mobile |
| **Icon Types** | Work, Programming, and Graduation icons on each timeline node |
| **Certificate Links** | "View Certificate" link with animated arrow icon |
| **Reveal Animation** | Cards slide in from alternating directions on scroll |

### 📬 Contact Section
| Feature | Details |
|---|---|
| **Reactive Form** | `FormBuilder` with `required`, `email`, and `minLength` validators |
| **Real-time Validation** | Field-level error messages appear on blur/touch |
| **EmailJS Integration** | Sends messages directly from the browser (no backend needed) |
| **Rate Limiting** | 10-second cooldown after sending to prevent spam |
| **Social Preview Cards** | Hovering a social icon shows an animated image preview card |
| **Image Carousel Preview** | Preview card cycles between 3 screenshots automatically |

### 🖱️ Custom Context Menu
| Feature | Details |
|---|---|
| **Right-click Menu** | Replaces the browser's native context menu |
| **Smart Positioning** | Automatically adjusts to avoid viewport overflow |
| **Actions** | Contact, LinkedIn, GitHub, Download CV, Toggle Theme |
| **Glassmorphism Style** | Frosted glass background with smooth appear animation |

---

## 📂 Sections

```
Home → About → Skills → Projects → Experience → Contact
```

| # | Section | Description |
|---|---|---|
| 1 | **Hero** | Introduction, typing animation, 3D laptop mockup, CTA buttons |
| 2 | **About** | Bio, parallax photo, floating badges, stats, animated blobs |
| 3 | **Skills** | Infinite marquee rows of 27+ technology icons |
| 4 | **Projects** | 3D carousel with 4 projects + full-screen detail modal |
| 5 | **Experience** | Vertical timeline of work, training, and education |
| 6 | **Contact** | Validated contact form, social links with preview cards |

---

## 🛠️ Tech Stack

### Core
- **[Angular 18](https://angular.dev)** — Standalone components, signals, `@for`, `@if` control flow
- **[TypeScript 5](https://www.typescriptlang.org)** — Full type safety throughout
- **[TailwindCSS 3](https://tailwindcss.com)** — Utility-first CSS framework
- **[Vanilla CSS](https://developer.mozilla.org/en-US/docs/Web/CSS)** — Animations, keyframes, custom properties

### Key APIs & Techniques
- **Angular Signals** — `signal()`, `computed()`, `update()` for reactive state
- **IntersectionObserver** — Section tracking + scroll reveal
- **requestAnimationFrame** — Skills marquee animation loop
- **EmailJS** — Contact form email delivery (browser-only)
- **CSS Custom Properties** — Runtime theme switching (`--primary-*`, `--bg-*`, `--text-*`)
- **CSS `color-mix()`** — Dynamic opacity blending on theme colors
- **CSS `backdrop-filter`** — Glassmorphism effects
- **`transform-style: preserve-3d`** — 3D card carousel perspective

---

## 🏗️ Architecture

```
src/
├── app/
│   ├── app.ts                        ← Root component (assembles all sections)
│   ├── core/
│   │   ├── models/
│   │   │   └── project.model.ts      ← Project interface
│   │   └── services/
│   │       ├── theme.service.ts      ← Dark/Light/Color theme management
│   │       └── contact.service.ts    ← EmailJS integration
│   ├── features/
│   │   ├── navbar/                   ← Sticky nav, section tracker, mobile drawer
│   │   ├── hero/                     ← Typing effect, 3D laptop, floating elements
│   │   ├── about/                    ← Parallax, floating cards, bio
│   │   ├── skills/                   ← Infinite marquee (rAF-based)
│   │   ├── projects/                 ← 3D carousel, modal, navigation
│   │   ├── experience/               ← Vertical timeline
│   │   ├── contact/                  ← Reactive form, social previews
│   │   └── footer/                   ← Copyright
│   └── shared/
│       ├── components/
│       │   ├── button/               ← Reusable button with variants
│       │   ├── modal/                ← Generic modal wrapper
│       │   └── custom-context-menu/  ← Right-click context menu
│       └── directives/
│           ├── reveal.directive.ts   ← Scroll-reveal via IntersectionObserver
│           └── magnetic.directive.ts ← Magnetic button hover effect
└── styles.css                        ← Global design tokens + all component CSS
```

### Design System

All component-level `styles: []` have been extracted into `src/styles.css`, organized into **17 clearly commented sections**:

```css
/* Section structure in styles.css:
   1.  CSS Custom Properties (Design Tokens)
   2.  Base Styles
   3.  Utility Components
   4.  Host Display Resets
   5.  Navbar — Desktop Links
   6.  Navbar — Mobile Drawer Links
   7.  Navbar — Drawer Animations
   8.  Hero — Keyboard Grid Pattern
   9.  Context Menu — Appear Animation
   10. Logo / Brand Animations
   11. Hero — Floating & Blob Animations
   12. Hero — 3D Laptop Shadow & Glow
   13. Skills — Marquee Scroll
   14. Projects — Tags & View-Details Button
   15. Projects — Modal Animations
   16. Contact / Hero — Cursor Blink
   17. Footer — Floating Card Animation */
```

---

## 🎨 Theming System

The portfolio supports **2 modes × 3 colors = 6 combinations**, all switchable at runtime with zero page reload.

### Dark / Light Mode
Controlled by the `ThemeService` which sets `data-theme="dark|light"` on `<html>`. Persisted in `localStorage`.

### Color Themes
Set via `data-color="blue|purple|green"` on `<html>`:

| Token | Blue (default) | Purple | Green |
|---|---|---|---|
| `--primary-400` | `#60a5fa` | `#c084fc` | `#4ade80` |
| `--primary-500` | `#3b82f6` | `#a855f7` | `#22c55e` |
| `--primary-600` | `#2563eb` | `#9333ea` | `#16a34a` |

All animations, borders, shadows, and glows reference these tokens — switching a color theme instantly updates **every visual element** across the app.

---

## ✨ Animations & Effects

| Animation | Technique |
|---|---|
| Typing effect | `setTimeout` loop with phrase cycling |
| Blinking cursor | CSS `border-right` + `step-end` keyframe |
| Infinite marquee | `requestAnimationFrame` position loop with wrap math |
| Scroll direction flip | `window:scroll` listener with delta comparison |
| 3D carousel | CSS `perspective` + `translateZ` / `rotateY` via `[style]` binding |
| Mouse parallax (about) | Normalized `mousemove` coordinates → `translate` |
| Section reveal | `IntersectionObserver` adds `.active` class for CSS transitions |
| Active nav tracking | `IntersectionObserver` with `rootMargin` on each section |
| Floating elements | Sinusoidal `@keyframes` with `transform: translateY` |
| Ambient blobs | `@keyframes blob` with `translate + scale` looping |
| Context menu appear | `scale(0.95) → scale(1)` with cubic-bezier easing |
| Modal entrance | `scale(0.95) opacity(0) → scale(1) opacity(1)` |
| Drawer slide-in | `translateX(100%) → translateX(0)` |
| Dot pulse (navbar) | `opacity + box-shadow` pulsing keyframe |
| Logo lean | Infinite alternating `rotate(-12deg)` |
| Nav underline bar | `scaleX(0) → scaleX(1)` from center |

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** ≥ 18.x
- **npm** ≥ 9.x
- **Angular CLI** ≥ 18.x

```bash
npm install -g @angular/cli
```

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/YoussefEzzat17/portfolio.git
cd portfolio

# 2. Install dependencies
npm install

# 3. Start the development server
npm start
# or
ng serve --open
```

The app will be available at **[http://localhost:4200](http://localhost:4200)**.

---

## 📜 Scripts

| Command | Description |
|---|---|
| `npm start` | Start the dev server at `localhost:4200` with hot reload |
| `npm run build` | Build the production bundle to `dist/` |
| `npm run watch` | Build in watch mode for continuous development |
| `npm test` | Run unit tests via Karma |
| `ng lint` | Run ESLint across the project |
| `ng generate component` | Scaffold a new component |

---

## 📸 Preview

| Dark Mode | Light Mode |
|---|---|
| *(screenshot)* | *(screenshot)* |

> Add screenshots to the `/public` directory and update the paths above.

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to open a [GitHub Issue](https://github.com/YoussefEzzat17/portfolio/issues) or submit a Pull Request.

---

## 📄 License

This project is licensed under the **MIT License** — see the [LICENSE](LICENSE) file for details.

---

## 👨‍💻 Author

<div align="center">

**Youssef Ezzat**
*Frontend Developer — Angular · React · TypeScript*

[![LinkedIn](https://img.shields.io/badge/LinkedIn-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/youssef-ezzat17/)
[![GitHub](https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/YoussefEzzat17)
[![Email](https://img.shields.io/badge/Email-EA4335?style=for-the-badge&logo=gmail&logoColor=white)](mailto:ezzatyoussef79@gmail.com)

</div>

---

<div align="center">

Made with ❤️ by **Youssef Ezzat** · Powered by **Angular 18**

⭐ If you find this project useful, please give it a star!

</div>