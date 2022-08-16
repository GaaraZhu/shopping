import { PriceRuleTypeEnum } from "../src/models/priceRule";
import { ProductSKUEnum } from "../src/models/product";
import { PriceRules } from "../src/models/productPriceRule";

export const mockedPriceRules: PriceRules = {
    rules: [
        {
            sku: ProductSKUEnum.ATV,
            rule: {
                type: PriceRuleTypeEnum.BUY_X_FOR_Y,
                config: {
                    x: 3,
                    y: 2,
                },
            }
        },
        {
            sku: ProductSKUEnum.IPD,
            rule: {
                type: PriceRuleTypeEnum.BULK_DISCOUNT,
                config: {
                    bulkNumber: 4,
                    discountedPrice: 499.99,
                },
            }
        },
        {
            sku: ProductSKUEnum.VGA,
            rule: {
                type: PriceRuleTypeEnum.BUDDLE_FOR_FREE,
                config: {
                    skuOfTargetProd: ProductSKUEnum.MBP,
                },
            }
        }
    ]
};