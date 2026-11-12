import { After, Before, Status } from "@cucumber/cucumber";
import { chromium } from "playwright";
import { CartPage } from "../pages/CartPage";
import { LoginPage } from "../pages/LoginPage";
import { ProductsPage } from "../pages/ProductsPage";
import { BddWorld } from "./world";

Before(async function (this: BddWorld) {
  this.browser = await chromium.launch();
  this.page = await this.browser.newPage();
  this.cartPage = new CartPage(this.page);
  this.loginPage = new LoginPage(this.page);
  this.productsPage = new ProductsPage(this.page);
});

After(async function (this: BddWorld, scenario) {
  try {
    if (scenario.result?.status === Status.FAILED && this.page) {
      await this.attach(await this.page.screenshot(), "image/png");
    }
  } finally {
    await this.browser?.close();
  }
});
