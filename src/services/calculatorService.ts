import { ErrorMessage } from "../models/errorMessages";
import { BulkDiscountConfig, BuyXForYConfig, PriceRuleTypeEnum } from "../models/priceRule";

/**
 * Calculate total price of a specific products in the cart without any configured rule
 *
 * @param count total number of the current type of products in the cart
 * @param price single price of this product
 * @returns total price for the current type of products in the cart
 */
export const calculateWithoutRules = (count: number, price: number): number => {
    return count * price;
}

/**
 * Calculate total price of a specific products in the cart with BuyXForY rule
 *
 * @param count total number of the current type of products in the cart
 * @param price single price of this product
 * @param config the configured BuyXForY rule
 * @returns total price for the current type of products in the cart
 */
export const calculateBuyXForY = (count: number, price: number, config: BuyXForYConfig): number => {
    if (config.x < config.y) {
        throw new Error(`${ErrorMessage.INVALID_RULE_CONFIG} ${PriceRuleTypeEnum.BUY_X_FOR_Y}`);
    }
    const finalCount = Math.floor(count/(config.x)) * (config.y) + count%(config.x);
    return finalCount * price;
}

/**
 * Calculate total price of a specific products in the cart with BulkDiscount rule
 *
 * @param count total number of the current type of products in the cart
 * @param price single price of this product
 * @param config the configured BulkDiscount rule
 * @returns total price for the current type of products in the cart
 */
export const calculateBulkDiscount = (count: number, price: number, config: BulkDiscountConfig): number => {
    if (config.discountedPrice > price) {
        throw new Error(`${ErrorMessage.INVALID_RULE_CONFIG} ${PriceRuleTypeEnum.BULK_DISCOUNT}`);
    }
    return count * (count > config.bulkNumber ? config.discountedPrice : price);
}

/**
 * Calculate total price of a specific products in the cart with BuddleForFree rule
 *
 * @param count total number of the current type of products in the cart
 * @param price single price of this product
 * @param targetProductCount total number of the target type of products in the cart
 * @returns total price for the current type of products in the cart
 */
export const calculateBuddleForFree= (count: number, price: number, targetProductCount: number | undefined): number => {
    if (!targetProductCount || targetProductCount === 0) {
        return count * price;
    }

    if (targetProductCount < count) {
        return (count - targetProductCount) * price;
    }

    return 0;
}
