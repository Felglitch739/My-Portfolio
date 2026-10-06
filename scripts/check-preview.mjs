import assert from 'node:assert/strict'

// Run against `npm run preview`. Verify real asset responses rather than SPA 200 fallbacks.
const base = new URL(process.argv[2] ?? 'http://127.0.0.1:4173/')
const page = await fetch(base)
assert.equal(page.status, 200)
const html = await page.text()
assert.match(html, /<html lang="es">/)
const modulePath = html.match(/<script[^>]+src="([^"]+)"/)?.[1]
assert.ok(modulePath, 'Built entry script is missing')
const assets = [
  [modulePath, 'javascript'],
  ['/favicon.svg', 'svg'],
  ['/KronoBook_Preview.png', 'image/'],
  ['/aurafit.png', 'image/'],
  ["/Gazpacho's.png", 'image/'],
  ['/familyweather.png', 'image/'],
  ['/imagenmia.jpeg', 'image/'],
  ['/Felix_Martinez_Resume.pdf', 'pdf'],
  ['/fonts/ndot.otf', 'font/'],
]
for (const [asset, expectedType] of assets) {
  const response = await fetch(new URL(asset, base))
  assert.equal(response.status, 200, `${asset} is unavailable`)
  assert.ok(response.headers.get('content-type')?.includes(expectedType), `${asset} returned the wrong content type`)
  const bytes = new Uint8Array(await response.arrayBuffer())
  assert.ok(bytes.length > 0, `${asset} is empty`)
  if (expectedType === 'pdf') assert.equal(new TextDecoder().decode(bytes.slice(0, 5)), '%PDF-')
}
console.log(`Preview checks passed: HTML language, entry script, and ${assets.length - 1} public assets. No contact messages sent.`)
