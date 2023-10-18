const loginPage = require('../../src/pageobjects/login.page')

describe('Login tests', () => {
    /**
     * Test Description:
     *      Validate that logging in with an invalid password
     *      shows an error message and error icons.
     */
    it('should show error messages and error icons when login with invalid password', async () => {
        const username = "standard_user";
        const password = "secret_sauce_incorrect";

        await loginPage.open();

        // Enter valid username 
        // Enter invalid password
        // Click “Login” button
        await loginPage.login(username, password);

        // An error message should be displayed, indicating that the login failed.
        await loginPage.verifyErrorMessage("Epic sadface: Username and password do not match any user in this service");

        // Validate username input field
        // An error icon should be displayed
        await loginPage.verifyTxtUsernameInputError();

        // Validate password input field
        // An error icon should be displayed
        await loginPage.verifyTxtPasswordInputError();
    })
})

