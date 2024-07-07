import { BUG_ID, BASE_URL } from "./constants";

const url = Boolean(BUG_ID) ? `${BASE_URL}?bug_id=${BUG_ID}` : `${BASE_URL}`;

describe("Адаптивность верстки", () => {
  it("адаптивное меню с гамбургером", async ({ browser }) => {
    await browser.url(url);

    await browser.setWindowSize(1024, 768);
    await expect(browser.$(".navbar")).toBeDisplayed();
    await expect(browser.$(".nav-link")).toBeDisplayed();
    await expect(browser.$('.nav-link[href="/hw/store/cart"]')).toBeDisplayed();

    await browser.setWindowSize(575, 768);
    await expect(browser.$(".nav-link")).not.toBeDisplayed();
    await expect(browser.$(".navbar-toggler")).toBeDisplayed();
  });
});

describe("Ссылки в шапке", () => {
  it("в шапке отображаются ссылки на страницы магазина, а также ссылка на корзину", async ({
    browser,
  }) => {
    await browser.url(url);

    const catalogLink = await browser.$('.nav-link[href="/hw/store/catalog"]');
    const deliveryLink = await browser.$(
      '.nav-link[href="/hw/store/delivery"]'
    );
    const contactsLink = await browser.$(
      '.nav-link[href="/hw/store/contacts"]'
    );
    const cartLink = await browser.$('.nav-link[href="/hw/store/cart"]');

    await expect(catalogLink).toBeDisplayed();
    await expect(deliveryLink).toBeDisplayed();
    await expect(contactsLink).toBeDisplayed();
    await expect(cartLink).toBeDisplayed();

    await catalogLink.click();
    await expect(browser).toHaveUrlContaining("/catalog");

    await browser.url(url);
    await deliveryLink.click();
    await expect(browser).toHaveUrlContaining("/delivery");

    await browser.url(url);
    await contactsLink.click();
    await expect(browser).toHaveUrlContaining("/contacts");

    await browser.url(url);
    await cartLink.click();
    await expect(browser).toHaveUrlContaining("/cart");
  });
});

describe("Ссылка на главную страницу в названии магазина", () => {
  it("в шапке отображаются ссылки на страницы магазина, а также ссылка на корзину", async ({
    browser,
  }) => {
    await browser.url(url);

    const shopName = await browser.$(".Application-Brand");
    await shopName.click();

    await expect(browser).toHaveUrl(BASE_URL);
  });
});
describe("Поведение навигационного меню на маленьких экранах", () => {
  it("корректное поведение меню на маленьких экранах", async ({ browser }) => {
    await browser.url(url);
    await browser.setWindowSize(575, 768);

    const navLinks = await browser.$$(".nav-link");

    for (let i = 0; i < navLinks.length; i++) {
      const hamburgerMenu = await browser.$(".navbar-toggler");
      await hamburgerMenu.click();
      await expect(navLinks[i]).toBeDisplayed();
      await navLinks[i].click();
      for (let j = 0; j < navLinks.length; j++) {
        await expect(navLinks[j]).not.toBeDisplayed();
      }
    }
  });
});
