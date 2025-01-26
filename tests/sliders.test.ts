import { expect, test } from '@playwright/test'

test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:4200/')

})

test('sliders', async ({ page }) => {
    const tempGauge = page.locator('[tabtitle="Temperature"] ngx-temperature-dragger circle')

    //метод через який ми змінюємо html атрибути щоб змінити локацію повзунка
    await tempGauge.evaluate(node => {
        node.setAttribute('cx', '232.630')
        node.setAttribute('cy', '232.630')
    })
    await tempGauge.click()
    await expect(page.locator('[class="value temperature h1"]')).toContainText('29')

    //реалізація з рухом курсора, тобто склік по ньому і рух мишки

    // Mouse movement
    const tempBox = page.locator('[tabtitle="Temperature"] ngx-temperature-dragger');
    await tempBox.scrollIntoViewIfNeeded();

    const box = await tempBox.boundingBox();
    const x = box.x + box.width / 2; //визначаємо центр повзунка, розділивши кординату х на ширину бокса в якому знаходитсья графік
    const y = box.y + box.height / 2;

    await page.mouse.move(x, y);
    await page.mouse.down();
    await page.mouse.move(x + 100, y); //рухаємо повнунок змінюючи кординати, добавляючи пікселі
    await page.mouse.move(x + 100, y + 100); 
    await page.mouse.up();

    await expect(tempBox).toContainText('30');

})