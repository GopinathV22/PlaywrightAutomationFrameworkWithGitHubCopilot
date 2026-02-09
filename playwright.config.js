
const { defineConfig, devices } = require('@playwright/test');
const { channel } = require('diagnostics_channel');

module.exports = defineConfig({
  testDir: './tests',
  timeout: 40 * 1000,
  expect: { timeout: 40 * 1000 },
  reporter: 'html',
  projects: [
    {
      name: "chrome",
      use: { 
        browserName: 'chromium',
        headless: false
      }
    },
    // {
    //   name: "edge",
    //   use: { 
    //     channel: 'msedge',
    //     headless: false
    //   }
    //}
  ]
});
