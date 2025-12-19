import {expect, Page} from '@playwright/test'

export class LoginPage {
    constructor(private page: Page){}

    async goToUrl(url: string) {
        await this.page.goto(url);

    }

    async login(username: string, password: string){
        await this.page.getByPlaceholder('Enter your email').fill(username)
        await this.page.getByRole("textbox", {name: 'Password'}).fill(password)
        await this.page.getByRole("button", {name: "Login"}).click()
    }
    async assertLoginError(errorMessage: string){
        const failedAssertion = await this.page.locator('div[data-testid="login-error"]').textContent()
        console.log('Error Message:', failedAssertion)
        expect(failedAssertion).toContain(errorMessage)
    }
    async assertLoginSuccess(successMessage: string){
        const loginSucessAssertion = await this.page.locator('div[data-testid="login-success"]').textContent()
        console.log("Success message is:", loginSucessAssertion)
        expect(loginSucessAssertion).toContain(successMessage)
    }
    async closePage(){
        await this.page.close()
        console.log("Current page has been closed")
    }
}