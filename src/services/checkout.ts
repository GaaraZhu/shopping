import { PriceRule } from "../models/priceRule";
import { ProductSKUEnum } from "../models/product";
import { PriceRules, ProductPriceRule } from "../models/productPriceRule";
import { IPriceService } from "./interfaces/priceService";
import { PriceService } from "./priceService";

/**
 * Check out service to provide two functionalities:
 * 
 *  - scan the product SKU to add to the cart
 *  - calculate the final price for all items in the cart
 */
export class Checkout {
    readonly priceService: IPriceService = PriceService.BUILDER;

    // the product price rules: from SKU to rule
    readonly rules: { [key in ProductSKUEnum] : PriceRule } = {} as { [key in ProductSKUEnum] : PriceRule };
    // the bought items count: from SKU to product count
    readonly boughtItemsCount: { [key in ProductSKUEnum] : number } = {} as { [key in ProductSKUEnum] : number };

    constructor(rules: PriceRules | undefined) {
        // pre-flat the mapping to speed up the price calculation
        rules?.rules?.forEach((ppr: ProductPriceRule) => {
            this.rules[ppr.sku] = ppr.rule;
        })
    }

    // scan the SKU of the product and add it into the boughtItemsCount map
    public scan(sku: ProductSKUEnum): void {
        if (this.boughtItemsCount[sku]) {
            this.boughtItemsCount[sku] = this.boughtItemsCount[sku] + 1;
        } else {
            this.boughtItemsCount[sku] = 1;
        }
    }

    // calculate the final price for all scanned items
    public total(): number {
        let total = 0;
        Object.keys(this.boughtItemsCount)
            .forEach(sku =>
                total += this.priceService.calculate(sku as ProductSKUEnum, this.boughtItemsCount, this.rules[sku as ProductSKUEnum]));
        return total;
    }
}
