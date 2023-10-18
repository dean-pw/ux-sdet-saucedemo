const Page = require('./page');

/**
 * sub page containing specific selectors and methods for a specific page
 */
class ShoppingCartPage extends Page {
    /**
     * define selectors using getter methods
     */

    get #btnContinueShopping() {
        return $("button#continue-shopping");
    }

    // Get element of the product data in the list by price or by name
    // itemElement: element for the product
    // method: (string) "by-name", "by-price", "by-desc"
    async #getProductElementBy(itemElement, method) {
        if (typeof method !== 'string') {
            throw new Error('Incorrect method type, only accepts a string.');
        }

        let locator = null;

        switch (method.toLowerCase()) {
            case "by-name":
                locator = "div.inventory_item_name";
                break;
            case "by-price":
                locator = "div.inventory_item_price";
                break;
            case "by-desc":
                locator = "div.inventory_item_desc";
                break;
            case "by-button":
                locator = "//button[contains(@id, 'remove')]";
                break;
            default:
                throw new Error('Invalid argument value.');
        }

        return await itemElement.$(locator);
    }

    async #btnRemove(itemName) {
        const item = await this.#getCartItem(itemName);
        return await this.#getProductElementBy(item, "by-button");
    }

    async #getCartItem(itemName) {
        return await $(`//*[text()='${itemName}']/ancestor::div[@class='cart_item']`);
    }


    /**
     * define action methods
     */
    async clickContinueShoppingButton() {
        const e = await this.#btnContinueShopping;
        return await e.click();
    }

    async clickRemoveButton(itemName) {
        const e = await this.#btnRemove(itemName);
        return await e.click();
    }

    /**
     * define assertion methods
     */
    async verifyProductAfterRemoving(itemName) {
        return (await this.#getCartItem(itemName)).waitForExist({ reverse: true });
    }

    async verifyShoppingCartItemCount(count) {
        return await super.verifyShoppingCartItemCount(count);
    }

    async verifyShoppingCartItemCountNotExists() {
        return super.verifyShoppingCartItemCountNotExists();
    }

    async verifyProductDetails(itemName, itemDescription, itemPrice) {
        const itemElement = await this.#getCartItem(itemName);

        const cartElementItemName = await this.#getProductElementBy(itemElement, "by-name");
        const cartElementItemDescription = await this.#getProductElementBy(itemElement, "by-desc");
        const cartElementItemPrice = await this.#getProductElementBy(itemElement, "by-price");

        await expect(cartElementItemName).toHaveText(itemName);
        await expect(cartElementItemDescription).toHaveText(itemDescription);

        return await expect(cartElementItemPrice).toHaveText("$" + itemPrice);
    }

    /**
     * a method to encapsule automation code to interact with the page
     * 
     */

}

module.exports = new ShoppingCartPage();
