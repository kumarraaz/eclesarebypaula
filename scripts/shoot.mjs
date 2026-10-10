/**
 * Visual / accessibility QA pass.
 *
 * Screenshots every route at desktop and mobile widths, and reports:
 *   - console errors and uncaught exceptions
 *   - non-2xx responses
 *   - horizontal overflow (naming the offending elements)
 *   - <img> without an alt attribute
 *
 *   node scripts/shoot.mjs [baseUrl] [outDir] [--full]
 *
 * Examples:
 *   npm run build && npx next start -p 3000
 *   node scripts/shoot.mjs http://127.0.0.1:3000 ./qa-shots
 *
 *   # a sub-path preview build (see prepare-preview.sh)
 *   node scripts/shoot.mjs http://127.0.0.1:3400/site ./qa-shots
 *
 * Requires playwright: `npm i -D playwright && npx playwright install chromium`
 * (set CHROMIUM_PATH if you already have a Chromium elsewhere).
 */
import { chromium } from "playwright";
import { mkdirSync } from "node:fs";

const base = (process.argv[2] ?? "http://127.0.0.1:3000").replace(/\/$/, "");
const outDir = process.argv[3] ?? "./qa-shots";
const fullPage = process.argv.includes("--full");

const routes = [
  ["home", "/"],
  ["weddings", "/weddings/"],
  ["spanish", "/weddings/spanish-weddings/"],
  ["french", "/weddings/french-inspired-weddings/"],
  ["indian", "/weddings/indian-weddings/"],
  ["services", "/services/"],
  ["portfolio", "/portfolio/"],
  ["about", "/about/"],
  ["contact", "/contact/"],
  ["privacy", "/privacy/"],
  ["notfound", "/this-route-does-not-exist"],
];

const viewports = [
  ["desktop", { width: 1440, height: 900 }],
  ["mobile", { width: 390, height: 844 }],
];

mkdirSync(outDir, { recursive: true });

const browser = await chromium.launch({
  executablePath: process.env.CHROMIUM_PATH || undefined,
});
const problems = [];

for (const [vpName, viewport] of viewports) {
  const context = await browser.newContext({
    viewport,
    deviceScaleFactor: 2,
    reducedMotion: "reduce",
  });
  const page = await context.newPage();

  page.on("console", (msg) => {
    if (msg.type() === "error") {
      problems.push(`[console ${vpName}] ${page.url()} :: ${msg.text()}`);
    }
  });
  page.on("pageerror", (err) => {
    problems.push(`[pageerror ${vpName}] ${page.url()} :: ${err.message}`);
  });

  for (const [name, path] of routes) {
    const res = await page.goto(base + path, {
      waitUntil: "load",
      timeout: 45000,
    });
    const status = res?.status();
    if (status && status >= 400 && name !== "notfound") {
      problems.push(`[http ${vpName}] ${path} returned ${status}`);
    }

    await page.waitForTimeout(900);

    const overflow = await page.evaluate(() => {
      const doc = document.documentElement;
      const diff = doc.scrollWidth - doc.clientWidth;
      if (diff <= 1) return null;
      const wide = [...document.querySelectorAll("*")]
        .filter((el) => {
          const r = el.getBoundingClientRect();
          return r.right > doc.clientWidth + 1 || r.left < -1;
        })
        .slice(0, 6)
        .map(
          (el) =>
            `${el.tagName.toLowerCase()}.${String(el.className).slice(0, 70)}`,
        );
      return { diff, wide };
    });
    if (overflow) {
      problems.push(
        `[overflow ${vpName}] ${path} +${overflow.diff}px :: ${overflow.wide.join(" | ")}`,
      );
    }

    const missingAlt = await page.evaluate(
      () =>
        [...document.querySelectorAll("img")].filter(
          (img) => !img.hasAttribute("alt"),
        ).length,
    );
    if (missingAlt) {
      problems.push(`[alt ${vpName}] ${path} — ${missingAlt} img without alt`);
    }

    await page.screenshot({ path: `${outDir}/${name}-${vpName}.png`, fullPage });
  }

  await context.close();
}

await browser.close();

// The deliberate 404 probe always logs a console error; filter it out.
const real = problems.filter((p) => !p.includes("this-route-does-not-exist"));

if (real.length) {
  console.log("PROBLEMS:");
  real.forEach((p) => console.log(" -", p));
  process.exitCode = 1;
} else {
  console.log(
    `${routes.length * viewports.length} screenshots in ${outDir}. ` +
      "No console errors, no horizontal overflow, no missing alt text.",
  );
}
