import { ErrorMessage } from "../models/errorMessages";
import { BulkDiscountConfig, BuyXForYConfig, PriceRuleTypeEnum } from "../models/priceRule";

export const calculateBuyXForY = (count: number, price: number, config: BuyXForYConfig): number => {
    if (config.x < config.y) {
        throw new Error(`${ErrorMessage.INVALID_RULE_CONFIG} ${PriceRuleTypeEnum.BUY_X_FOR_Y}`);
    }
    const finalCount = Math.floor(count/(config.x)) * (config.y) + count%(config.x);
    return finalCount * price;
}

export const calculateBulkDiscount = (count: number, price: number, config: BulkDiscountConfig): number => {
    if (config.discountedPrice > price) {
        throw new Error(`${ErrorMessage.INVALID_RULE_CONFIG} ${PriceRuleTypeEnum.BULK_DISCOUNT}`);
    }
    return count * (count > config.bulkNumber ? config.discountedPrice : price);
}

export const calculateBuddleForFree= (count: number, price: number, targetProductCount: number | undefined): number => {
    if (!targetProductCount || targetProductCount === 0) {
        return count * price;
    }

    if (targetProductCount < count) {
        return (count - targetProductCount) * price;
    }

    return 0;
}
