import { ProductSKUEnum } from "./product";

/*================================================================================
============================== PREDEFINED PRICE RULES ============================
================================================================================*/
export type PriceRule = {
    type: PriceRuleTypeEnum;
    config: PriceRuleConfig;
}

export enum PriceRuleTypeEnum {
    BUY_X_FOR_Y = "BUY_X_FOR_Y",
    BULK_DISCOUNT = "BULK_DISCOUNT",
    BUDDLE_FOR_FREE = "BUDDLE_FOR_FREE",
}

export type PriceRuleConfig = BuyXForYConfig | BulkDiscountConfig | BuddleForFreeConfig;

// Buy X products and only pay for Y products
export type BuyXForYConfig = {
    x: number;
    y: number;
}

// Get a discounted price when buying more than a certain number of products
export type BulkDiscountConfig = {
    bulkNumber: number;
    discountedPrice: number;
}

// Get buddled in product for free when buying the target product
export type BuddleForFreeConfig = {
    skuOfTargetProd: ProductSKUEnum;
}
