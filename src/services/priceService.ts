import { ErrorMessage } from "../models/errorMessages";
import { BuddleForFreeConfig, BulkDiscountConfig, BuyXForYConfig, PriceRule, PriceRuleTypeEnum } from "../models/priceRule";
import { Product, ProductSKUEnum } from "../models/product";
import { calculateBuddleForFree, calculateBulkDiscount, calculateBuyXForY } from "./calculatorService";
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
            throw new Error(ErrorMessage.FAILED_TO_FIND_PRODUCT);
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
                total += calculateBuddleForFree(count, product.price, targetProdCount);
                break;
            }
        }

        return total;
    }
}
