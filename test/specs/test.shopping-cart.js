const loginPage = require('../../src/pageobjects/login.page')
const productsPage = require('../../src/pageobjects/products.page')
const shoppingCartPage = require('../../src/pageobjects/shopping-cart.page')

describe('Shopping cart tests', () => {
    before(async () => {
        const username = "standard_user";
        const password = "secret_sauce";

        // Login to application
        await loginPage.open();
        await loginPage.login(username, password);
        await loginPage.maximizeWindow();
    })

    /**
     * Test Name: Add item to the shopping cart
     * Test Description:
     *      Validate that clicking “Add to Cart” shows the selected product 
     *      in the shopping cart and updates the cart icon item count.
     */
    it('should add item to the shopping cart', async () => {
        const itemName = "Sauce Labs Fleece Jacket";
        const itemDescription = await productsPage.getProductDescription(itemName);
        const itemPrice = await productsPage.getProductPrice(itemName);

        // Select a product
        // Click the "Add to cart" button
        await productsPage.clickAddToCartButton(itemName);

        // The button name should be updated to “Remove”.
        await productsPage.verifyProductButtonText(itemName, "Remove");

        // The updated item count in the cart icon should be displayed.
        await productsPage.verifyShoppingCartItemCount(1);

        // Click the cart icon
        await productsPage.clickShoppingCartIcon();

        // The updated item count in the cart icon should be displayed.
        await shoppingCartPage.verifyShoppingCartItemCount(1);

        await shoppingCartPage.verifyProductDetails(itemName, itemDescription, itemPrice);
    });

    /**
         * Test Name: Remove the product from the shopping cart
         * Test Description:
         *      Validate that clicking the “Remove” button on the product removes   
         *      the selected product from the shopping cart and the cart icon item count.
         */
    it('should remove the product from the shopping cart', async () => {
        const itemName = "Sauce Labs Fleece Jacket";

        // Click the “Remove” button on the product.
        await shoppingCartPage.clickRemoveButton(itemName);

        // The button name should be updated to “Remove”.
        await shoppingCartPage.verifyProductAfterRemoving(itemName);

        // The cart icon item count should not be displayed.
        await shoppingCartPage.verifyShoppingCartItemCountNotExists();

        // Click the “Continue Shopping” button.
        await shoppingCartPage.clickContinueShoppingButton();

        // The "Add to cart" button should be displayed for the item removed from the shopping cart. 
        await productsPage.verifyProductButtonText(itemName, "Add to cart");

        // The cart icon item count should not be displayed.
        await productsPage.verifyShoppingCartItemCountNotExists();
    });
})

