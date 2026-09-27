# schulte-table

Schulte's training table for skimming (diagonal reading).

An [Angular](https://angular.dev) 22 app that renders a randomly shuffled Schulte table.

## Features

- A fresh random layout on every page load, and on every click of the green **Generate** button.
- Table size from 2 × 2 up to 10 × 10, default 5 × 5.
- Text size as a 16px–42px range selector; the table scales with it and shrinks the digits
  when the viewport is too narrow for the chosen size.

## Development

```bash
npm install
npm start     # dev server on http://localhost:4200
npm test      # unit tests (Vitest)
npm run build # production bundle into dist/
```

Requires Node.js `^22.22.3 || ^24.15.0 || >=26`.

## Deployment

Pushing to `main` builds the app and publishes it to GitHub Pages via
[`.github/workflows/deploy.yml`](.github/workflows/deploy.yml):
<https://asfades.github.io/schulte-table/>

The workflow builds with `--base-href /schulte-table/` because the site is served from a
repository subpath rather than the domain root. If the repository is ever renamed, update
that flag to match.

One-time setup in the repository: **Settings → Pages → Build and deployment → Source →
GitHub Actions**.
