import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Playwright/);
});

test('get started link', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Click the get started link.
  await page.getByRole('link', { name: 'Get started' }).click();

  // Expects page to have a heading with the name of Installation.
  await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
});

test('test4', async ({ page }) => {

  await page.goto('https://www.mercadolibre.com.co/');
  //localizar elemento y llevar palabra
  await page.locator("input[id = 'cb1-edit']").fill('Iphone')
  await page.keyboard.press('Enter')
  //assertion
  await expect(page.locator("//ol[contains (@class, 'ui-search-layout')]")).toBeVisible()
  
  //crear una pausa
  //await page.pause()
  //obtener los titulos del DOM 
  const titles = await page.locator("//ol[contains (@class, 'ui-search-layout')]//li//h2").allInnerTexts()

  console.log(titles.length)
  for(let title of titles){
    console.log('The title is:', title)

  }
});


