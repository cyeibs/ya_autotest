describe("Карточка товара: ", () => {
  it("соответствие товаров в каталоге и на странице товара для первых трех элементов", async ({
    browser,
  }) => {
    await browser.url("http://localhost:3000/hw/store/catalog");

    const productItems = await browser.$$(".ProductItem");

    for (let i = 0; i < 3; i++) {
      const productName = await productItems[i]
        .$(".ProductItem-Name")
        .getText();

      const link = await productItems[i].$(".card-link");
      await link.click();

      await browser.waitUntil(
        async () => {
          const url = await browser.getUrl();
          return url.includes("/hw/store/catalog/");
        },
        {
          timeout: 5000,
          timeoutMsg: "Expected to be on product details page after click",
        }
      );

      const productId = await browser
        .getUrl()
        .then((url) => url.split("/").pop());

      await browser.url(
        `http://localhost:3000/hw/store/catalog/${productId}?bug_id=3`
      );

      await browser.waitUntil(
        async () => {
          const name = await browser.$(".ProductDetails-Name").getText();
          return name;
        },
        {
          timeout: 5000,
          timeoutMsg: "Expected product details to load correctly",
        }
      );

      const name = await browser.$(".ProductDetails-Name").getText();

      console.log("Product Name in List:", productName);
      console.log("Product Name in Details:", name);

      expect(productName).toEqual(name);

      await browser.url("http://localhost:3000/hw/store/catalog");
    }
  });
});
