import { PriceRule } from "../../models/priceRule";
import { ProductSKUEnum } from "../../models/product";

export interface IPriceService {
    /**
     * Calculating the total price for a specific product
     * 
     * @param sku product sku
     * @param boughtItemsCount the bought items count: from product SKU to total numbers
     * @param ruleConfig the configured pricing rule for this product if any
     */
    calculate(sku: ProductSKUEnum, boughtItemsCount: { [key in ProductSKUEnum] : number }, ruleConfig: PriceRule | undefined): number;
}
