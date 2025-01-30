import { expect, test } from '@playwright/test'
import { PageManager } from '../page-objects/pageManager';
import {faker} from '@faker-js/faker'
import { argosScreenshot } from "@argos-ci/playwright";

test.beforeEach(async ({ page }) => {
    await page.goto('/');
});

test('navigate to form page @smoke @regression', async ({ page }) => { //теги для тестів
    const pm = new PageManager(page);
    await pm.navigateTo().formLayoutsPage();
    await argosScreenshot(page, 'FormLayousPage');
    await pm.navigateTo().datepickerPage();
    await argosScreenshot(page, 'DatePicker Page');
    // await pm.navigateTo().smartTablePage();
    // await pm.navigateTo().toastrPage();
    // await pm.navigateTo().tooltipPage();
});

test('parametrized methods @smoke', async ({ page }) => { // в подальшому омжна запускати тести по тегам playwright test --project=chromium --grep @smoke
    const pm = new PageManager(page);
    const randomFullName = faker.person.fullName();
    const randomEmail = `${randomFullName.replace(' ', '')}${faker.number.int(1000)}@test.com`;

    await pm.navigateTo().formLayoutsPage();
    await pm.onFormLayoutsPage().submitUsingTheGridFormWithCredentialsAndSelectOption('test@test.com', 'Welcome1', 'Option 2');
    await argosScreenshot(page, 'Filled Input');
    await pm.onFormLayoutsPage().submitInlineFormWithNameEmailAndCheckbox( randomFullName, randomEmail, false);

    // await pm.navigateTo().datepickerPage();
    // await pm.onDatepickerPage().selectCommonDatePickerDateFromToday(10);
    // await pm.onDatepickerPage().selectDatepickerWithRangeFromToday(6, 10);
});