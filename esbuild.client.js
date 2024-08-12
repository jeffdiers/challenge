const esbuild = require("esbuild");

esbuild
  .build({
    entryPoints: ["./framework/client/index.js"],
    outfile: "dist/client.js",
    bundle: true,
    minify: true,
    sourcemap: process.env.NODE_ENV === "production" ? false : true,
    platform: "browser",
    target: "es2020",
    define: {
      "process.env.NODE_ENV": `"${process.env.NODE_ENV || "development"}"`,
    },
  })
  .catch(() => process.exit(1));
