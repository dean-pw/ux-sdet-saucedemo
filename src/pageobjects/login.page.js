const Page = require('./page');

/**
 * sub page containing specific selectors and methods for a specific page
 */
class LoginPage extends Page {

    /**
     * define selectors using getter methods
     */

    // Text field: Username
    get #txtUsername() {
        return $("input[id=user-name]");
    }

    // Text field: Passsword
    get #txtPassword() {
        return $("input[id=password]");
    }

    // Button: Login
    get #btnLogin() {
        return $("input[id=login-button]");
    }

    // Error Message Label
    get #errMsgLabel() {
        return $("div.error > h3");
    }

    /**
     * define action methods
     */

    // Text field: Username
    async enterUsername(value) {
        const e = await this.#txtUsername;
        return await e.setValue(value);
    }

    // Text field: Passsword
    async enterPassword(value) {
        const e = await this.#txtPassword;
        return await e.setValue(value);
    }

    // Button: Login
    async clickLoginButton(value) {
        const e = await this.#btnLogin;
        return await e.click();
    }

    /**
     * define assertion methods
     */
    async verifyTxtUsernameInputError() {
        const e = await this.#txtUsername;
        return await expect(e).toHaveAttributeContaining("class", "error");
    }

    async verifyTxtPasswordInputError() {
        const e = await this.#txtPassword;
        return await expect(e).toHaveAttributeContaining("class", "error");
    }

    async verifyErrorMessage(message) {
        const e = await this.#errMsgLabel;
        return await expect(e).toHaveText(message);
    }

    /**
     * a method to encapsule automation code to interact with the page
     * e.g. to login using username and password
     */
    async login(username, password) {
        await this.enterUsername(username);
        await this.enterPassword(password);
        await this.clickLoginButton();
    }
}

module.exports = new LoginPage();
