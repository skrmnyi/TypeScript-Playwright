import { expect, test } from '@playwright/test'

test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:4200/')
    
})

test.describe('Form Layouts Page', ()=> {
    test.beforeEach(async ({ page }) => {
        await page.getByText('Forms').click()
        await page.getByText('Form Layouts').click()
    })
   

    test ('Input Fields', async({page}) =>{
        const emailInput = page.locator('#inputEmail1');

        await emailInput.fill('email@gmail.com') //заповнення тексту в інпут
        
        await emailInput.clear() //очищення тексту в інпуті
        await emailInput.pressSequentially('email@gmail.com', {delay: 500}) //заповнення тексту в інпут повільно, з затримкою

        //Gemera; assertion
        var emailGrabText = await emailInput.inputValue(); //зібрати текст з інпута
        expect(emailGrabText).toEqual('email@gmail.com') //

        //Locator assertion

        await expect(emailInput).toHaveValue('email@gmail.com')

    })

    test('Radio Buttons', async({page}) => {

        const radioButton1 =  page.locator('nb-card', {hasText:'Using the Grid'}).getByLabel('Option 1')
        //await radioButton1.check();
        await radioButton1.check({force:true}); //якщо радіобаттон має задізейблений статус або хайден
        
        await page.getByRole('radio', {name:'Option 2'}).check({force:true})

        
       
       
    })
}) 