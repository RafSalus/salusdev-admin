import fs from "node:fs"
import path from "node:path"
import sharp from "sharp"

const publicDir = path.resolve(import.meta.dirname, "../public")

// SVG com cantos arredondados para ícone padrão (Android, desktop, favicon)
const standardSvg = (size, rx = 128) => `
<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 512 512">
  <rect width="512" height="512" rx="${rx}" fill="#163e32"/>
  <path d="M176 176 L96 256 L176 336" stroke="#34d399" stroke-width="40" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
  <path d="M336 176 L416 256 L336 336" stroke="#34d399" stroke-width="40" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
  <path d="M288 144 L224 368" stroke="#ffffff" stroke-width="40" stroke-linecap="round" fill="none"/>
</svg>
`

// SVG com fundo 100% preenchido para Apple Touch Icon (iOS arredonda nativamente)
const appleTouchSvg = `
<svg xmlns="http://www.w3.org/2000/svg" width="180" height="180" viewBox="0 0 512 512">
  <rect width="512" height="512" fill="#163e32"/>
  <path d="M176 176 L96 256 L176 336" stroke="#34d399" stroke-width="40" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
  <path d="M336 176 L416 256 L336 336" stroke="#34d399" stroke-width="40" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
  <path d="M288 144 L224 368" stroke="#ffffff" stroke-width="40" stroke-linecap="round" fill="none"/>
</svg>
`

// SVG Maskable com Safe Zone de 80% (o símbolo fica dentro de 400px para nunca ser cortado no Android)
const maskableSvg = `
<svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 512 512">
  <rect width="512" height="512" fill="#163e32"/>
  <g transform="translate(64, 64) scale(0.75)">
    <path d="M176 176 L96 256 L176 336" stroke="#34d399" stroke-width="44" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
    <path d="M336 176 L416 256 L336 336" stroke="#34d399" stroke-width="44" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
    <path d="M288 144 L224 368" stroke="#ffffff" stroke-width="44" stroke-linecap="round" fill="none"/>
  </g>
</svg>
`

async function generate() {
  console.log("Gerando suíte de ícones PWA oficiais SalusDev...")

  // 1. favicon.png (64x64)
  await sharp(Buffer.from(standardSvg(64, 16)))
    .png()
    .toFile(path.join(publicDir, "favicon.png"))
  console.log("✓ favicon.png (64x64)")

  // 2. pwa-192x192.png
  await sharp(Buffer.from(standardSvg(192, 48)))
    .png()
    .toFile(path.join(publicDir, "pwa-192x192.png"))
  console.log("✓ pwa-192x192.png")

  // 3. pwa-512x512.png
  await sharp(Buffer.from(standardSvg(512, 128)))
    .png()
    .toFile(path.join(publicDir, "pwa-512x512.png"))
  console.log("✓ pwa-512x512.png")

  // 4. maskable-icon-512x512.png
  await sharp(Buffer.from(maskableSvg))
    .png()
    .toFile(path.join(publicDir, "maskable-icon-512x512.png"))
  console.log("✓ maskable-icon-512x512.png (Safe Zone 80%)")

  // 5. apple-touch-icon.png (180x180)
  await sharp(Buffer.from(appleTouchSvg))
    .png()
    .toFile(path.join(publicDir, "apple-touch-icon.png"))
  console.log("✓ apple-touch-icon.png (180x180)")

  console.log("Suíte de ícones PWA gerada com sucesso!")
}

generate().catch(console.error)
