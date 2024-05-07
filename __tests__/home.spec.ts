import { test, expect, type Page } from '@playwright/test';

test('Check if page title exists', async ({ page }) => {
  await page.goto('localhost:3000');

  // Get the page title
  const title = await page.title();

  expect(title).toBeTruthy();
});

test('Check if the div with class "popup" exists', async ({ page }) => {
    await page.goto('localhost:3000');
  
    const divExists = await page.evaluate(() => {
      const div = document.querySelector('div.popup');
      return div !== null;
    });
  
    expect(divExists).toBeTruthy();
  });


  test('Check if the welcome message exists', async ({ page }) => {
    await page.goto('localhost:3000');
  
    // Check if the welcome message exists
    const welcomeMessageExists = await page.evaluate(() => {
      const welcomeMessage = document.querySelector('div.popup h1');
      return welcomeMessage !== null;
    });
  
    expect(welcomeMessageExists).toBeTruthy();
  });

  test('Check if all text in the <p> element exists', async ({ page }) => {
    await page.goto('localhost:3000');
  
    // Define the expected text content without extra line breaks and spaces
  const expectedText = "This is a quiz application built using ReactJS.  Currently it's loaded with CSS questions from W3Scools, but you can easily load any type of questions into it.  It will dynamically load the question->answers pair and upload them into the components.";
  
    // Get the actual text content of the <p> element
    const paragraph = await page.$('div.popup p');
    
    // Check if the paragraph element exists
    if (paragraph === null) {
      throw new Error('Paragraph element not found');
    }
  
    const actualText = await paragraph.textContent();

    // Check if the actual text content is not null
    if (actualText === null) {
      throw new Error('Text content of paragraph is null');
    }
  
    // Check if the actual text content matches the expected text
    expect(actualText.trim()).toBe(expectedText.trim());
  });


  test('Check if the button with class "fancy-btn" exists', async ({ page }) => {
    await page.goto('localhost:3000');
  
    const buttonExists = await page.$('button.fancy-btn');

    expect(buttonExists).not.toBeNull();
  });
  

  test('Check if the div with id "question" exists', async ({ page }) => {
    await page.goto('localhost:3000');
  
    const divExists = await page.$('div#question');
  
    expect(divExists).not.toBeNull();
  });