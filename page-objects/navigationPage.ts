import { Page } from "@playwright/test";
import { HelperBase } from "./helperBase";

export class NavigationPage extends HelperBase { //export означає що клас можна експортувати в в інші класи

    // конструктор  який виконується під час створення нового об’єкта цього класу
    constructor(page: Page) { // 	constructor(page: Page) — це метод, який приймає параметр page (об’єкт Playwright сторінки).
        super(page) // this.page = page; — тут параметр page зберігається у властивості класу this.page.
    }

    //Що відбувається під час створення нового об’єкта класу?
    //Playwright передає сторінку page до конструктора класу. Конструктор зберігає цей об’єкт у властивості this.page, щоб методи класу могли працювати з цією сторінкою.

    async formLayoutsPage() {
        await this.selectGroupMenuItem('Forms')
        await this.page.getByText('Form Layouts').click();
    }

    async datepickerPage() {
        await this.selectGroupMenuItem('Forms')
        await this.page.getByText('Datepicker').click();
    }

    async smartTablePage() {
        await this.selectGroupMenuItem('Tables & Data')
        await this.page.getByText('Smart Table').click();
    }

    async toastrPage() {
        await this.selectGroupMenuItem('Modal & Overlays')
        await this.page.getByText('Toastr').click();
    }

    async tooltipPage() {
        await this.selectGroupMenuItem('Modal & Overlays')
        await this.page.getByText('Tooltip').click();
    }

    //смарт метод, який перевіряє чи розгорнуті компоненти меню. якщо згорнуті -> стейт атрибуту фалсе, то тоді потрібно ще раз клікнути по менюшці щоб розгорнути її
    //потрібно під час переклікування по різним сторінкам щоб всі меню розділи були розгорнуті при навігації
    //метод прайват, щоб він використовувся тільки всередині цього класу і не перезаписувався
    private async selectGroupMenuItem(groupItemTitle: string) {
        const groupMenuItem = this.page.getByTitle(groupItemTitle);
        const expandedState = await groupMenuItem.getAttribute('aria-expanded');
        if (expandedState === "false") {
          await groupMenuItem.click();
        }
      }
}

