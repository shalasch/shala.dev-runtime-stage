# runtime-stage

Portfolio of Shala Neves — operational infrastructure designer and builder.

Built with React + Vite. No framework, no CMS. Everything is code.


## Stack

- React 18 + Vite
- Framer Motion — scene transitions and morphing containers
- simplex-noise — animated wavy background
- Formspree — contact form delivery

## Structure

```
src/
├── App.jsx                  # All sections and layout
├── HeroRampV2.jsx           # Hero demo — 5 animated scenes
├── components/
│   ├── AnimatedWordmark.jsx # Particle wordmark animation
│   ├── WavyBackground.jsx   # Canvas wave effect
│   └── ...
├── scenes/                  # Hero scene content (Lead, DB, CRM, Calendar)
├── panels/                  # Section demo panels
└── sections/                # Remaining page sections
```

## Getting started

```bash
npm install
npm run dev
```

## Contact form

The contact form uses [Formspree](https://formspree.io). To activate it:

1. Create an account at formspree.io
2. Register a new form with your email
3. Replace `YOUR_FORM_ID` at the top of `App.jsx` with your form ID

```js
const FORMSPREE_ID = 'YOUR_FORM_ID'
```

## Build

```bash
npm run build
npm run preview
```

---

Shala Neves · [shala.dev](https://shala.dev)
