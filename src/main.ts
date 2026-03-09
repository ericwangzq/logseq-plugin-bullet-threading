import "@logseq/libs";
import { logseq as PL } from "../package.json";
import semver from 'semver';

const BASE_CSS = `
:root {
  --ls-block-bullet-active-color: var(
    --ls-block-bullet-threading-active-color-overwrite,
    #1f78b4
  );
  --ls-block-bullet-threading-width: var(
    --ls-block-bullet-threading-width-overwrite,
    1px
  );
}

.block-control {
  z-index: 1;
}

.block-children {
  border-left-color: var(--ls-guideline-color);
  border-left-width: var(--ls-block-bullet-threading-width) !important;
}

.block-children-container {
  position: relative;
}

.block-children-left-border {
  z-index: 1;
  position: absolute;
  height: 100%;
  width: 4px;
  padding-right: 0px;
  border-radius: 2px;
  background-color: transparent;
  left: -1px;
  transition: background-color 0.2s;
}

.block-children-left-border:hover {
  background-color: var(--ls-block-bullet-active-color);
}

.block-content-wrapper {
  position: relative;
  overflow-x: visible !important;
}

.bullet-container {
  height: 14px !important;
  width: 14px !important;
  position: relative;
  transform: translate(1px, -1px);
}

.ls-block .bullet {
  background-color: var(--ls-block-bullet-active-color);
  box-shadow: 0 0 0 1px var(--ls-block-bullet-active-color);
}

.ls-block div.block-control-wrap {
  position: relative;
  height: 26px !important;
}

.ls-block > .items-baseline {
  align-items: initial;
}

.ls-block:not(:focus-within) .bullet {
  background-color: var(--ls-block-bullet-color);
  transform: scale(1);
  box-shadow: none;
}

.ls-block:not(:focus-within) > .items-baseline {
  align-items: baseline;
}

.ls-block .ls-block > div > div.items-center::before {
  pointer-events: none;
  content: "";
  left: calc(var(--ls-block-bullet-threading-width) * -1);
  right: 20px;
  top: calc(-50% + var(--ls-block-bullet-threading-width) * 0.5 - 1px);
  bottom: 50%;
  position: absolute;
  border-left: var(--ls-block-bullet-threading-width) solid transparent;
  border-bottom: var(--ls-block-bullet-threading-width) solid transparent;
  border-bottom-left-radius: 10px;
}

.ls-block .ls-block:focus-within > div > div.items-center::before {
  border-color: var(--ls-block-bullet-active-color);
}

.ls-block .block-children > .ls-block::before {
  pointer-events: none;
  content: "";
  top: -1rem;
  bottom: 0;
  border-left: var(--ls-block-bullet-threading-width) solid transparent;
  left: calc(var(--ls-block-bullet-threading-width) * -1);
  position: absolute;
}

.ls-block .block-children:focus-within > .ls-block:not(:focus-within)::before {
  border-color: var(--ls-block-bullet-active-color);
}

.ls-block .block-children:focus-within > .ls-block:focus-within ~ .ls-block::before {
  border-color: transparent;
}

.ls-block[haschild] > div > .block-content-wrapper::before {
  pointer-events: none;
  content: "";
  top: 12px;
  bottom: 0;
  left: -21px;
  position: absolute;
  border-left: var(--ls-block-bullet-threading-width) solid transparent;
}

.ls-block[haschild]:focus-within > div > .block-content-wrapper::before {
  border-color: var(--ls-block-bullet-active-color);
}

:is(.embed-block > div, .embed-page) > div > div > div > div.ls-block > div > div.items-center::before {
  border-color: transparent !important;
}

@media (max-width: 640px) {
  .ls-block[haschild] > div > .block-content-wrapper::before {
    left: -11px;
  }
}

.doc-mode div.items-center::before,
.doc-mode div.items-center::after,
.doc-mode .ls-block::before,
.doc-mode .ls-block::after {
  display: none;
}

.doc-mode .block-children {
  border-left-width: 0px !important;
}
`;

function onSettingsChange() {
  let width = logseq.settings?.width ?? 2;
  const color = logseq.settings?.customColor && logseq.settings?.color;
  if (!("" + width).endsWith("px")) {
    width = width + "px";
  }

  const vars: [string, string][] = [
    ["--ls-block-bullet-threading-width-overwrite", width],
  ];

  if (color) {
    vars.push(["--ls-block-bullet-threading-active-color-overwrite", color]);
  }

  const varsString = vars.map((pair) => pair.join(": ") + ";").join("\n");

  logseq.provideStyle({
    key: PL.id + "-vars",
    style: `:root { ${varsString} }`,
  });
}

async function main() {
  onSettingsChange();
  logseq.onSettingsChanged(onSettingsChange);

  logseq.provideStyle({
    key: PL.id + "-styles",
    style: BASE_CSS,
  });

  // patches
  const appVersion = await logseq.App.getInfo('version')
  if (
    appVersion && semver.valid(appVersion) &&
    semver.gt(appVersion, '0.9.6')) {
    logseq.provideStyle(`
      .bullet-container {
        position: relative;
        z-index: 2;
      }

      .bullet-container::before {
        content: "";
        position: absolute;
        width: 8px;
        height: 8px;
        top: 3px;
        left: 3px;
        border-radius: 999px;
        background-color: var(--ls-block-bullet-color);
        z-index: 3;
      }

      .bullet-container::after {
        content: "";
        position: absolute;
        inset: 1px;
        border-radius: 999px;
        background-color: var(--ls-primary-background-color);
        z-index: 2;
      }

      .bullet-container .bullet {
        display: block;
        position: relative;
        z-index: 1;
        width: 8px;
        height: 8px;
        margin: 3px;
        border-radius: 999px;
        font-size: 1rem;
        border-width: 0 !important;
        border-color: transparent !important;
        background-color: transparent !important;
        transform: scale(1) !important;
        opacity: 1 !important;
        box-shadow: none !important;
      }

      .ls-block:not(:focus-within) .bullet-container .bullet {
        border-width: 0 !important;
        border-color: transparent !important;
        background-color: transparent !important;
        box-shadow: none !important;
      }

      .ls-block:focus-within > .block-main-container .bullet-container::before,
      .ls-block:has(.ls-block:focus-within) > .block-main-container .bullet-container::before {
        background-color: var(--ls-block-bullet-active-color) !important;
      }

      .ls-block .ls-block > div > div.block-control-wrap::before,
      .ls-block .block-children > .ls-block::before,
      .ls-block[haschild] > div > .block-content-wrapper::before {
        z-index: 1;
      }

      .ls-block[haschild] > div > .block-content-wrapper::before {
        left: -13px;
      }
      
      .ls-block .ls-block > div > div.block-control-wrap::before {
        right: 16px;
      }
      
      .bullet-container.as-order-list {
        width: 22px !important;
      }
      
      .ls-block.is-order-list[haschild] > div > .block-content-wrapper::before {
        left: -15px;
        top: 24px;
      }
      
      .ls-block .block-children > .ls-block.is-order-list::before {
        top: -0.2rem;
      }
      
      .ls-block .ls-block.is-order-list > div > div.block-control-wrap::before {
        right: 22px;
        top: calc(-50% + 0.5rem);
      }
    `)
  }
}

logseq
  .useSettingsSchema([
    {
      key: "width",
      default: "2px",
      description: "Width of the bullet threading.",
      title: "Width of the bullet threading path",
      type: "enum",
      enumPicker: "radio",
      enumChoices: ["1px", "2px", "3px"],
    },
    {
      key: "customColor",
      default: false,
      description: "Overwrite threading path color?",
      title: "Whether or not to overwrite threading path color.",
      type: "boolean",
    },
    {
      key: "color",
      default: "",
      description:
        "Color of the bullet threading. You need to enable 'Overwrite threading path color?' first",
      title: "Color of the bullet threading path.",
      type: "string",
      inputAs: "color",
    },
  ])
  .ready(main)
  .catch(console.error);
