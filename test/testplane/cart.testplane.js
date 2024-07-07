import { BUG_ID, BASE_URL } from "./constants";

const url = Boolean(BUG_ID)
  ? `${BASE_URL}/catalog/0?bug_id=${BUG_ID}`
  : `${BASE_URL}/catalog/0`;
const cartUrl = Boolean(BUG_ID)
  ? `${BASE_URL}/cart?bug_id=${BUG_ID}`
  : `${BASE_URL}/cart`;

describe("Корзина: ", () => {
  it("в шапке рядом со ссылкой на корзину должно отображаться количество не повторяющихся товаров в ней", async ({
    browser,
  }) => {
    await browser.url(url);

    const addToCartButton = await browser.$(".ProductDetails-AddToCart");
    await addToCartButton.click();

    const cartLink = await browser.$('.nav-link[href="/hw/store/cart"]');
    const cartItemCount = await cartLink.getText();
    await expect(cartItemCount).toContain("Cart (1)");
  });

  it("должна отображаться таблица с добавленными в нее товарами", async ({
    browser,
  }) => {
    await browser.url(url);
    const addToCartButton = await browser.$(".ProductDetails-AddToCart");
    await addToCartButton.click();

    const cartLink = await browser.$('.nav-link[href="/hw/store/cart"]');
    await cartLink.click();

    const cartTable = await browser.$(".Cart-Table");
    await expect(cartTable).toBeDisplayed();

    const cartItemRow = await browser.$('tr[data-testid="0"]');
    await expect(cartItemRow).toBeDisplayed();

    const cartItemName = await browser.$(".Cart-Name");
    const cartItemPrice = await browser.$(".Cart-Price");
    const cartItemCount = await browser.$(".Cart-Count");
    const cartItemTotal = await browser.$(".Cart-Total");

    await expect(cartItemName).toBeDisplayed();
    await expect(cartItemPrice).toBeDisplayed();
    await expect(cartItemCount).toBeDisplayed();
    await expect(cartItemTotal).toBeDisplayed();

    const cartOrderPrice = await browser.$(".Cart-OrderPrice");
    await expect(cartOrderPrice).toBeDisplayed();
  });

  it("в корзине должна быть кнопка 'очистить корзину', по нажатию на которую все товары должны удаляться", async ({
    browser,
  }) => {
    await browser.url(url);

    const addToCartButton = await browser.$(".ProductDetails-AddToCart");
    await addToCartButton.click();

    const cartLink = await browser.$('.nav-link[href="/hw/store/cart"]');
    await cartLink.click();

    const clearCartButton = await browser.$(".Cart-Clear");
    await clearCartButton.click();

    const cartItems = await browser.$$(".Cart-Table tbody tr");
    await expect(cartItems.length).toBe(0, "Cart is not empty after clearing");

    const catalogLink = await browser.$('.Cart a[href="/hw/store/catalog"]');
    await expect(catalogLink).toBeDisplayed();
  });

  it("если корзина пустая, должна отображаться ссылка на каталог товаров", async ({
    browser,
  }) => {
    await browser.url(cartUrl);

    const emptyCartMessage = await browser.$(".Cart");
    await expect(emptyCartMessage).toHaveTextContaining(
      "Cart is empty. Please select products in the catalog."
    );

    const catalogLink = await browser.$('.Cart a[href="/hw/store/catalog"]');
    await expect(catalogLink).toBeDisplayed();
  });
});
