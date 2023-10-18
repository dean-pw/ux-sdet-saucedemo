const Page = require('./page');
const assert = require('assert');

/**
 * sub page containing specific selectors and methods for a specific page
 */
class ProductsPage extends Page {
    /**
     * define selectors using getter methods
     */

    // Hamburger Icon (Button): Navigation Menu Button
    get #btnNavigationMenu() {
        return $("button[id=react-burger-menu-btn]");
    }

    // Dropdown: Product Sort
    get #ddProductSort() {
        return $("select.product_sort_container")
    }

    get #productItems() {
        return $$("div.inventory_item");
    }

    async #btnAddToCart(itemName) {
        const id = "add-to-cart";
        return await $(`//*[text()='${itemName}']/ancestor::div[@class='inventory_item_description']//*[contains(@id,'${id}')]`);
    }

    async #btnRemove(itemName) {
        const id = "remove";
        return await $(`//*[text()='${itemName}']/ancestor::div[@class='inventory_item_description']//*[contains(@id,'${id}')]`);
    }

    /**
     * define action methods
     */

    async getProductDescription(itemName) {
        const itemElement = await $(`//*[text()='${itemName}']/ancestor::div[@class='inventory_item']`);
        return this.#getProductDataBy(itemElement, "by-desc");
    }

    async getProductPrice(itemName) {
        const itemElement = await $(`//*[text()='${itemName}']/ancestor::div[@class='inventory_item']`);
        return this.#getProductDataBy(itemElement, "by-price");
    }

    // Click Add to cart button
    // itemName: name of the product
    async clickAddToCartButton(itemName) {
        const e = await this.#btnAddToCart(await itemName);
        return await e.click()
    }

    // Click Remove button
    // itemName: name of the product
    async clickRemoveButton(itemName) {
        const e = await this.#btnRemove(await itemName);
        return await e.click()
    }

    async clickShoppingCartIcon() {
        return super.clickShoppingCartIcon();
    }

    // Click Navigation Menu (Hamburger Icon)
    async clickNavigationMenu(value) {
        const e = await this.#btnNavigationMenu;
        return await e.click();
    }

    // Select Product Sort Method
    async selectSortMethod(method) {
        const e = await this.#ddProductSort;
        return e.selectByVisibleText(method);
    }

    // Get products data in the list by price or by name
    // itemElement: element for the product
    // method: (string) "by-name", "by-price", "by-desc"
    async #getProductDataBy(itemElement, method) {
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
            default:
                throw new Error('Invalid argument value.');
        }

        const e = await itemElement.$(locator);
        let item = await e.getText();

        if (method.toLowerCase() == "by-price") {
            item = Number(await item.substring(1));
        }

        return item;
    }

    // Get the products data in the list by price or by name
    // method: (string) "by-name", "by-price"
    async getProductListBy(method) {
        const itemElements = await this.#productItems;
        let item = null;
        let list = [];

        // product data based on price/name will be assigned to the list
        for (const element of itemElements) {
            item = await this.#getProductDataBy(element, method);
            list.push(item);
        }

        return list;
    }

    /**
     * define assertion methods
     */

    async verifyProductsAfterSort(orderBy, getDataBy) {
        const list = await this.getProductListBy(getDataBy);
        const sortedList = await this.sortArray(list, orderBy);
        const expected = JSON.stringify(sortedList);

        const actualList = await this.getProductListBy(getDataBy);
        const actual = JSON.stringify(actualList);
        return assert.deepEqual(expected, actual, 'Arrays should be equal');
    }

    async verifyProductButtonText(itemName, expectedText) {
        let locator = null;

        switch (expectedText.toLowerCase()) {
            case "add to cart":
                locator = await this.#btnAddToCart(itemName);
                break;
            case "remove":
                locator = await this.#btnRemove(itemName);
                break;
            default:
                throw new Error(`${expectedText} does not exist.`);
        }

        return await expect(locator).toHaveText(expectedText);
    }

    async verifyShoppingCartItemCount(count) {
        return await super.verifyShoppingCartItemCount(count);
    }

    async verifyShoppingCartItemCountNotExists() {
        return await super.verifyShoppingCartItemCountNotExists();
    }

    /**
     * a method to encapsule automation code to interact with the page
     * 
     */

}

module.exports = new ProductsPage();
