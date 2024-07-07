import { BUG_ID, BASE_URL } from "./constants";

const url = Boolean(BUG_ID) ? `${BASE_URL}/?bug_id=${BUG_ID}` : `${BASE_URL}/`;
const deliveryUrl = Boolean(BUG_ID)
  ? `${BASE_URL}/delivery?bug_id=${BUG_ID}`
  : `${BASE_URL}/delivery`;
const contactUrl = Boolean(BUG_ID)
  ? `${BASE_URL}/contacts?bug_id=${BUG_ID}`
  : `${BASE_URL}/contacts`;

describe("Страницы магазина", () => {
  it("в магазине должны быть страницы: главная, каталог, условия доставки, контакты", async ({
    browser,
  }) => {
    await browser.url(url);
    await expect(browser).toHaveUrl(url);

    const catalogLink = await browser.$('.nav-link[href="/hw/store/catalog"]');
    await catalogLink.click();
    await expect(browser).toHaveUrlContaining("/catalog");

    await browser.url(url);
    const deliveryLink = await browser.$(
      '.nav-link[href="/hw/store/delivery"]'
    );
    await deliveryLink.click();
    await expect(browser).toHaveUrlContaining("/delivery");

    await browser.url(url);
    const contactsLink = await browser.$(
      '.nav-link[href="/hw/store/contacts"]'
    );
    await contactsLink.click();
    await expect(browser).toHaveUrlContaining("/contacts");
  });
});

describe("Статичные страницы магазина", () => {
  it("страницы главная, условия доставки, контакты должны иметь статическое содержимое", async ({
    browser,
  }) => {
    await browser.url(url);
    const mainPageContent = await browser.$(".Home");
    await expect(mainPageContent).toHaveTextContaining(
      "Welcome to Kogtetochka store"
    );

    await browser.url(deliveryUrl);
    const deliveryPageContent = await browser.$(".Delivery");
    await expect(deliveryPageContent).toHaveTextContaining("Delivery");

    await browser.url(contactUrl);
    const contactsPageContent = await browser.$(".Contacts");
    await expect(contactsPageContent).toHaveTextContaining("Contacts");
  });
});
