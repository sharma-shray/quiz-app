import { test, expect, type Page } from '@playwright/test';

test('Check all answers have text', async ({ page }) => {
  await page.goto('localhost:3000');

  // Check if the answers container exists
  const answersContainer = await page.$('#answers');
  expect(answersContainer).not.toBeNull();

  // Get all answer elements
  const answerElements = await page.$$('#answers li');

  // Loop through each answer element and check if it has text
  for (const answerElement of answerElements) {
    // Get the text content of the answer element
    const textContent = await answerElement.textContent();
    
    // Check if the text content exists and is not null or empty
    if (textContent && textContent.trim() !== '') {
      expect(textContent.trim()).toBeTruthy();
    } else {
      // If text content is null or empty, fail the test
      throw new Error(`Answer element ${answerElement} does not have text content.`);
    }
  }
});


test('Clicking on wrong answer adds "wrong" class to the answer element', async ({ page }) => {
  await page.goto('localhost:3000');

  // Wait for the popup to disappear
  await page.waitForSelector('.popup-container', { state: 'hidden' });

  // Click on the wrong answer
  await page.click('#answers li[data-id="1"]');

  // Check if the "wrong" class is added to the clicked wrong answer element
  const isWrongClassAdded = await page.$eval('#answers li[data-id="1"]', element => element.classList.contains('wrong'));
  expect(isWrongClassAdded).toBeTruthy();
});
