import { test , expect } from "@playwright/test"
import { LoginPage } from "../pages/login.page"
import { asyncWrapProviders } from "async_hooks"

const url = 'https://playground.tester4testers.com/challenge/1'
const validUsername = "user@example.com"
const validPassword = "Password123!"
const wrongPassword = "BadPassword"


test.describe('Login User Interface', () => {
    test('Login Success with valid credentials', async ({page}) => {
        const loginPage = new LoginPage(page)
        await loginPage.goToUrl(url)
        await loginPage.login(validUsername, validPassword)
        await loginPage.assertLoginSuccess('Login Successful!')
        await loginPage.closePage()
    })

    test('Login failed with bad password', async ({page}) => {
        const loginPage = new LoginPage(page)
        await loginPage.goToUrl(url)
        await loginPage.login(validUsername, wrongPassword)
        await loginPage.assertLoginError("Login Failed")
        await loginPage.closePage()
    })
})
