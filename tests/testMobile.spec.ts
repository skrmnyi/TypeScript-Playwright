import { test, expect } from '@playwright/test';

test('input fields', async ({ page }, testInfo) => {
  await page.goto('/');
  if(testInfo.project.name == 'mobile') {
    await page.locator('ngx-header').getByRole('link').first().click()
  }

  await page.getByText('Forms').click();
  await page.getByText('Form Layouts').click();
  if(testInfo.project.name == 'mobile') {
    await page.locator('ngx-header').getByRole('link').first().click()
  }
  const usingTheGridEmailInput = page.locator('nb-card', { hasText: 'Using the Grid' }).getByPlaceholder('Email');

  await usingTheGridEmailInput.fill('test@test.com');
  await usingTheGridEmailInput.clear();
  await usingTheGridEmailInput.type('test2@test.com');
});