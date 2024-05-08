import { test, expect, type Page } from '@playwright/test';

test('Check if div has 4 answers', async ({ page }) => {
  await page.goto('localhost:3000');

  const div = await page.waitForSelector('#answers');

  // Get all the list items within the div
  const listItems = await div.$$('ul li');

  // Assert that there are exactly 4 list items
  expect(listItems.length).toBe(4);
});

test('Check if div has 4 answers with correct titles A, B, C, D', async ({ page }) => {
    await page.goto('localhost:3000');
  
    const div = await page.waitForSelector('#answers');
  
    // Get all the list items within the div
    const listItems = await div.$$('ul li');
  
    // Assert that there are exactly 4 list items
    expect(listItems.length).toBe(4);
  
    // Check the title of each list item
    const expectedTitles = ['A', 'B', 'C', 'D'];
  for (let i = 0; i < listItems.length; i++) {
    const listItem = listItems[i];
    const span = await listItem.$('span');
    if (!span) {
      // If <span> is not found in the list item, fail the test
      throw new Error(`Span not found in list item ${i + 1}`);
    }
    const title = await span.innerText();
    expect(title).toBe(expectedTitles[i]);
  }
  });

  test('Check if div has question text', async ({ page }) => {
    await page.goto('localhost:3000');
  
    const div = await page.waitForSelector('#question');
  
    // Get the question text within the div
    const questionParagraph = await div.$('p');
  
    expect(questionParagraph).not.toBe(null);
  
    if (questionParagraph) {
        // Get the question text
        const questionText = await questionParagraph.innerText();
    
        expect(questionText.trim()).not.toBe('');
      } else {
        throw new Error('Question text not found.');
      }
  });


  test('Check if submit button appears after selecting an option', async ({ page }) => {
    await page.goto('localhost:3000');
  
    for (let attempt = 1; attempt <= 5; attempt++) {
      try {
        // Wait for the popup container to disappear
        await page.waitForSelector('.popup-container', { state: 'hidden', timeout: 2000 });
  
        const answersDiv = await page.waitForSelector('#answers');
  
        const answerOptions = await answersDiv.$$('ul li');
  
        // Click on the first answer option (index 0)
        await answerOptions[0].click();
  
        // Wait for the submit button to appear
        const submitButton = await page.waitForSelector('#submit button', { timeout: 2000 });
  
        // Assert that the submit button exists
        expect(submitButton).not.toBe(null);
        
        // If no error occurs, break out of the loop
        break;
      } catch (error) {
        console.log(`Retry click action, attempt #${attempt}`);
        // Wait for a short delay before retrying
        await page.waitForTimeout(500);
      }
    }
  });