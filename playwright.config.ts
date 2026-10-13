import { defineConfig, devices } from '@playwright/test'

const baseURL = 'http://127.0.0.1:3100'

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  workers: 2,
  reporter: [['list'], ['html', { open: 'never' }]],
  use: {
    baseURL,
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
  },
  projects: [
    { name: 'desktop-light', use: { ...devices['Desktop Chrome'], colorScheme: 'light' } },
    { name: 'desktop-dark', use: { ...devices['Desktop Chrome'], colorScheme: 'dark' } },
    {
      name: 'mobile-light',
      use: {
        ...devices['Desktop Chrome'],
        viewport: { width: 320, height: 568 },
        colorScheme: 'light',
      },
    },
    {
      name: 'mobile-dark',
      use: {
        ...devices['Desktop Chrome'],
        viewport: { width: 320, height: 568 },
        colorScheme: 'dark',
      },
    },
    { name: 'firefox', use: { ...devices['Desktop Firefox'], colorScheme: 'light' } },
    {
      name: 'webkit-mobile',
      use: { ...devices['iPhone SE'], viewport: { width: 320, height: 568 }, colorScheme: 'dark' },
    },
  ],
  webServer: {
    command: 'node node_modules/next/dist/bin/next start --hostname 127.0.0.1 --port 3100',
    url: baseURL,
    reuseExistingServer: false,
    timeout: 60_000,
  },
})
