import { expect, test } from '@playwright/test'

test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:4200/')
    await page.getByText('Forms').click()
    await page.getByText('Form Layouts').click()
})

test('extracting values', async({page}) =>{
    const basicForm =  page.locator('nb-card').filter({hasText: "Basic Form"}); 
    //single text value
    const buttonText = await basicForm.locator('button').textContent();  // .textContent() метод який витягує текст з локатора та записує його в констант змінну
    expect(buttonText).toEqual('Submit')
    //all test value
    const radioButton = await page.locator('nb-radio').allTextContents(); // allTextContents() для того щоб витягнути всі дані по локатру
    console.log(radioButton)
    expect(radioButton).toContain('Option 1')

    //input text value (typed into input by user)

    const emailField =  basicForm.getByRole('textbox', {name: "Email"})
    await emailField.fill('test@test.com')
    const emailValue = await emailField.inputValue() //.inputValue метод який витягує текст з інпута


    const placeholderValue = await emailField.getAttribute('placeholder')
    expect(placeholderValue).toEqual('Email')

})