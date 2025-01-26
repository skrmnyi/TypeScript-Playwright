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
        await radioButton1.check({force:true}); //якщо радіобаттон має задізейблений статус або хайден. метод check клікає по радіобаттону
        const radioStatus = await radioButton1.isChecked();
        expect(radioStatus).toBeTruthy(); //tobeFalsy to be Truthy перевірка стейту радіобатона // general assetrion

        await page.getByRole('radio', {name:'Option 2'}).check({force:true})
        await expect(page.getByRole('radio', {name:'Option 2'})).toBeChecked();
        await expect(page.getByRole('radio', {name:'Option 1'})).not.toBeChecked(); //assertion по локатору  або просто .toBeFalthy(); 
    })

    test ('check-box element', async({page})=>{
        await page.getByText('Modal & Overlays').click()
        await page.getByText('Toastr').click()
        await page.getByRole('checkbox', {name: 'Hide on click'}).uncheck({force:true}); 
        await page.getByRole('checkbox', {name: 'Prevent arising of duplicate toast'}).check({force:true}); 

        const allBoxes = page.getByRole('checkbox')
       //цикл на те щоб прожати всі чексбокси і перевірити їх стейт box в даному випадку змінна по якій йде ітератор
        for(const box of await allBoxes.all()){ //метод all() перетворює локатор в масив, для того щоб 
            await box.check({force: true}); 
            expect(await box.isChecked).toBeTruthy();
            console.log(await allBoxes.all())
        }
  })
  test ('drop-downs', async({page}) => {
    const dropDownMenu = page.locator('ngx-header nb-select') // батьківський елемент + чайлд
    await dropDownMenu.click();

    page.getByRole('list') // витягувати значення з ліста в випадках UL тегу
    page.getByRole('listitem') // витягувати значення з ліста в випадках LI тегу

    const optionListItems = page.getByRole('list').locator('nb-option')
    await expect(optionListItems).toHaveText(['Light', 'Dark', 'Cosmic', 'Corporate'])
    await optionListItems.filter({hasText:'Cosmic'}).click(); // фільтрація локатора додаткова

    const headerElement = page.locator('nb-layout-header')
    await expect(headerElement).toHaveCSS('background-color', 'rgb(50, 50, 89)' ) // перевірка того що хедер має цей колір

    const colors = {
        'Light': 'rgb(255, 255, 255)', 
        'Dark': 'rgb(34, 43, 69)',
        'Cosmic': 'rgb(50, 50, 89)', // Виправлено назву 'Cocmic' на 'Cosmic'
        'Corporate': 'rgb(255, 255, 255)'
    }

    await dropDownMenu.click();     
    for (const color in colors) {
        await optionListItems.filter({hasText: color}).click(); // витягує з об'єкта ключ значення і підставляє в локатор для кліка
        await expect(headerElement).toHaveCSS('background-color', colors[color]); // повертає значення по ключу colors[color]
        if (color != "Corporate") {
            await dropDownMenu.click();
        }
    }
    })
    test ('tooltip element', async({page})=>{
        await page.getByText('Modal & Overlays').click()
        await page.getByText('Tooltip').click()

        const tooltipCard = page.locator('nb-card', {hasText: 'Tooltip Placements'})
        await tooltipCard.getByRole('button', {name: "Top"}).hover();
        

        //команда на фріз тултіпі command + \ при цьому требв бути в консолі в souces 

        const tooltipText =  await page.locator('nb-tooltip').textContent();
        expect(tooltipText).toEqual('This is a tooltip')
        
    })

    test('modal window or dialog browser box', async({page})=>{
        await page.getByText('Tables & Data').click()
        await page.getByText('Smart Table').click()


         //так як плейврайт по дефолту закриває браузерні модалки, то цей метод для того щоб коли модалка з таким 
         //текстом зявиться, то вона не закрилась, а прийнялась 

        page.on('dialog', dialog => {
            expect(dialog.message()).toEqual('Are you sure you want to delete?')
            dialog.accept()
        })

        await page.getByRole('table').locator('tr', {hasText: "mdo@gmail.com"}).locator('.nb-trash').click()
        //таблиця, потім рядок, який містить якесь унікалне значення, і далі вже по локатору необхідна комірка

        await expect(page.locator('table tr').first()).not.toHaveText('mdo@gmail.com') //tr - table row, перевірка того що перший рядок не містить даної почти - тобто вона видалена
    })
})