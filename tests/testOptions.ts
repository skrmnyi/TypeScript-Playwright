import {test as base} from '@playwright/test'



export type TestOptions = { //оголошення нового користувацього типу TestOptions
    globalsQaURL: string  //обовязкове поле типу string 
}

export const test = base.extend<TestOptions>({  //розширює базовий тестовий об’єкт base, додаючи до нього кастомні опції, які відповідають TestOptions.
    globalsQaURL: ['', {option: true}] }) //передає масив з 2 елементів, пусту стрінгу, та буліан тру
    formLayoutsPage: async ({ page }, use) => { //функція use є частиною механізму фікстур,  Вона використовується для передачі значення, створеного у фікстурі, в тестовий контекст. Це дозволяє зробити результат доступним для тестів, які використовують цю фікстуру.
        await page.goto('/'); // Відкриває головну сторінку
        await page.getByText('Forms').click(); // Натискає на елемент із текстом 'Forms'
        await page.getByText('Form Layouts').click(); // Натискає на 'Form Layouts'
        await use(''); // Завершує використання, якщо потрібна передача значень
    }
