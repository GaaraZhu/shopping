import { PriceRule } from "./priceRule";
import { ProductSKUEnum } from "./product";

/*================================================================================
======================= MAPPING BETWEEN PRODUCT AND PRICE RULE ===================
================================================================================*/
export type PriceRules = {
  rules: ProductPriceRule[];
}

export type ProductPriceRule = {
  sku: ProductSKUEnum;
  rule: PriceRule;
}
