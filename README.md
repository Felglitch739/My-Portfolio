# Félix Martínez — Portfolio

Personal portfolio built with React, TypeScript and Vite. Spanish and English, selected projects, hardware experiments, and Founder & CPO at Build Pa’l Norte.

## Development

`npm install` then `npm run dev`.

## Validation and publishing

- `npm run lint`
- `npm run test:pool` (requires Node.js 22.18+ for native TypeScript support)
- `npm run build` (checks TypeScript before bundling)
- `npm run preview`
- In another terminal, `npm run check:preview` checks public asset responses without sending messages.

Publish the generated `dist` directory through the project's existing hosting provider.

## Content

- Project records and links: `src/components/Projects.tsx`.
- Profile and community role: `Hero.tsx`, `AboutMe.tsx`, `Events.tsx`, and `CyberTerminal.tsx`.
- Contact uses the existing Web3Forms configuration. Automated UI checks must intercept requests and must not send real messages.
- The original Nothing-inspired dot typography, red accents, tilt cards, cursor light, hardware core, typewriter, floating elements, and scroll parallax are retained.
- Project inspectors, the mobile menu, and the terminal use native modal dialogs for focus containment and Escape handling.
- The 8-ball lab has a full 15-ball rack, aim preview, touch and keyboard controls, shot power, pocket tracking, scratches, and a solo challenge to pot the 8 last. Physics runs at a fixed timestep; the table pauses while hidden or out of view. Decorative motion respects reduced-motion preferences.
- Public contact email: `felix.martinez04@utrgv.edu`.

The existing resume PDF is preserved. Publishing source changes to GitHub does not by itself confirm an update at felixmf.lat.
