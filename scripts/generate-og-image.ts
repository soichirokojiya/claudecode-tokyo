import puppeteer from "puppeteer";
import path from "path";
import fs from "fs";

const html = `<!DOCTYPE html>
<html>
<head>
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body { width: 1200px; height: 630px; overflow: hidden; }
</style>
</head>
<body>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 630" width="1200" height="630">
  <rect width="1200" height="630" fill="#1a1a2e"/>

  <!-- Stars -->
  <rect x="80" y="40" width="6" height="3" fill="white" opacity="0.3"/>
  <rect x="81" y="41" width="3" height="6" fill="white" opacity="0.3"/>
  <rect x="200" y="80" width="6" height="3" fill="white" opacity="0.2"/>
  <rect x="350" y="30" width="6" height="3" fill="white" opacity="0.4"/>
  <rect x="351" y="31" width="3" height="6" fill="white" opacity="0.4"/>
  <rect x="500" y="100" width="6" height="3" fill="white" opacity="0.15"/>
  <rect x="650" y="50" width="6" height="3" fill="white" opacity="0.25"/>
  <rect x="651" y="51" width="3" height="6" fill="white" opacity="0.25"/>
  <rect x="900" y="70" width="6" height="3" fill="white" opacity="0.3"/>
  <rect x="901" y="71" width="3" height="6" fill="white" opacity="0.3"/>
  <rect x="1050" y="40" width="6" height="3" fill="white" opacity="0.2"/>
  <rect x="150" y="130" width="6" height="3" fill="white" opacity="0.1"/>
  <rect x="450" y="60" width="6" height="3" fill="white" opacity="0.2"/>
  <rect x="1100" y="110" width="6" height="3" fill="white" opacity="0.15"/>

  <!-- Pixel Moon -->
  <rect x="1020" y="60" width="48" height="16" fill="white" opacity="0.7"/>
  <rect x="1004" y="76" width="16" height="16" fill="white" opacity="0.7"/>
  <rect x="1068" y="76" width="16" height="16" fill="white" opacity="0.7"/>
  <rect x="1004" y="92" width="16" height="32" fill="white" opacity="0.7"/>
  <rect x="1020" y="92" width="16" height="32" fill="white" opacity="0.5"/>
  <rect x="1020" y="124" width="16" height="16" fill="white" opacity="0.5"/>

  <!-- Pixel Clouds -->
  <rect x="100" y="150" width="160" height="48" fill="white" opacity="0.08"/>
  <rect x="80" y="170" width="20" height="28" fill="white" opacity="0.08"/>
  <rect x="260" y="170" width="20" height="28" fill="white" opacity="0.08"/>

  <rect x="800" y="120" width="120" height="36" fill="white" opacity="0.06"/>
  <rect x="785" y="136" width="15" height="20" fill="white" opacity="0.06"/>

  <!-- Ground -->
  <rect x="0" y="560" width="1200" height="2" fill="#4ade80" opacity="0.2"/>

  <!-- Claude 1 (small, left) -->
  <rect x="160" y="480" width="32" height="32" fill="#d97757"/>
  <rect x="152" y="484" width="8" height="24" fill="#d97757"/>
  <rect x="192" y="484" width="8" height="24" fill="#d97757"/>
  <rect x="160" y="512" width="12" height="8" fill="#d97757"/>
  <rect x="180" y="512" width="12" height="8" fill="#d97757"/>
  <rect x="164" y="476" width="24" height="4" fill="#d97757"/>
  <rect x="168" y="494" width="4" height="4" fill="#1a1a2e"/>
  <rect x="180" y="494" width="4" height="4" fill="#1a1a2e"/>

  <!-- Claude 2 (medium, center) -->
  <rect x="560" y="420" width="64" height="64" fill="#d97757"/>
  <rect x="544" y="428" width="16" height="48" fill="#d97757"/>
  <rect x="624" y="428" width="16" height="48" fill="#d97757"/>
  <rect x="560" y="484" width="24" height="16" fill="#d97757"/>
  <rect x="600" y="484" width="24" height="16" fill="#d97757"/>
  <rect x="568" y="412" width="48" height="8" fill="#d97757"/>
  <rect x="576" y="448" width="8" height="8" fill="#1a1a2e"/>
  <rect x="600" y="448" width="8" height="8" fill="#1a1a2e"/>
  <rect x="568" y="428" width="16" height="8" fill="#e8956f"/>

  <!-- Claude 3 (small, right) -->
  <rect x="940" y="480" width="32" height="32" fill="#d97757"/>
  <rect x="932" y="484" width="8" height="24" fill="#d97757"/>
  <rect x="972" y="484" width="8" height="24" fill="#d97757"/>
  <rect x="940" y="512" width="12" height="8" fill="#d97757"/>
  <rect x="960" y="512" width="12" height="8" fill="#d97757"/>
  <rect x="944" y="476" width="24" height="4" fill="#d97757"/>
  <rect x="948" y="494" width="4" height="4" fill="#1a1a2e"/>
  <rect x="960" y="494" width="4" height="4" fill="#1a1a2e"/>

  <!-- Main text -->
  <text x="600" y="280" text-anchor="middle" font-family="monospace" font-size="64" font-weight="900" fill="#d97757" letter-spacing="6">CLAUDE CODE</text>
  <text x="600" y="320" text-anchor="middle" font-family="monospace" font-size="24" font-weight="400" fill="#d97757" opacity="0.6">.TOKYO</text>

  <!-- Tagline -->
  <text x="600" y="370" text-anchor="middle" font-family="sans-serif" font-size="20" fill="white" opacity="0.5">Claude Code &amp; AIエージェントのニュースメディア</text>

  <!-- Terminal prompt -->
  <text x="600" y="580" text-anchor="middle" font-family="monospace" font-size="14" fill="#4ade80" opacity="0.3">$ Welcome to ClaudeCode.Tokyo</text>
</svg>
</body>
</html>`;

async function main() {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setViewport({ width: 1200, height: 630 });
  await page.setContent(html, { waitUntil: "networkidle0" });

  const outputPath = path.join(process.cwd(), "public", "og-image.png");
  await page.screenshot({ path: outputPath, type: "png" });
  await browser.close();

  console.log(`Generated: ${outputPath}`);

  // Verify file size
  const stats = fs.statSync(outputPath);
  console.log(`Size: ${(stats.size / 1024).toFixed(1)} KB`);
}

main().catch(console.error);
