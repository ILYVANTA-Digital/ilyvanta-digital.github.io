import fs from "node:fs/promises";
import path from "node:path";
import { spawn } from "node:child_process";
import { launch } from "chrome-launcher";
import lighthouse from "lighthouse";
import desktopConfig from "lighthouse/core/config/desktop-config.js";
const baseline = process.env.BASELINE_DIR;
if (!baseline) throw new Error("BASELINE_DIR must point to the built pre-motion app.");
const output = path.resolve("performance-results");
await fs.mkdir(output, { recursive: true });
async function start(directory, port) {
  const server = spawn(
    process.execPath,
    [
      path.join(directory, "node_modules/next/dist/bin/next"),
      "start",
      "--hostname",
      "127.0.0.1",
      "--port",
      String(port),
    ],
    {
      cwd: directory,
      stdio: ["ignore", "pipe", "pipe"],
      env: { ...process.env, NEXT_TELEMETRY_DISABLED: "1" },
    },
  );
  let log = "";
  server.stdout.on("data", (d) => {
    log += d;
  });
  server.stderr.on("data", (d) => {
    log += d;
  });
  for (let i = 0; i < 100; i++) {
    if (server.exitCode !== null) throw new Error(log);
    try {
      if ((await fetch(`http://127.0.0.1:${port}/`)).ok) return server;
    } catch {}
    await new Promise((r) => setTimeout(r, 100));
  }
  server.kill();
  throw new Error("Production server did not start");
}
const servers = [];
let chrome;
const results = [];
try {
  servers.push(await start(path.resolve(baseline), 4174));
  servers.push(await start(process.cwd(), 4175));
  chrome = await launch({ chromeFlags: ["--headless"] });
  for (const [version, port] of [
    ["before", 4174],
    ["after", 4175],
  ]) {
    for (const device of ["mobile", "desktop"]) {
      const run = await lighthouse(
        `http://127.0.0.1:${port}/`,
        {
          port: chrome.port,
          output: "html",
          logLevel: "error",
          onlyCategories: ["performance", "accessibility", "best-practices", "seo"],
        },
        device === "desktop" ? desktopConfig : undefined,
      );
      if (!run || run.lhr.runtimeError)
        throw new Error(
          `Lighthouse failed for ${version}/${device}: ${run?.lhr.runtimeError?.message}`,
        );
      await fs.writeFile(path.join(output, `${version}-${device}.html`), run.report);
      await fs.writeFile(path.join(output, `${version}-${device}.json`), JSON.stringify(run.lhr));
      const row = {
        version,
        device,
        url: run.lhr.finalDisplayedUrl,
        fetchTime: run.lhr.fetchTime,
        scores: Object.fromEntries(
          Object.entries(run.lhr.categories).map(([k, v]) => [k, Math.round(v.score * 100)]),
        ),
        metrics: {
          LCP_ms: run.lhr.audits["largest-contentful-paint"].numericValue,
          CLS: run.lhr.audits["cumulative-layout-shift"].numericValue,
          TBT_ms: run.lhr.audits["total-blocking-time"].numericValue,
          FCP_ms: run.lhr.audits["first-contentful-paint"].numericValue,
        },
      };
      results.push(row);
      console.log(JSON.stringify(row));
    }
  }
  await fs.writeFile(
    path.join(output, "summary.json"),
    JSON.stringify(
      {
        note: "Single-run CI lab comparison. Preview pages intentionally noindex. Before=Phase 2; after=optional Phase 3 3D before activation. No field INP or physical-device claim.",
        results,
      },
      null,
      2,
    ),
  );
} finally {
  await chrome?.kill();
  for (const server of servers) server.kill("SIGTERM");
}
