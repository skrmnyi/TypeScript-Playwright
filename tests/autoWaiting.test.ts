import { expect, test } from '@playwright/test'

test.beforeEach(async ({ page }) => {
    await page.goto(process.env.URL)
    await page.getByRole('button', {name: 'Button Triggering AJAX Request'}).click();
   
})

test('auto-waiting example', async({page}) => {
    const successButton = await page.locator('.bg-success')
    await successButton.click(); //click є методом який очікується допоки не зявиться елемент

    const text =  await successButton.allTextContents(); //тест падає тому що allTextContents не чеає на елемент
    await successButton.waitFor({state: 'attached'}) // для того щоб збільшити таймайт прописуємо умову, чекати до певного стейту
    expect(text).toContain('Data loaded with AJAX get request.')


    await expect(successButton).toHaveText('Data loaded with AJAX get request.', {timeout:20000}) //ще один спосіб збільшити таймайут
})

test('alternative waits', async({page}) => {

    const successButton = page.locator('.bg-success')
    //__wait for element
    await page.waitForSelector('.bg-success')

    const text =  await successButton.allTextContents();
    await successButton.waitFor({state: 'attached'})
    expect(text).toContain('Data loaded with AJAX get request.')

    //__wait for API responce
    await page.waitForResponse('http://uitestingplayground.com/ajaxdata') //чекаємо допоки ен відрпацює ріквест
    await page.waitForLoadState('networkidle') //чекаємо допоки всі ріквести не відрпацюють - НЕ рекомендується

    



})