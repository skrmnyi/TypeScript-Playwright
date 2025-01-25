import { expect, test } from '@playwright/test'

test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:4200/')
    
})
  test('tables', async({page})=>{
        await page.getByText('Tables & Data').click()
        await page.getByText('Smart Table').click()

        //метч рядка по унікальному значенню в ньому
       const targetRow = page.getByRole('row', {name: 'twitter@outlook.com'}) //спеціальна роль під рядок в таблиці
       await targetRow.locator('.nb-edit').click();

      await page.locator('input-editor').getByPlaceholder('Age').clear // placeholder="Age" так виглядає плейсхолдер в хтмл
      await page.locator('input-editor').getByPlaceholder('Age').fill('11') // placeholder="Age" так виглядає плейсхолдер в хтмл
      await page.locator('nb-checkmark').click()

      //якщо в рядку є унікальне зничання доприкладу айді, але воно може десь дублюватись ще в таблиці, тоді:
      //знаходимо рядокм, далі фільтруємо його по лактору, вказуємо індекс який означає стовпчик таблиці і ще раз вказуємо необхідне пошукове значення
        
    await page.locator('.ng2-smart-pagination-nav').getByText('2').click();
    const targetRowById = page.getByRole('row', { name: '11' }).filter({ has: page.locator('td').nth(1).getByText('11') });
    await targetRowById.locator('.nb-edit').click();
    await page.locator('input-editor').getByPlaceholder('E-mail').clear();
    await page.locator('input-editor').getByPlaceholder('E-mail').fill('test@test.com');
    await page.locator('.nb-checkmark').click();
    await expect(targetRowById.locator('td').nth(5)).toHaveText('test@test.com');
})

 test('tables 2', async({page})=>{
        await page.getByText('Tables & Data').click()
        await page.getByText('Smart Table').click()

        const ages = ['20', '200', '30', '40'] //тестові дані які потрібні для перевірки в тесті


        //цикл в циклі
        // 1 відповідає щоб клірити комірку та проставляти в ній велю з обєкта age
        // наступний цицкл збирає велю яке повертає таблиця і порівнює результат рядка з обєктом age
        
    
        for (let age of ages) {
            await page.locator('input-filter').getByPlaceholder('Age').clear();
            await page.locator('input-filter').getByPlaceholder('Age').fill(age);
            await page.waitForTimeout(500) //тест падає тому що таблиця оновлюється повільніше чим плейврайт записує результат 
            //тому тут спеціально заповільнюємо, щоб дочеатись фільтрації таблиці 

            const ageRows = page.locator('tbody tr') //локаторя який метчить всі рядки всередині тіла таблиці. 
            
            for (let row of await ageRows.all()) { //цикл який йде по кожному рядку таблиці завдяки методу all() 
                const ageCell = await row.locator('td').last().textContent() // на кожному витку цикла отрммуємо значення комірки age/ метод .last() дістає останнє значення локатору
                if(age == '200'){
                    expect(await page.getByRole('table').textContent()).toContain('No data found') //перевірка негативного сценарію, коли таблиця не повртає нічого
                } else {
                    expect(ageCell).toEqual(age) //перевіряємо що значення в комірці(-ках) таблиці дорівнює нашому значенню з обєкта
                }

            }
        }
 })       

