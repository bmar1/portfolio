/**
 * Screenshot rig for the /lab experimental wing. Captures desktop + mobile
 * stills of the current main site and each lab direction, plus a handful
 * of scroll-depth frames per route so reviewers can see the scenes that
 * only exist once you scroll (pinned sections, scrubbed tracks, etc.)
 * without needing a live browser themselves.
 *
 * Usage (from portfolio-site, with the dev server already running on
 * http://localhost:5173):
 *   npx tsx scripts/shoot.ts <round-label>
 *
 * Output: ../docs/immersive/shots/<round-label>/<route>__<viewport>__<n>.png
 */
import { chromium, type Page } from '@playwright/test'
import { mkdirSync } from 'node:fs'
import { resolve } from 'node:path'

const BASE_URL = process.env.SHOOT_BASE_URL ?? 'http://localhost:5173'
const ROUND = process.argv[2] ?? 'round-1'
const OUT_DIR = resolve(import.meta.dirname, '..', '..', 'docs', 'immersive', 'shots', ROUND)

const ROUTES = ['/', '/braindance', '/metro', '/breach'] as const

const VIEWPORTS = [
  { name: 'desktop', width: 1440, height: 900 },
  { name: 'mobile', width: 390, height: 844 },
] as const

// Fraction-of-scrollHeight stops to sample per route. 0 = top, 1 = bottom.
const SCROLL_STOPS = [0, 0.18, 0.36, 0.54, 0.72, 0.9]

async function shootRoute(page: Page, route: string, viewport: { name: string; width: number; height: number }) {
  await page.setViewportSize({ width: viewport.width, height: viewport.height })
  await page.goto(`${BASE_URL}${route}`, { waitUntil: 'networkidle' })
  // Let webfonts/shaders settle and any boot/intro timeline resolve.
  await page.waitForTimeout(1200)

  const routeSlug = route === '/' ? 'main' : route.slice(1)
  const scrollHeight = await page.evaluate(() => document.documentElement.scrollHeight - window.innerHeight)

  for (let i = 0; i < SCROLL_STOPS.length; i++) {
    const target = Math.max(0, Math.round(scrollHeight * SCROLL_STOPS[i]))
    await page.evaluate((y) => window.scrollTo(0, y), target)
    await page.waitForTimeout(550) // let scroll-driven animation settle before capture
    const file = resolve(OUT_DIR, `${routeSlug}__${viewport.name}__${String(i).padStart(2, '0')}.png`)
    await page.screenshot({ path: file })
    console.log(`  shot: ${file}`)
  }
}

async function main() {
  mkdirSync(OUT_DIR, { recursive: true })
  const browser = await chromium.launch()
  const context = await browser.newContext()
  const page = await context.newPage()

  for (const route of ROUTES) {
    for (const viewport of VIEWPORTS) {
      console.log(`Shooting ${route} @ ${viewport.name}`)
      try {
        await shootRoute(page, route, viewport)
      } catch (err) {
        console.error(`Failed shooting ${route} @ ${viewport.name}:`, err)
      }
    }
  }

  await browser.close()
  console.log(`\nDone. Shots in: ${OUT_DIR}`)
}

main()
