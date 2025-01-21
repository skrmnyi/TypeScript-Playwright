import { test } from '@playwright/test'  // імпорт тестового методу плейврайт для написання тесту


test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:4200/')
    await page.getByText('Forms').click()
    await page.getByText('Form Layouts').click()
})

test('locator syntax roles', async({page}) => {
   //by tag name
   //await page.locator('input').click();  //playwright find locators only when some action is made
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

test('user facing locators', async({page}) => {
    await page.getByRole('textbox', {name: "Email"}).first().click(); // role is a type of element that we trying interact for
    await page.getByRole('button', {name: "Sign in"}).first().click();


    await page.getByLabel('Email').first().click()
    await page.getByPlaceholder('Jane Doe').click()
    await page.getByText('Using the Grid').click()
    await page.getByTitle('IoT Dashboard').click()
    await page.getByTestId('example-id').click() // <div data-testid="example-id">Content</div> for this kind data-testid attribute is required in HTML

})

test ('location child elements', async({page}) => {
    await page.locator('nb-card nb-radio >> text=Option 1').click();
    await page.locator('nb-card nb-radio :text-is("Option 1")').click(); // nb-card parent then nb-radio child and text that should be founded
    await page.locator('nb-card').locator('nb-radio').locator(':text-is("Option 2")').click(); // the same as previous 

    await page.locator('nb-card').getByRole('button', {name: "Sign in"})
    await page.locator('nb-card').nth(3).getByRole('button').click()
});

test ('parent elemtns', async({page}) => {
    await page.locator('nb-card', {hasText: "Using the Grid"}).getByRole('textbox', {name: "Email"}).click() //nb-card батьківський елемент який серд чайлд елементів має текст Using the Grid
    await page.locator('nb-card', {hasText: "Basic Form"}).getByRole('textbox', {name: "Email"}).click()
    
    await page.locator('nb-card').filter({has:page.locator('#inputEmail1')}).getByRole('textbox', {name: "Email"}).click() //пошук по адішкі чайлда від перента //nb-card  
    await page.locator('nb-card').filter({hasText: "Basic form"}).getByRole('textbox', {name: "Email"}).click() //.filter спеціальний плейврайт метод, який фільтрує по тексту. 

    await page.locator('nb-card').filter({has: page.locator('nb-checkbox')}).filter({hasText: "Sign in"})
    .getByRole('textbox', {name: "Email"}).click() // комбінація методів .filter яка допомагає відфільтрувати необхідний локатор, 1 перент, потім, чекбоскс на якому є sign in кнопка
    //таким чином підбираючи унікальну комбінацію локатора
    
    await page.locator(':text-is("Using the Grid")').locator('..').getByRole('textbox', {name: "Email"}).click()
    //варіант через xpath який виходить на рівеннь верх на перент елмент і вже там шукає необхідне поле Email
})   
