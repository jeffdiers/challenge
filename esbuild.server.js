const esbuild = require("esbuild");

esbuild
  .build({
    entryPoints: ["./framework/server/index.js"],
    outfile: "dist/server.js",
    bundle: true,
    minify: true,
    sourcemap: process.env.NODE_ENV === "production" ? false : true,
    platform: "node",
    target: "node14",
    define: {
      "process.env.NODE_ENV": `"${process.env.NODE_ENV || "development"}"`,
    },
  })
  .catch(() => process.exit(1));
