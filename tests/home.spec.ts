import { expect, test } from '@playwright/test'

test('homepage and its local resources load without external requests or browser errors', async ({
  page,
  request,
}) => {
  const errors: string[] = []
  const externalRequests: string[] = []
  page.on('pageerror', error => errors.push(error.message))
  page.on('console', message => {
    if (message.type() === 'error') errors.push(message.text())
  })
  await page.route('https://**/*', route => {
    externalRequests.push(route.request().url())
    return route.abort()
  })
  const response = await page.goto('/')
  expect(response?.status()).toBe(200)
  await expect(page).toHaveTitle('Marszy')
  await expect(page.getByRole('main')).toBeVisible()
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('[ Marszy ]')
  const avatar = page.getByRole('img', { name: "Marszy's avatar" })
  await expect(avatar).toBeVisible()
  await expect
    .poll(() => avatar.evaluate(image => (image as HTMLImageElement).naturalWidth))
    .toBeGreaterThan(0)
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
    'href',
    /^https:\/\/loveur\.life\/?$/,
  )
  await expect(page.locator('link[rel="manifest"]')).toHaveAttribute('href', '/site.webmanifest')
  const manifest = await request.get('/site.webmanifest')
  expect(manifest.ok()).toBeTruthy()
  expect(await manifest.json()).toMatchObject({ name: 'Marszy', start_url: '/' })
  const font = page.locator('link[rel="preload"][as="font"]')
  await expect(font).toHaveCount(1)
  const fontResponse = await request.get((await font.getAttribute('href'))!)
  expect(fontResponse.ok()).toBeTruthy()
  expect(fontResponse.headers()['content-type']).toContain('font/woff2')
  expect(response?.headers()['x-frame-options']).toBe('DENY')
  expect(response?.headers()['x-content-type-options']).toBe('nosniff')
  expect(errors).toEqual([])
  expect(externalRequests).toEqual([])
})

test('navigation keeps the intended destinations and offers complete touch targets', async ({
  page,
}) => {
  await page.goto('/')
  const navigation = page.getByRole('navigation', { name: 'Find Marszy' })
  const destinations = [
    ['Blog', 'https://blog.loveur.life/'],
    ['Twitter', 'https://twitter.com/Marszy_Official'],
    ['Github', 'https://github.com/lovemarszy'],
    ['Discord', 'https://discordapp.com/users/720870811287814165'],
    ['Telegram', 'https://t.me/Marszy_channel'],
    ['@Marszy', 'mailto:marszy@loveur.life'],
  ]
  await expect(navigation.getByRole('link')).toHaveCount(destinations.length)
  for (const [name, href] of destinations) {
    const link = navigation.getByRole('link', { name, exact: true })
    await expect(link).toHaveAttribute('href', href)
    expect((await link.boundingBox())?.height).toBeGreaterThanOrEqual(44)
    await expect(link.locator('svg')).toHaveCount(1)
    if (!['Blog', '@Marszy'].includes(name)) {
      await expect(link).toHaveAttribute('target', '_blank')
      await expect(link).toHaveAttribute('rel', /noopener/)
      await expect(link).toHaveAttribute('rel', /noreferrer/)
    }
  }
  expect(
    await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth),
  ).toBeTruthy()
})

test('system theme changes apply and link transitions recover afterward', async ({
  page,
}, testInfo) => {
  await page.goto('/')
  await expect(page.locator('html')).toHaveClass(
    new RegExp(`\\b${testInfo.project.use.colorScheme}\\b`),
  )
  for (const [colorScheme, background] of [
    ['dark', 'rgb(13, 17, 23)'],
    ['light', 'rgb(245, 245, 247)'],
  ] as const) {
    await page.emulateMedia({ colorScheme })
    await expect(page.locator('body')).toHaveCSS('background-color', background)
    await expect(page.getByRole('link', { name: 'Blog', exact: true })).toHaveCSS(
      'transition-duration',
      '0.1s',
    )
  }
})

test('a saved theme preference survives reload and overrides system changes', async ({ page }) => {
  await page.addInitScript(() => localStorage.setItem('theme', 'dark'))
  await page.emulateMedia({ colorScheme: 'light' })
  await page.goto('/')
  await expect(page.locator('body')).toHaveCSS('background-color', 'rgb(13, 17, 23)')
  await page.reload()
  await expect(page.locator('body')).toHaveCSS('background-color', 'rgb(13, 17, 23)')
})

test('keyboard users can locate the focused link', async ({ page, browserName }) => {
  await page.goto('/')
  // Safari on macOS uses Option-Tab to include links unless full keyboard access is enabled.
  await page.keyboard.press(
    browserName === 'webkit' && process.platform === 'darwin' ? 'Alt+Tab' : 'Tab',
  )
  const blog = page.getByRole('link', { name: 'Blog', exact: true })
  await expect(blog).toBeFocused()
  await expect(blog).toHaveCSS('outline-style', 'solid')
  await expect(blog).toHaveCSS('outline-width', '2px')
})

test('profile content and navigation remain available without JavaScript', async ({
  browser,
  baseURL,
}) => {
  const context = await browser.newContext({ javaScriptEnabled: false, baseURL })
  try {
    const page = await context.newPage()
    await page.goto('/')
    await expect(page.getByRole('heading', { level: 1 })).toHaveText('[ Marszy ]')
    const navigation = page.getByRole('navigation', { name: 'Find Marszy' })
    await expect(navigation.getByRole('link')).toHaveCount(6)
    await expect(navigation.getByRole('link', { name: 'Blog', exact: true })).toBeVisible()
    await expect(page.getByRole('img', { name: "Marszy's avatar" })).toBeVisible()
  } finally {
    await context.close()
  }
})

test('reduced motion disables link transitions', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await page.goto('/')
  await expect(page.getByRole('link', { name: 'Blog', exact: true })).toHaveCSS(
    'transition-duration',
    '0s',
  )
})

test('short links redirect permanently and missing pages return 404', async ({ request }) => {
  for (const [path, destination] of [
    ['/blog', 'https://blog.loveur.life/'],
    ['/twitter', 'https://twitter.com/Marszy_Official'],
    ['/github', 'https://github.com/lovemarszy'],
  ]) {
    const response = await request.get(path, { maxRedirects: 0 })
    expect(response.status()).toBe(308)
    expect(response.headers()['location']).toBe(destination)
    const withQuery = await request.get(`${path}?ref=profile`, { maxRedirects: 0 })
    expect(withQuery.status()).toBe(308)
    const redirect = new URL(withQuery.headers()['location'])
    expect(`${redirect.origin}${redirect.pathname}`).toBe(destination)
    expect(redirect.searchParams.get('ref')).toBe('profile')
  }
  expect((await request.get('/missing-page')).status()).toBe(404)
})
