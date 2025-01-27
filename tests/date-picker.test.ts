import { expect, test } from '@playwright/test'

test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:4200/')

})
test('date-pickers', async ({ page }) => {
    await page.getByText('Forms').click()
    await page.getByText('Datepicker').click()

    const calendarInputField = page.getByPlaceholder('Form Picker')
    await calendarInputField.click(); //відкриває календар для вибору дати

    await page.locator('[class = "day-cell ng-star-inserted"]').getByText('24').click();
    await expect(calendarInputField).toHaveValue('Jan 24, 2025')

})
test('date-picker2', async ({ page }) => {
    await page.getByText('Forms').click()
    await page.getByText('Datepicker').click()

    const calendarInputField = page.getByPlaceholder('Form Picker')
    await calendarInputField.click(); //відкриває календар для вибору дати

    let date = new Date() // JS object for date and time
    date.setDate(date.getDate() + 20)
    
    const expectedDate = date.getDate().toString(); //getDate() повертає тільки день і обрізає лишнє
    const expectedMonthShort = date.toLocaleString('En-Us', { month: 'short' }) // переобразуває дату в короткий формат 'Jan'
    const expectedMonthLong = date.toLocaleString('En-Us', { month: 'long' }) // переобразуває дату в довгий формат 'January'
    const expectedYear = date.getFullYear().toString()


    let calendarMonthAndYear = await page.locator('nb-calendar-view-mode').textContent()
    const dateToassert = `${expectedMonthShort} ${expectedDate}, ${expectedYear}`
    const expectedMonthAndYear = ` ${expectedMonthLong} ${expectedYear} `
    console.log(expectedMonthAndYear)

    while(!calendarMonthAndYear.includes(expectedMonthAndYear)){ //допоки дата і рік на календарі не будуть відповідати необхідній, виконувати умову - переходити на наступний місяць
        await page.locator('button.next-month').click();
        calendarMonthAndYear = await page.locator('nb-calendar-view-mode').textContent()
        //спочатку ми отримуємо текст який відображаєтсья на календарі, якщо він не дорівнює нашій експектед даті
        //то необхідно натиснути на кнопку некст. так як після перемикання на кнопку некст в нас змінюється місяць
         // то викликаємо ще раз зчитування в expectedMonthAndYear  щоб записати нове значення щоб порівнювати вже актуальні дані на наступному витку
    }



    await page.locator('[class = "day-cell ng-star-inserted"]').getByText(expectedDate).click();
    await expect(calendarInputField).toHaveValue(dateToassert)


})


