import { defineConfig, devices } from '@playwright/test';
import { Status } from "allure-js-commons";
import * as os from "node:os";
import fs from 'fs';
import path from 'path';


/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// import dotenv from 'dotenv';
// import path from 'path';
// dotenv.config({ path: path.resolve(__dirname, '.env') });

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir: './tests',
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  // projects: [
  //   {name: 'chrominum', use: {...devices['Desktop Chrome']}},
  //   { name: 'firefox', use: { ...devices['Desktop Firefox'] } },
  //   { name: 'webkit', use: { ...devices['Desktop Safari'] } }
  // ],
  reporter: [
    [
      "allure-playwright",
      {
        resultsDir: "allure-results",
        detail: true,
        suiteTitle: true,
        categories: [
          {
            name: 'Failed Tests',  // Name of the category
            messageRegex: '.*',    // Regex to match any failure message (you can make it more specific)
            matchedStatuses: ['FAILED'],  // Only include tests with FAILED status
          },
          {
            name: 'Broken Tests', // Name of the category
            messageRegex: '.broken.',  // Regex to match failure message containing 'broken'
            matchedStatuses: ['FAILED'],  // Only include tests with FAILED status
          },
        ],
        environmentInfo: {
          os_platform: os.platform(),
          os_release: os.release(),
          os_version: os.version(),
          node_version: process.version,
        },
      },
    ],
  ],



  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like await page.goto('/'). */
    // baseURL: 'http://127.0.0.1:3000',

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry',
    screenshot: 'on',
    video:'on'
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome']},

    
      // name: 'firefox',
      // use: { ...devices['Desktop Firefox'] },
    
      
    },




    
  //   {
  //     name: 'chromium',
  //     use: {
  //       browserName: 'chromium',
  //       : 'C:/Program Files/Google/Chrome/Application/chrome.exe', // Specify path here
  //       args: ['--remote-debugging-port=9222'],
  //       headless: false,
  //       viewport: { width: 1280, height: 720 },
  //     },
  //   },
  // ],
  // globalSetup: async () => {
  //   const executablePath = 'C:/Program Files/Google/Chrome/Application/chrome.exe';
  //   if (!fs.existsSync(executablePath)) {
  //     throw new Error(Chrome executable not found at path: ${executablePath});
  //   }
  // },

    // {
    //   name: 'firefox',
    //   use: { ...devices['Desktop Firefox'] },
    // },

    // {
    //   name: 'webkit',
    //   use: { ...devices['Desktop Safari'] },
    // },

    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    // },
  ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://127.0.0.1:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
  timeout: 60000,

});