import { BuddleForFreeConfig, BulkDiscountConfig, BuyXForYConfig, PriceRule, PriceRuleTypeEnum } from "../models/priceRule";
import { Product, ProductSKUEnum } from "../models/product";
import { IPriceService } from "./interfaces/priceService";
import { IProductService } from "./interfaces/productService";
import { ProductService } from "./productService";

/**
 * Price service to calculate total price for a specific product in the cart
 */
export class PriceService implements IPriceService {

    public static BUILDER = new PriceService();

    readonly productService: IProductService = ProductService.BUILDER;

    calculate(sku: ProductSKUEnum, boughtItemsCount: { ipd: number; mbp: number; atv: number; vga: number; }, rule: PriceRule | undefined): number {
        let total = 0;
        const product: Product | undefined = this.productService.find(sku);
        if (!product) {
            throw new Error("Failed to find product in the catalog");
        }
        const count = boughtItemsCount[sku as ProductSKUEnum];
        if (!rule) {
            return count * product.price;
        }
        
        switch(rule.type) {
            case PriceRuleTypeEnum.BUY_X_FOR_Y: {
                total += calculateBuyXForY(count, product.price, rule.config as BuyXForYConfig);
                break;
            }
            case PriceRuleTypeEnum.BULK_DISCOUNT: {
                total += calculateBulkDiscount(count, product.price, rule.config as BulkDiscountConfig);
                break;
            }
            case PriceRuleTypeEnum.BUDDLE_FOR_FREE: {
                const buddleForFreeRule = rule.config as BuddleForFreeConfig;
                const targetProdCount: number | undefined = boughtItemsCount[buddleForFreeRule.skuOfTargetProd];
                total += calculateBuddleForFree(count, product.price, buddleForFreeRule, targetProdCount);
                break;
            }
        }

        return total;
    }
}

export const calculateBuyXForY = (count: number, price: number, config: BuyXForYConfig): number => {
    if (config.x < config.y) {
        throw new Error("Invalid configuration for rule BUY_X_FOR_Y");
    }
    const finalCount = Math.floor(count/(config.x)) * (config.y) + count%(config.x);
    return finalCount * price;
}

export const calculateBulkDiscount = (count: number, price: number, config: BulkDiscountConfig): number => {
    if (config.discountedPrice > price) {
        throw new Error("Invalid configuration for rule BULK_DISCOUNT");
    }
    return count * (count > config.bulkNumber ? config.discountedPrice : price);
}

export const calculateBuddleForFree= (count: number, price: number, config: BuddleForFreeConfig, targetProductCount: number | undefined): number => {
    if (!targetProductCount || targetProductCount === 0) {
        return count * price;
    }

    if (targetProductCount < count) {
        return (count - targetProductCount) * price;
    }

    return 0;
}
