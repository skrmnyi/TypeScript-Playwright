import {test as base} from '@playwright/test'
import { PageManager } from '../page-objects/pageManager';


export type TestOptions = { //оголошення нового користувацього типу TestOptions
    globalsQaURL: string,  //обовязкове поле типу string 
    formLayoutsPage: string, 
    pageManager: PageManager 
}

export const test = base.extend<TestOptions>({  //розширює базовий тестовий об’єкт base, додаючи до нього кастомні опції, які відповідають TestOptions.
    globalsQaURL: ['', {option: true}],   //передає масив з 2 елементів, пусту стрінгу, та буліан тру
    
    formLayoutsPage: [async ({ page }, use) => { //функція use є частиною механізму фікстур,  Вона використовується для передачі значення, створеного у фікстурі, в тестовий контекст. Це дозволяє зробити результат доступним для тестів, які використовують цю фікстуру.
        await page.goto('/') // Відкриває головну сторінку
        await page.getByText('Forms').click() // Натискає на елемент із текстом 'Forms'
        await page.getByText('Form Layouts').click() // Натискає на 'Form Layouts'
        await use('') // Завершує використання, якщо потрібна передача значень
    }, {auto: true}], //автоматичний запуск фікстури для тесту, не потрібно викликати методом(простий імпорт і це відпрацьовує)

    pageManager: async({page}, use) => { //для того щоб не імпортувати пейдж менеджер, а мати все в одному імпорті testOptions включно з page manager
        const pm = new PageManager(page)
        await use(pm)
    }


})