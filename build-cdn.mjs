import * as esbuild from "esbuild";

const shared = {
  entryPoints: ["tinymist/index.ts"],
  bundle: true,
  minify: true,
  sourcemap: true,
  target: "es2020",
  loader: { ".wasm": "binary" },
  logLevel: "info",
};

// ESM bundle — for <script type="module"> or import from CDN
await esbuild.build({
  ...shared,
  format: "esm",
  outfile: "cdn/typst-editor.esm.js",
});

// IIFE bundle — exposes window.TinymistEditor global
await esbuild.build({
  ...shared,
  format: "iife",
  globalName: "TinymistEditor",
  outfile: "cdn/typst-editor.iife.js",
});

console.log("CDN bundles built successfully.");
