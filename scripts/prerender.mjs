/**
 * Build-time SSG prerender — runs AFTER `vite build`.
 * 1) SSR-builds src/entry-server.jsx → dist/server
 * 2) Renders each public route to HTML
 * 3) Injects into dist/index.html at <!--app-html-->
 * 4) Writes dist/<route>/index.html for subpages
 * 5) Deletes dist/server (not needed at runtime)
 */
import { build } from "vite";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const distDir = path.join(root, "dist");
const serverDir = path.join(distDir, "server");
const SITE_URL = "https://www.innovatesec.com";

/** All public crawlable routes for this project */
const ROUTES = [
  "/",
  "/our-story",
  "/about-us",
  "/services",
  "/services/equity-market-and-derivatives",
  "/services/mutual-funds-and-bonds",
  "/services/depository-services",
  "/services/ncd",
  "/services/fd",
  "/services/ipo-submission-services",
  "/directors",
  "/online-desk",
  "/compliances",
  "/compliances/forms",
  "/compliances/policies",
  "/compliances/investor-charters",
  "/compliances/compliance-data",
  "/compliances/mf-compliance",
  "/compliances/mf-compliance/registered-details",
  "/compliances/mf-compliance/regulatory-registrations",
  "/compliances/mf-compliance/disclaimer",
  "/compliances/mf-compliance/commission-disclosure",
  "/compliances/mf-compliance/investor-grievance-redressal",
  "/compliances/mf-compliance/investor-charter",
  "/compliances/mf-compliance/rights-obligations",
  "/compliances/mf-compliance/privacy-policy",
  "/compliances/mf-compliance/terms-conditions",
  "/compliances/mf-compliance/fund-selection-policy",
  "/compliances/mf-compliance/amfi-code-of-conduct",
  "/compliances/mf-compliance/our-empanelments",
  "/compliances/mf-compliance/important-links",
  "/compliances/mf-compliance/sid-sai-kim",
  "/disclaimer",
  "/privacy-policy",
  "/advisiory-for-investors",
  "/investor-complaints-disclosure",
  "/sitemap",
];

function absoluteUrl(route) {
  if (route === "/") return `${SITE_URL}/`;
  return `${SITE_URL}${route}`;
}

function injectAppHtml(template, appHtml, route) {
  if (!template.includes("<!--app-html-->")) {
    throw new Error(
      'dist/index.html is missing <!--app-html--> placeholder inside #root',
    );
  }

  let html = template.replace("<!--app-html-->", appHtml);
  const canonical = absoluteUrl(route);

  html = html.replace(
    /<link\s+rel="canonical"\s+href="[^"]*"\s*\/?>/i,
    `<link rel="canonical" href="${canonical}">`,
  );
  html = html.replace(
    /<meta\s+property="og:url"\s+content="[^"]*"\s*\/?>/i,
    `<meta property="og:url" content="${canonical}">`,
  );
  html = html.replace(
    /<meta\s+property="twitter:url"\s+content="[^"]*"\s*\/?>/i,
    `<meta property="twitter:url" content="${canonical}">`,
  );

  return html;
}

function writeRouteHtml(route, html) {
  if (route === "/") {
    const outFile = path.join(distDir, "index.html");
    fs.writeFileSync(outFile, html, "utf8");
    return outFile;
  }

  // Emit path.html (not path/index.html) so Vite preview & static hosts
  // resolve /privacy-policy → privacy-policy.html without a trailing slash.
  const segments = route.split("/").filter(Boolean);
  const fileName = `${segments.pop()}.html`;
  const outDir =
    segments.length > 0 ? path.join(distDir, ...segments) : distDir;
  fs.mkdirSync(outDir, { recursive: true });
  const outFile = path.join(outDir, fileName);
  fs.writeFileSync(outFile, html, "utf8");
  return outFile;
}

function findServerEntry() {
  const candidates = [
    path.join(serverDir, "entry-server.js"),
    path.join(serverDir, "entry-server.mjs"),
    path.join(serverDir, "entry-server.cjs"),
  ];
  for (const file of candidates) {
    if (fs.existsSync(file)) return file;
  }

  // Vite may nest under assets — search once
  if (!fs.existsSync(serverDir)) {
    throw new Error(`SSR outDir missing: ${serverDir}`);
  }
  const stack = [serverDir];
  while (stack.length) {
    const dir = stack.pop();
    for (const name of fs.readdirSync(dir)) {
      const full = path.join(dir, name);
      const stat = fs.statSync(full);
      if (stat.isDirectory()) stack.push(full);
      else if (/entry-server\.(mjs|js|cjs)$/.test(name)) return full;
    }
  }
  throw new Error("Could not find SSR entry-server bundle in dist/server");
}

async function buildServerBundle() {
  console.log("→ SSR-building src/entry-server.jsx → dist/server");
  await build({
    configFile: path.join(root, "vite.config.js"),
    build: {
      ssr: path.join(root, "src/entry-server.jsx"),
      outDir: serverDir,
      emptyOutDir: true,
      sourcemap: false,
      minify: false,
      rollupOptions: {
        onwarn(warning, warn) {
          if (warning.code === "UNUSED_EXTERNAL_IMPORT") return;
          warn(warning);
        },
      },
    },
    logLevel: "warn",
  });
}

async function main() {
  if (!fs.existsSync(path.join(distDir, "index.html"))) {
    throw new Error("dist/index.html not found — run `vite build` first");
  }

  const template = fs.readFileSync(path.join(distDir, "index.html"), "utf8");

  await buildServerBundle();

  const entryPath = findServerEntry();
  const { render } = await import(pathToFileURL(entryPath).href);

  if (typeof render !== "function") {
    throw new Error("SSR module did not export render()");
  }

  console.log(`→ Prerendering ${ROUTES.length} routes…`);

  for (const route of ROUTES) {
    process.stdout.write(`  ${route} … `);
    try {
      const appHtml = render(route);
      if (!appHtml || appHtml.length < 50) {
        throw new Error(`Empty/short HTML (${appHtml?.length ?? 0} chars)`);
      }
      const pageHtml = injectAppHtml(template, appHtml, route);
      const outFile = writeRouteHtml(route, pageHtml);
      console.log(`ok (${appHtml.length} chars) → ${path.relative(root, outFile)}`);
    } catch (err) {
      console.log("FAILED");
      throw err;
    }
  }

  fs.rmSync(serverDir, { recursive: true, force: true });
  console.log("→ Removed dist/server");
  console.log("✓ Prerender complete");
}

main().catch((err) => {
  console.error("\nPrerender failed:\n", err);
  process.exit(1);
});
