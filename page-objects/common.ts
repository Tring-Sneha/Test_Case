import { Page, ElementHandle, Locator } from '@playwright/test';

export class Common {
  private page: Page;
  private timeout: number;


  constructor(page: Page) {
    this.page = page;
    this.timeout = 30000;
  }
  
  async scrollUntilXPath(xpath: string, interval: number = 200, timeoutOverride?: number): Promise<Locator | null> {
    const startTime = Date.now();

    while (Date.now() - startTime < this.timeout) {
        try {
            // Check if the element with the XPath is visible on the page
            const element = await this.page.locator(`xpath=${xpath}`).first();
            if (await element.isVisible()) {
              console.log('Element found!');
              return element;
          }
        } catch (error) {
            console.error('Error while checking element:', error);
        }

        // Scroll down the page
        await this.page.evaluate(() => {
            window.scrollBy(0, window.innerHeight);
        });

        // Wait for the interval before scrolling again
        await this.page.waitForTimeout(interval);
    }

    console.error('Element not found within the timeout period');
    return null;
  }

  async extractDate(input: string): Promise<Date> {
    const datePart = input.split("/").pop()?.trim();
    if (!datePart) {
        throw new Error("Invalid date format");
    }
    // Parse the date (MM.DD.YYYY or DD.MM.YYYY depending on your convention)
    const [month, day, year] = datePart.split(".").map(Number);
    return new Date(year, month - 1, day); // Month is 0-indexed in JavaScript
  }


  async click(selector: string): Promise<void> {
    try {
      await this.page.waitForSelector(selector, { state: 'visible', timeout: this.timeout });
      await this.page.click(selector);
    } catch (error) {
      console.error(`Error clicking on selector '${selector}':`, error);
      throw error;
    }
  }


  async getTextByXPath(xpath: string, timeout: number = this.timeout): Promise<string> {
    // Wait for the element to be available
    await this.page.waitForSelector(`xpath=${xpath}`, { timeout });

    // Retrieve and return the text content
    const textContent = await this.page.locator(`xpath=${xpath}`).textContent();
    if (!textContent) {
      throw new Error(`No text found for the given XPath: ${xpath}`);
    }
    return textContent.trim(); // Remove any leading/trailing whitespace
  }

  async getTextRemoveAppostrophy(xpath: string, timeout: number = this.timeout): Promise<string> {
    // Wait for the element to be available
    await this.page.waitForSelector(`xpath=${xpath}`, { timeout });
  
    // Retrieve and return the text content
    const textContent = await this.page.locator(`xpath=${xpath}`).textContent();
    if (!textContent) {
      throw new Error(`No text found for the given XPath: ${xpath}`);
    }
  
    // Remove any single quotes and trim whitespace
    return textContent.replace(/['’]/g, '').trim();
  }

  generateRandomValidEmail(): string {
    const timestamp = Date.now(); 
    const randomNumber = this.getRandomInteger();
    return `tring.automation1+${timestamp + randomNumber}@tringapps.com`;
  }


  getRandomInteger(): number {
    const min = 1000;
    const max = 9999;
    return Math.floor(Math.random() * (max - min)) + min;
  }

  generateRandomValidName(): string {
    const randomName = Array.from({ length: 12 }, () =>
      String.fromCharCode(Math.floor(Math.random() * 26) + (Math.random() < 0.5 ? 65 : 97))
    ).join('');
    return randomName;
  }

  
}