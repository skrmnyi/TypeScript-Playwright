import { test } from '@playwright/test'  // імпорт тестового методу плейврайт для написання тесту


test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:4200/')
    await page.getByText('Forms').click()
    await page.getByText('Form Layouts').click()
})

test('locator syntax roles', async({page}) => {
   //by tag name
   await page.locator('input').click();  //playwright find locators only when some action is made
   //by ID 
   page.locator('#inputEmail1')
   //by class value (partly - any part of class - contains)
   page.locator('.shape-rectangle')
   // by attribute
   page.locator('[placeholder="Email"]')
   // by clas value (full)
   page.locator('[class="input-full-width size-medium status-basic shape-rectangle nb-transition"]')
   //combine different locators
   page.locator('input[placeholder="Email"].shape-rectangle')
   //by Xpath [NOT recomended]
   page.locator('//*[id="inputEmail"]')
   // by partial text match
   page.locator('text:("Using")')
    // by exact text match
    page.locator('text-is:("Using the grid")')


}) 