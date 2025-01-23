import { expect, test } from '@playwright/test'

test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:4200/')
    await page.getByText('Forms').click()
    await page.getByText('Form Layouts').click()
})

test('assertions', async({page}) => {
const basicFormButton = page.locator('nb-card').filter({hasText: 'Basic form'}).locator('button')

//General assertions - не чекає на появу елемента
const value = 5; 
expect(value).toEqual(5); //саме примітивне порівння значення зліва дорівнює значенню спрва

expect(await basicFormButton.textContent()).toEqual('Submit')

//Locator Assertion - чекає до 5 секунд на елемент
await expect(basicFormButton).toHaveText('Submit')

//Soft Assertion - тест продовжитсья навіть якщо ассершин буде фейлд

await expect.soft(basicFormButton).toHaveText('Submit12')
await basicFormButton.click();

}) 