# Repository Guidelines

## Project Structure & Module Organization
This plugin is intentionally small. Core logic lives in [`src/main.ts`](./src/main.ts), which initializes the Logseq plugin, syncs settings, fetches CSS, and applies version-specific patches. Static assets such as [`logo.png`](./logo.png) and [`settings.png`](./settings.png) live at the repository root and are bundled into releases. Build output goes to `dist/` and should be treated as generated artifacts. CI and release automation live in `.github/workflows/main.yml` and `release.config.js`.

## Build, Test, and Development Commands
Use `pnpm`; `preinstall` blocks other package managers.

- `pnpm install`: install dependencies.
- `pnpm dev`: start Vite with Logseq plugin HMR for local plugin development.
- `pnpm build`: run TypeScript checks and produce the production bundle in `dist/`.

There is no dedicated lint script yet, but ESLint is configured in `.eslintrc.json`. Run `pnpm eslint src --ext .ts` before opening a PR if you change TypeScript code.

## Coding Style & Naming Conventions
Write TypeScript with `strict` mode compatibility. Match the existing style in `src/main.ts`: 2-space indentation is not enforced here, so preserve surrounding formatting, prefer `const`, and keep helper functions small and file-local unless reuse is justified. Use `camelCase` for variables and functions, `PascalCase` for interfaces like `SavedData`, and `UPPER_CASE` for constants like `KEY`. Prefer double quotes for local imports to stay consistent with most of the file.

## Testing Guidelines
This repository does not currently include an automated test suite. At minimum, validate changes by running `pnpm build` and manually loading the plugin in Logseq to confirm settings, CSS injection, and version-specific patches still work. If you add tests later, place them under `tests/` or alongside source files as `*.test.ts`.

## Commit & Pull Request Guidelines
Commits follow Conventional Commits because `semantic-release` drives versioning and changelogs. Use subjects like `fix: handle missing release metadata` or `chore: update dependencies`; release commits are generated automatically. PRs should include a short problem statement, the behavioral change, manual verification steps, and screenshots for UI-visible changes in Logseq.

## Release & Configuration Notes
Releases are built from the `master` branch by GitHub Actions on Node 16 with `pnpm build`, then zipped with `dist/`, `readme.md`, `LICENSE`, `package.json`, and root PNG assets. Avoid hardcoding environment-specific paths or secrets in plugin code.
