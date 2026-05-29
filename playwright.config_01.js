const { defineConfig, devices } = require('@playwright/test');
const { on } = require('node:cluster');

module.exports = defineConfig({
  // ... (your other global settings like timeout, retries, etc.)
  testDir : './tests',
  retries : 1,
  workers : 1, //5 workers is default
  fullyParallel : on,

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'Chrome Execution',
      use: {
        browserName: 'chromium',
        headless: true,
        screenshot: 'on',
        video : 'on',
        trace: 'retain-on-failure',
        ignoreHTTPSErrors : true,
        permissions : ['geolocation'],
        ...devices['Desktop Chrome'] // Applies standard desktop sizing
      },
    },
    {
      name: 'webkit Execution',
      use: {
        browserName: 'webkit',
        headless: true,
        screenshot: 'only-on-failure',
        trace: 'on',
        viewport: { width: 500, height: 500 }, // Overrides the emulator's default viewport
        ...devices['Pixel 7 landscape'] // Emulates the mobile device behavior
      },
    }
  ],
});