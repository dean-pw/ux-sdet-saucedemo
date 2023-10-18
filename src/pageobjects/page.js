const { browser } = require('@wdio/globals')
const Utilities = require('../utilities/helper')

/**
* main page object containing all methods, selectors and functionality
* that is shared across all page objects
*/
module.exports = class Page extends Utilities {
    /**
     * define selectors using getter methods
     */
    get #btnShoppingCart() {
        return $("a.shopping_cart_link");
    }

    get #lblShoppingCartItemCount() {
        return this.#btnShoppingCart.$(".shopping_cart_badge");
    }

    /**
     * define action methods
     */

    async clickShoppingCartIcon() {
        const e = await this.#btnShoppingCart;
        return e.click();
    }

    async verifyShoppingCartItemCount(count) {
        const element = await this.#lblShoppingCartItemCount;
        return await expect(element).toHaveText(count.toString());
    }

    async verifyShoppingCartItemCountNotExists() {
        // See documentation: https://webdriver.io/docs/api/element/waitForExist
        return await (await this.#lblShoppingCartItemCount).waitForExist({ reverse: true });
    }

    async open() {
        return this.navigateTo(browser.options.baseUrl);
    }
}
