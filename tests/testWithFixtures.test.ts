
//import { test, expect } from '@playwright/test'; 
import { test } from './testOptions'; //- імпортуємо не дефолтний тест плейврайта, а фікстуру 
import { faker } from '@faker-js/faker';

// test.beforeEach(async ({ page }) => {
//     await page.goto('/');
// }); - 

test('fixture usage', async ({ pageManager}) => {

    const randomFullName = faker.person.fullName();
    const randomEmail = `${randomFullName.replace(' ', '')}${faker.number.int(1000)}@test.com`;

    //await pm.navigateTo().formLayoutsPage();
     await pageManager.onFormLayoutsPage().submitUsingTheGridFormWithCredentialsAndSelectOption( process.env.USERNAME,
    process.env.PASSWORD, 'Option 2')
    await pageManager.onFormLayoutsPage().submitInlineFormWithNameEmailAndCheckbox( randomFullName, randomEmail, false);

});