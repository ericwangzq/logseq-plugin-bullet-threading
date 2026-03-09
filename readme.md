# Logseq Plugin Bullet Threading

Add bullet threading to your active blocks in Logseq.

![](./logo.png)

## Install on a New Machine

1. Install Node.js and `pnpm`.
2. Clone this repo:

```bash
git clone https://github.com/ericwangzq/logseq-plugin-bullet-threading.git
cd logseq-plugin-bullet-threading
```

3. Install dependencies and build:

```bash
pnpm install
pnpm build
```

4. In Logseq, open `Plugins` -> `Load unpacked plugin`.
5. Select this repository root directory.

Logseq loads the plugin from `dist/index.html`, so `pnpm build` is required after cloning or pulling changes.

## Update on an Existing Machine

```bash
git pull
pnpm install
pnpm build
```

Then reload the plugin from the Logseq plugins page.

## Development

```bash
pnpm dev
```

Useful checks:

```bash
pnpm lint
pnpm build
```

## Settings

![](./settings.png)

## How it works

This plugin now ships its bullet-threading styles directly in the plugin bundle, with extra patches for newer Logseq versions.

# Issues

Please report issues in this repository.
