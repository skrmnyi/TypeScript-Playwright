import {test} from '@playwright/test'  // імпорт тестового методу плейврайт для написання тесту


test.beforeEach(async({page}) => {
await page.goto('http://localhost:4200/')
})

test.describe.only('suite1', ()=> { 
    test.beforeEach(async({page}) => {
 await page.getByText('Charts').click()
    })

    test('the first test', async ({page}) => {
       await page.getByText('Form Layouts').click() 
    })

    test('navigate to datepickger page', async ({page}) => {
        await page.getByText('Datepicker').click() 
     })
 })     

 test.describe.only('suite2', ()=> { 
    test.beforeEach(async({page}) => {
        await page.getByTestId('Forms').click()
    })

    test('the first test1', async ({page}) =>{
        await page.getByAltText('Form Layouts').click
    })
})