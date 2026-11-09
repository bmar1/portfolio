/**
 * Section-by-section stills of the main site, plus the About takeover.
 * Usage (dev server on :5173): npx tsx scripts/shoot-main.ts <label>
 * Output: ../docs/immersive/shots/<label>/
 */
import { chromium, type Page } from '@playwright/test'
import { mkdirSync } from 'node:fs'
import { resolve } from 'node:path'

const BASE_URL = process.env.SHOOT_BASE_URL ?? 'http://localhost:5173'
const LABEL = process.argv[2] ?? 'main'
const OUT_DIR = resolve(import.meta.dirname, '..', '..', 'docs', 'immersive', 'shots', LABEL)

const SECTIONS = ['about', 'projects', 'experience', 'leadership', 'skills', 'offgrid', 'contact']

const VIEWPORTS = [
  { name: 'desktop', width: 1440, height: 900 },
  { name: 'mobile', width: 390, height: 844 },
] as const

async function shoot(page: Page, name: string) {
  const file = resolve(OUT_DIR, `${name}.png`)
  await page.screenshot({ path: file })
  console.log(`  shot: ${file}`)
}

async function main() {
  mkdirSync(OUT_DIR, { recursive: true })
  const browser = await chromium.launch()

  for (const vp of VIEWPORTS) {
    const context = await browser.newContext({ viewport: { width: vp.width, height: vp.height } })
    await context.addInitScript(() => sessionStorage.setItem('bumar:booted', '1'))
    const page = await context.newPage()
    await page.goto(BASE_URL, { waitUntil: 'networkidle' })
    await page.waitForTimeout(800)

    for (const id of SECTIONS) {
      await page.evaluate((s) => {
        const el = document.getElementById(s)
        if (el) window.scrollTo(0, el.getBoundingClientRect().top + window.scrollY - 40)
      }, id)
      await page.waitForTimeout(2200)
      if (vp.name === 'desktop') await page.mouse.move(vp.width * 0.7, vp.height * 0.45)
      await page.waitForTimeout(200)
      await shoot(page, `${id}__${vp.name}`)
    }

    await page.evaluate(() => document.getElementById('about')?.scrollIntoView())
    await page.waitForTimeout(600)
    await page.getByRole('button', { name: /jack into my profile/i }).click()
    await page.waitForTimeout(900)
    await shoot(page, `jackin-loader__${vp.name}`)
    await page.waitForTimeout(2200)
    await shoot(page, `jackin-matrix__${vp.name}`)
    await page.getByRole('button', { name: /cool/i }).click()
    await page.waitForTimeout(400)
    await page.evaluate(() => document.querySelector('.takeover')?.scrollTo(0, 99999))
    await page.waitForTimeout(300)
    await shoot(page, `jackin-readout__${vp.name}`)
    await page.keyboard.press('Escape')

    await context.close()
  }

  await browser.close()
}

main()
