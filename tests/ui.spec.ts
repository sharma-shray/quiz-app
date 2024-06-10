import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
    await page.goto('localhost:3000');
  
    // Expect a title "to contain" a substring.
    await expect(page).toHaveTitle(/QuizApp - The Ultimate Trivia Quiz/);
  });

  test('Page header text exist', async ({ page }) => {
    await page.goto('localhost:3000');
  
    let targetText = "QuizApp";
    let FormText = "The Ultimate Trivia Quiz";

    let pageHeader = page.getByText(targetText);
    let pageForm = page.getByText(FormText);
    
    await expect(pageHeader).toBeTruthy();
    await expect(pageForm).toBeTruthy();
  });


  test('Test init form consist general questions', async ({ page }) => {
    await page.goto('localhost:3000');
  
    let text1 = "In which category do you want to play the quiz?";
    let text2 = "The How many questions do you want in your quiz? Trivia Quiz";
    let text3 = "How difficult do you want your quiz to be?";
    let text4 = "Which type of questions do you want in your quiz?";
    let text5 = "Please select the countdown time for your quiz.";
    let StartButton = "Play Now";

    let checkQuestion1 = page.getByText(text1);
    let checkQuestion2 = page.getByText(text2);
    let checkQuestion3 = page.getByText(text3);
    let checkQuestion4 = page.getByText(text4);
    let checkQuestion5 = page.getByText(text5);
    let checkButton = page.getByText(StartButton);
    
    await expect(checkQuestion1).toBeTruthy();
    await expect(checkQuestion2).toBeTruthy();
    await expect(checkQuestion3).toBeTruthy();
    await expect(checkQuestion4).toBeTruthy();
    await expect(checkQuestion5).toBeTruthy();
    await expect(checkButton).toBeTruthy();
  });
