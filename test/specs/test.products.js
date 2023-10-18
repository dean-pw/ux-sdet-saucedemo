const loginPage = require('../../src/pageobjects/login.page')
const productsPage = require('../../src/pageobjects/products.page')

describe('Products tests', () => {
    beforeEach(async () => {
        const username = "standard_user";
        const password = "secret_sauce";

        // Login to application
        await loginPage.open();
        await loginPage.login(username, password);
        await loginPage.maximizeWindow();
    })

    /**
     * Test Name: Sort products by name in Z-A order
     * Test Description:
     *      Validate that the products are sorted by name in Z to A order
     */
    it('should sort products by name in Z to A order', async () => {
        // Select “Name (Z to A)” in the dropdown
        await productsPage.selectSortMethod("Name (Z to A)");

        // The products should be sorted by name in Z to A order
        await productsPage.verifyProductsAfterSort("desc", "by-name");
    })

    /**
     * Test Name: Sort products by price in ascending order
     * Test Description:
     *      Validate that the products are sorted by price in ascending order
     */
    it('should sort products by price in ascending order', async () => {
        // Select “Price (low to high)” in the dropdown
        await productsPage.selectSortMethod("Price (low to high)");

        // The products should be sorted by price in ascending order.
        await productsPage.verifyProductsAfterSort("asc", "by-price");
    })
})

