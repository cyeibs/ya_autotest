import { BASE_URL, BUG_ID } from "./constants";

const url = Boolean(BUG_ID)
  ? `${BASE_URL}/catalog/0?bug_id=${BUG_ID}`
  : `${BASE_URL}/catalog/0`;

describe("Страница с подробной информацией о товаре", () => {
  it("для каждого товара в каталоге отображается название, цена и ссылка на страницу с подробной информацией о товаре", async ({
    browser,
  }) => {
    await browser.url(url);

    const productName = await browser.$(".ProductDetails-Name");
    const productDescription = await browser.$(".ProductDetails-Description");
    const productPrice = await browser.$(".ProductDetails-Price");
    const productColor = await browser.$(".ProductDetails-Color");
    const productMaterial = await browser.$(".ProductDetails-Material");
    const addToCartButton = await browser.$(".ProductDetails-AddToCart");

    await expect(productName).toBeDisplayed();
    await expect(productDescription).toBeDisplayed();
    await expect(productPrice).toBeDisplayed();
    await expect(productColor).toBeDisplayed();
    await expect(productMaterial).toBeDisplayed();
    await expect(addToCartButton).toBeDisplayed();
  });

  it("если товар уже добавлен в корзину, в каталоге и на странице товара должно отображаться сообщение об этом", async ({
    browser,
  }) => {
    await browser.url(url);
    const addToCartButton = await browser.$(".ProductDetails-AddToCart");
    await addToCartButton.click();

    const cartBadge = await browser.$(".CartBadge");
    await expect(cartBadge).toHaveTextContaining("Item in cart");
  });

  it("если товар уже добавлен в корзину, повторное нажатие кнопки 'добавить в корзину' должно увеличивать его количество", async ({
    browser,
  }) => {
    await browser.url(url);

    const addToCartButton = await browser.$(
      "ProductDetails-AddToCart btn btn-primary btn-lg"
    );
    await addToCartButton.click();

    const cartLink = await browser.$('.nav-link[href="/hw/store/cart"]');
    await cartLink.click();

    const cartItemQuantity = await browser.$(".Cart-Count");
    await expect(cartItemQuantity).toHaveTextContaining("2");
  });

  it("содержимое корзины должно сохраняться между перезагрузками страницы", async ({
    browser,
  }) => {
    await browser.url(url);

    const addToCartButton = await browser.$(".ProductDetails-AddToCart");
    await addToCartButton.click();

    const cartLink = await browser.$('.nav-link[href="/hw/store/cart"]');
    await cartLink.click();

    const cartItemName = await browser.$(".Cart-Name").getText();
    const cartItemPrice = await browser.$(".Cart-Price").getText();
    const cartItemCount = await browser.$(".Cart-Count").getText();
    const cartItemTotal = await browser.$(".Cart-Total").getText();

    await browser.refresh();

    const newCartItemName = await browser.$(".Cart-Name").getText();
    const newCartItemPrice = await browser.$(".Cart-Price").getText();
    const newCartItemCount = await browser.$(".Cart-Count").getText();
    const newCartItemTotal = await browser.$(".Cart-Total").getText();

    await expect(newCartItemName).toEqual(cartItemName);
    await expect(newCartItemPrice).toEqual(cartItemPrice);
    await expect(newCartItemCount).toEqual(cartItemCount);
    await expect(newCartItemTotal).toEqual(cartItemTotal);
  });
});
