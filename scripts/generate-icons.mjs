import sharp from "sharp";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");
const publicDir = join(root, "public");
const iconsDir = join(publicDir, "icons");
const shareDir = join(publicDir, "share");

await mkdir(iconsDir, { recursive: true });
await mkdir(shareDir, { recursive: true });

// 1) Build large icon as composited PNG from favicon.svg + larger 五 character
const iconSvg = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
  <defs>
    <radialGradient id="bg" cx="50%" cy="40%" r="60%">
      <stop offset="0%" stop-color="#1d1830"/>
      <stop offset="100%" stop-color="#0c0a14"/>
    </radialGradient>
  </defs>
  <rect width="512" height="512" rx="112" fill="url(#bg)"/>
  <circle cx="256" cy="80"  r="20" fill="#F1D687"/>
  <circle cx="432" cy="184" r="20" fill="#A8D6A8"/>
  <circle cx="368" cy="408" r="20" fill="#9CCDE8"/>
  <circle cx="144" cy="408" r="20" fill="#F5A6B8"/>
  <circle cx="80"  cy="184" r="20" fill="#D8B795"/>
  <circle cx="256" cy="256" r="160" fill="none" stroke="#3b3550" stroke-width="3" stroke-dasharray="6 12"/>
  <text x="256" y="320" text-anchor="middle" font-family="Noto Serif SC, Songti SC, STSong, serif" font-size="180" fill="#fbf6ec" font-weight="600">五</text>
</svg>
`;

const iconBuf = Buffer.from(iconSvg);
const iconBase = await sharp(iconBuf).png().toBuffer();

await sharp(iconBase).resize(512, 512).png().toFile(join(iconsDir, "icon-512.png"));
await sharp(iconBase).resize(192, 192).png().toFile(join(iconsDir, "icon-192.png"));
await sharp(iconBase).resize(180, 180).png().toFile(join(iconsDir, "apple-touch-icon.png"));
await sharp(iconBase).resize(32,  32 ).png().toFile(join(iconsDir, "icon-32.png"));
await sharp(iconBase).resize(16,  16 ).png().toFile(join(iconsDir, "icon-16.png"));

// 2) Build OG default image from group.png (1200x630)
const groupSrc = join(root, "src", "assets", "beasts", "group.png");
if (existsSync(groupSrc)) {
  const ogBg = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 630">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#0c0a14"/>
      <stop offset="60%" stop-color="#1d1830"/>
      <stop offset="100%" stop-color="#0c0a14"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#g)"/>
</svg>
`;
  const bgBuf = await sharp(Buffer.from(ogBg)).png().toBuffer();

  // Place the group composition in the right ~58% width, scaled to fit
  const groupResized = await sharp(groupSrc)
    .resize({ width: 720, height: 460, fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toBuffer();

  const titleSvg = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 460 460">
  <text x="0" y="80"  font-family="Noto Serif SC, Songti SC, serif" font-size="84" fill="#fbf6ec" font-weight="600" letter-spacing="6">五行小兽</text>
  <text x="0" y="140" font-family="Cormorant Garamond, serif" font-size="32" fill="#c9c0a8" font-style="italic" letter-spacing="6">Wǔ Xíng Beasts</text>
  <line x1="0" y1="170" x2="120" y2="170" stroke="#f1d687" stroke-width="2"/>
  <text x="0" y="240" font-family="Noto Serif SC, serif" font-size="28" fill="#c9c0a8" letter-spacing="2">一座会呼吸的</text>
  <text x="0" y="284" font-family="Noto Serif SC, serif" font-size="28" fill="#c9c0a8" letter-spacing="2">东方奇幻数字藏馆</text>
  <text x="0" y="380" font-family="Cormorant Garamond, serif" font-size="22" fill="#9b8b66" font-style="italic" letter-spacing="6">Five Elements · Eight Beasts</text>
</svg>
`;
  const titleBuf = await sharp(Buffer.from(titleSvg)).png().toBuffer();

  await sharp(bgBuf)
    .composite([
      { input: groupResized, left: 460, top: 90 },
      { input: titleBuf, left: 80, top: 140 },
    ])
    .png()
    .toFile(join(shareDir, "og-default.png"));
}

console.log("✓ icons + og written.");
