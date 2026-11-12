import { World, type IWorldOptions } from "@cucumber/cucumber";
import type { Browser, Page } from "playwright";
import type { CartPage } from "../pages/CartPage";
import type { LoginPage } from "../pages/LoginPage";
import type { ProductsPage } from "../pages/ProductsPage";

export interface BddParameters {
  browserName?: string;
}

export class BddWorld extends World<BddParameters> {
  browser?: Browser;
  page?: Page;
  cartPage?: CartPage;
  loginPage?: LoginPage;
  productsPage?: ProductsPage;

  constructor(options: IWorldOptions<BddParameters>) {
    super(options);
  }
}
