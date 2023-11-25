import { Plugin, defineConfig } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";
import UnoCSS from "unocss/vite";
import extractorSvelte from '@unocss/extractor-svelte'
import { OutputChunk, OutputAsset } from "rollup";

const scriptName = "locaties.user.js";
const styleName = "locaties.user.css";

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
// @version      ${version}
// @description  ${description}
// @match        https://www.locaties.nl/*
// @grant        GM_addStyle
// @run-at       document-idle
// ==/UserScript==

GM_addStyle(\`${styleText.toString().replace(/\\/g, "\\\\")}\`);

${script.code}
      `.trim();

      // emit a test html file for development
      this.emitFile({
        type: "prebuilt-chunk",
        fileName: "index.html",
        code: `
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
  <link rel="stylesheet" href="style.css" />
  <link href="https://fonts.googleapis.com/icon?family=Material+Icons+Outlined" rel="stylesheet">
</head>

<body>
  <div class="locaties-test"></div>

  <script>
    function GM_addStyle(css) {
      const style = document.createElement('style');
      style.textContent = css;
      document.head.append(style);
    }
  </script>
  <script>
    ${script.code}
  </script>
</body>

</html>
        `
      });

      delete bundle[styleName];
    },
  };
}

export default defineConfig({
  plugins: [
    UnoCSS({
      extractors: [
        extractorSvelte(),
      ],
    }),
    svelte(),
    userScriptPlugin(),
  ],
  build: {
    minify: false,
    emptyOutDir: false,
    rollupOptions: {
      input: "src/main.ts",
      output: {
        entryFileNames: scriptName,
        assetFileNames: styleName,
        manualChunks: undefined,
      }
    },
  },
})