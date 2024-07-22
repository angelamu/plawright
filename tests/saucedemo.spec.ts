import { test, expect } from '@playwright/test';
import { LoginPage } from './pageobjects/LoginPage';

test('purchase an iten ', async ({ page }, testInfo) => {
    await page.goto('https://www.saucedemo.com/v1/');
  
    const loginPage = new LoginPage(page)
    await loginPage.loginWithCredentials('standard_user','secret_sauce')
    await loginPage.checkSuccessFullLogin()

   
   //Capturas de pantalla en el reporte
    await testInfo.attach('login',{
        body:await page.screenshot(),
        contentType:'image/png'
    })
    
    const itemsContainer = await page.locator('#inventory_container .inventory_item').all()
    
    //crear un random 
    const randomIndex = Math.floor(Math.random() * itemsContainer.length)

    const randomItem = itemsContainer[randomIndex]

    // sacar las propiedeades
    const expectDescription= await randomItem.locator('.inventory_item_desc').innerText()
    const expectName= await randomItem.locator('.inventory_item_name').innerText()
    const expectPrice= await randomItem.locator('.inventory_item_price').innerText()

    console.log(`Price: ${expectPrice} Name: ${expectName} Description: ${expectName}`)

    await randomItem.getByRole('button',{name:'Add to car'}).click()
    await page.locator('a.shopping_cart_link').click()

    
    //realizar asercion
    expect(page.getByRole('button', {name: 'checkout'})).toBeVisible
    
    const actualName = await page.locator('.inventory_item_name').innerText()
    const actualDescription = await page.locator('.inventory_item_desc').innerText()
    const actualPrice = await page.locator('.inventory_item_price').innerText()

    expect(actualName).toEqual(expectName)
    expect(actualDescription).toEqual(expectDescription)
    expect(actualPrice).toEqual(expectPrice)
  
});


test('navigate ', async ({ page }) => {

    await page.goto(process.env.URL)
  
    const loginPage = new LoginPage(page)
    await loginPage.loginWithCredentials('standard_user','secret_sauce')
    await loginPage.checkSuccessFullLogin()
    await page.screenshot({path:'screenshots/login.png',fullPage:true})
  
});