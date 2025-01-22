import { test, expect } from '@playwright/test'  // імпорт тестового методу плейврайт для написання тесту


test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:4200/')
    await page.getByText('Forms').click()
    await page.getByText('Form Layouts').click()
})

test('reusing locators', async({page}) => {
   await page.locator('nb-card', {hasText: "Basic Form"}).getByRole('textbox', {name: "Email"}).fill('test@gmail.@com')
   await page.locator('nb-card', {hasText: "Basic Form"}).getByRole('textbox', {name: "Password"}).fill('1234324' )
   await page.locator('nb-card', {hasText: "Basic Form"}).getByRole('button', {name: 'Submit'}).click()


   //для того щоб не дублювати 3 строки кожного разу і не повторювати код, створюємо константою запис basic form 
   //і далі кожного разу не повторюємо це

   const basicForm =  page.locator('nb-card', {hasText: "Basic Form"}); 
   const emailField =  basicForm.getByRole('textbox', {name: "Email"});  //константа з використанням попередньої константи

   await emailField.fill('test@gmail.@com')
   await basicForm.getByRole('textbox', {name: "Password"}).fill('1234324')
   await basicForm.locator('nb-checkbox').click();
   await basicForm.getByRole('button', {name: 'Submit'}).click()

   await expect(emailField).toHaveValue('test@gmail.@com');

})