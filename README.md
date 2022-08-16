# Shopping
[![Build Status](https://github.com/GaaraZhu/shopping/actions/workflows/build.yml/badge.svg)](https://github.com/GaaraZhu/shopping/actions/workflows/build.yml)
![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)

A checkout system for DiUS computer computer store!

## Features
* scan product to add to the cart
* calculate the total price of the products in the cart
* support flexible product pricing rules

## How it works
### checkout flow
 ![checkout flow](https://github.com/GaaraZhu/shopping/blob/main/resources/checkoutFlow.png)

### data source
There are two required data source for this system:
* Product data
* Pricing rule

For product data, it's hardcoded for simplicity here while normally it should come from an external data storage (Database, API etc).
```
{
    [ProductSKUEnum.IPD]: {
        sku: ProductSKUEnum.IPD,
        name: "Super iPad",
        price: 549.99,
    },
    [ProductSKUEnum.MBP]: {
        sku: ProductSKUEnum.MBP,
        name: "MacBook Pro",
        price: 1399.99,
    },
    [ProductSKUEnum.ATV]: {
        sku: ProductSKUEnum.ATV,
        name: "Apple TV",
        price: 109.50,
    },
    [ProductSKUEnum.VGA]: {
        sku: ProductSKUEnum.VGA,
        name: "VGA adapter",
        price: 30.00,
    },
};
````
For pricing rule, it could be part of the application configuration which could be passed to the checkout service at runtime:
```
{
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
```
Flexibility:
There are three predefined pricing rules:
* BUY_X_FOR_Y
* BULK_DISCOUNT
* BUDDLE_FOR_FREE

Rule configration is flexibile which means even for the same rule, differernt pricing strategy can be applied for different products. For example, for ATV it could be buy 3 for 2 while for IPD it could be buy 2 for 1. In case a new pricing rule other than these three is required, just:
1. add a new type in the PriceRuleTypeEnum
2. add a new calculation function in calculatorService
3. use it in the priceService when the configured rule type matches

### try it
1. install the depdendencies
```
npm install
```

2. build the code
```
npm run build
```

3. test the code
```
npm run test
```

### Things to improve
* The mapping between rule type and calculation function should be moved out of priceService and priceService should just pass the configured product rule type to get the corresponding function to calculate the price
* Add rule validation to enforce the many to one mapping between product and pricing rule
* A better README:)
