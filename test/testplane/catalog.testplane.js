import { BASE_URL, BUG_ID } from "./constants";

const url = Boolean(BUG_ID)
  ? `${BASE_URL}/catalog?bug_id=${BUG_ID}`
  : `${BASE_URL}/catalog`;

describe("Каталог", () => {
  it(`в каталоге должны отображаться товары, список которых приходит с сервера + отображают название, цена и ссылка на страницу с подробной информацией о товаре`, async ({
    browser,
  }) => {
    await browser.url(url);

    const products = await browser.$$(".ProductItem");

    await expect(products.length).toBeGreaterThan(
      0,
      "Товары в каталоге не найдены"
    );

    for (let product of products) {
      const productName = await product.$(".ProductItem-Name");
      const productPrice = await product.$(".ProductItem-Price");
      const productLink = await product.$(".ProductItem-DetailsLink");

      await expect(productName).toBeDisplayed();
      await expect(productPrice).toBeDisplayed();
      await expect(productLink).toBeDisplayed();

      const linkHref = await productLink.getAttribute("href");
      await expect(linkHref).toMatch(/\/hw\/store\/catalog\/\d+/);
    }
  });
});
