import { Plugin, defineConfig } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";
import UnoCSS from "unocss/vite";
import extractorSvelte from '@unocss/extractor-svelte'
import { OutputChunk, OutputAsset } from "rollup";
import { existsSync, writeFileSync } from "fs";
import { resolve } from "path";

const scriptName = "locaties.user.js";
const styleName = "locaties.user.css";

export default defineConfig({
  plugins: [
    UnoCSS({
      extractors: [
        extractorSvelte(),
      ],
    }),
    svelte(),
    userScriptPlugin(),
    loadStyleSheetsPlugin(),
  ],
  build: {
    emptyOutDir: false,
    rollupOptions: {
      input: "src/main.ts",
      output: {
        entryFileNames: scriptName,
        assetFileNames: styleName,
      }
    },
  },
})

/**
 * This plugin generates a user script from the bundle by prepending the script with a header and incorporating style using GM_addStyle.
 */
function userScriptPlugin(): Plugin {
  return {
    name: "user-script",
    apply: "build",
    enforce: "post",
    generateBundle(_, bundle) {
      const {
        name,
        version,
        description,
      } = require("./package.json");

      const script = bundle[scriptName] as OutputChunk;
      const style = bundle[styleName] as OutputAsset;

      const styleText = style.source;

      script.code = `
// ==UserScript==
// @name         ${name}
// @namespace    https://locaties.nl
// @match        https://www.locaties.nl/*
// @grant        GM_addStyle
// @version      ${version}
// @author       gllms
// @description  ${description}
// @run-at       document-idle
// @icon         https://www.google.com/s2/favicons?sz=64&domain=locaties.nl
// ==/UserScript==

GM_addStyle(\`${styleText.toString().replace(/\\/g, "\\\\")}\`);

${script.code}
      `.trim();

      delete bundle[styleName];
    },
  };
}

function loadStyleSheetsPlugin(): Plugin {
  return {
    name: "load-stylesheets",
    apply: "serve",
    enforce: "pre",
    async config(_, { command }) {
      console.log("load-stylesheets");

      const stylePath = resolve(__dirname, "dist", "style.css");

      if (existsSync(stylePath))
        return;

      fetch("https://locaties.nl/nonexistent")
        .then(res => res.text())
        .then(async text => {
          const urls = [...text.matchAll(/<link rel="stylesheet" href="(.*?)"/g)]
            .map(arr => "https://locaties.nl" + arr[1]);

          let str = "";

          for (const url of urls) {
            await fetch(url)
              .then(res => res.text())
              .then(text => str += text);
          }

          writeFileSync(stylePath, str);
        })
    },
  };
}