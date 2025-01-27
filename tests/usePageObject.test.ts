import { expect, test } from '@playwright/test'
import { NavigationPage } from '..//page-objects/navigationPage'

let navigateTo: NavigationPage;

test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:4200/')
    navigateTo = new NavigationPage(page)
    
})


test ('test with page-object', async({page}) => {
  
    await navigateTo.formLayoutsPage(); //замість того щоб прописувати локатор, викликаємо метод який містить вже ці локатори
})

test ('test with page-object 2', async({page}) => {
    await navigateTo.formLayoutsPage()
    await navigateTo.datepickerPage();
    await navigateTo.smartTablePage()
    await navigateTo.toastrPage()
    await navigateTo.tooltipPage()
})
