# Félix Martínez — Portfolio

Personal portfolio built with React, TypeScript and Vite. Spanish and English, selected projects, hardware experiments, and Founder & CPO at Build Pa’l Norte.

## Development

`npm install` then `npm run dev`.

## Validation and publishing

- `npm run lint`
- `npm run build` (checks TypeScript before bundling)
- `npm run preview`
- In another terminal, `npm run check:preview` checks public asset responses without sending messages.

Publish the generated `dist` directory through the project's existing hosting provider.

## Content

- Project records and links: `src/components/Projects.tsx`.
- Profile and community role: `Hero.tsx`, `AboutMe.tsx`, `Events.tsx`, and `CyberTerminal.tsx`.
- Contact uses the existing Web3Forms configuration. Automated UI checks must intercept requests and must not send real messages.
- AuraFit and Family Weather images are labeled visual concepts. KronoBook and Gazpacho’s images are site screenshots.
- Project inspectors, the mobile menu, and the terminal use native modal dialogs for focus containment and Escape handling.
- The lab and terminal load on demand; decorative canvas animation respects reduced motion and pauses out of view.

The existing resume PDF is preserved. Publishing source changes to GitHub does not by itself confirm an update at felixmf.lat.
