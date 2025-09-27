# @moisa/react-compound

A modern, installable React compound-components library. No codegen—just
`pnpm add` and use. Built with TypeScript, Tailwind v4, and tsup. Ships ESM,
CJS, and type definitions. Includes an optional precompiled CSS so apps
without Tailwind still get sensible defaults.

- Package: `@moisa/react-compound`
- Styling: Tailwind v4 (zero-config). Optional compiled CSS bundle.
- Build: tsup (ESM + CJS) with `.d.ts` and sourcemaps
- Lint/Format: ESLint 9 (flat config), Prettier
- Tests: Vitest (recommended; not bundled in the package)

## Install

```bash
pnpm add @moisa/react-compound
```

Peer dependencies:
- react >= 18.2 < 20
- react-dom >= 18.2 < 20

Optional styles:
- If your app does NOT use Tailwind, import the bundled CSS:
```ts
import "@moisa/react-compound/styles";
```
- If your app uses Tailwind v4, you can skip the bundled CSS and style via
  `className` and `data-*` attributes.

## Module outputs

- ESM: `dist/index.mjs`
- CJS: `dist/index.cjs`
- Types: `dist/index.d.ts`
- Styles: `dist/styles/index.css`

Tree-shaking:
- The package is side-effect free except CSS. Only the CSS file is listed in
  `sideEffects` to keep everything else tree-shakeable.

## Development

Prerequisites: pnpm, Node 18+ (Node 20 recommended)

Install:
```bash
pnpm install
```

Build:
```bash
pnpm run build
```

- Compiles Tailwind v4 CSS via `@tailwindcss/cli` to `dist/styles/index.css`
- Bundles TS via tsup into `dist/` (ESM, CJS, d.ts)

Dev (TS watch):
```bash
pnpm run dev
```
If you edit Tailwind CSS (`src/styles/tailwind.css`), re-run:
```bash
pnpm run build:css
```

Test:
```bash
pnpm run test
```

Lint/format:
```bash
pnpm run lint
pnpm run lint:fix
pnpm run format
```

## Tailwind v4 notes

- Zero-config by default. Library CSS entry uses:
  `@import "tailwindcss";`
- The library compiles its own CSS so consumers without Tailwind still get
  baseline styles.
- If your app already uses Tailwind v4, you can skip importing the library CSS.

## ESLint and Prettier

- ESLint 9 flat config targeted at `src/` with React + TS + Hooks + Import
  rules and Prettier compatibility.
- Underscore-prefixed variables/params are treated as intentionally unused via
  `@typescript-eslint/no-unused-vars` settings.

## Publishing

Private registry (restricted) or npm public is supported.

- Private example:
  ```json
  "publishConfig": {
    "access": "restricted",
    "registry": "https://npm.moisa.work/"
  }
  ```
  Publish:
  ```bash
  pnpm run build
  pnpm publish
  ```

- Public npm example:
  ```json
  "publishConfig": {
    "access": "public",
    "registry": "https://registry.npmjs.org/"
  }
  ```
  Publish:
  ```bash
  npm login
  pnpm run build
  pnpm publish
  ```

## License

MIT © moisa
