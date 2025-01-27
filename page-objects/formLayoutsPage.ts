
import { Page } from "@playwright/test";
import { HelperBase } from "./helperBase";

export class FormLayoutsPage extends HelperBase {

    constructor(page: Page){ //У TypeScript, якщо ви наслідуєте клас і маєте свій власний конструктор, ви повинні викликати конструктор батьківського класу за допомогою super, інакше виникає помилка.
        super(page)
        //	•	Метод super викликає конструктор батьківського класу HelperBase і передає йому необхідні аргументи.
    }

     //метод який заповнить відразу 3 форми, даними які передамо параметром
    async submitUsingTheGridFormWithCredentialsAndSelectOption(email: string, password: string, optionText: string){
        const usingTheGridForm = this.page.locator('nb-card', {hasText: 'Using the Grid'})
        await usingTheGridForm.getByRole('textbox', {name: "Email"}).fill(email)
        await usingTheGridForm.getByRole('textbox', {name: "Password"}).fill(password)
        await usingTheGridForm.getByRole('radio', {name: optionText}).check({force: true})
        await usingTheGridForm.getByRole('button').click()
        await this.waitForNumberOfSeconds(12)
    }

    //заповнить 2 форми, і проставить чекбокс в залежності від тру/фолс
    /**
     * 
     * @param name - this method fill the form with params
     * @param email - enter valid email of user
     * @param rememberMe - true would be marked / false - would be unmarcked checkbox
     */
    async submitInlineFormWithNameEmailAndCheckbox(name: string, email: string, rememberMe: boolean) {
        const inlineForm = this.page.locator('nb-card', { hasText: "Inline form" });
        await inlineForm.getByRole('textbox', { name: "Jane Doe" }).fill(name);
        await inlineForm.getByRole('textbox', { name: "Email" }).fill(email);
        if (rememberMe) {
            await inlineForm.getByRole('checkbox').check({ force: true });
        }
        await inlineForm.getByRole('button').click();
    }
}