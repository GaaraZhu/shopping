import { ErrorMessage } from "../../src/models/errorMessages";
import { PriceRuleTypeEnum } from "../../src/models/priceRule";
import { calculateBuddleForFree, calculateBulkDiscount, calculateBuyXForY } from "../../src/services/priceService";

describe("price service", () => {
    describe("calculateBuyXForY", () => {
        const testCases = [
            {
                count: 2,
                price: 20,
                config: {
                    x: 3,
                    y: 2,
                },
                expectedTotal: 40,
            },
            {
                count: 5,
                price: 20,
                config: {
                    x: 3,
                    y: 2,
                },
                expectedTotal: 80,
            },
            {
                count: 6,
                price: 20,
                config: {
                    x: 4,
                    y: 7,
                },
                expectedTotal: 80,
                expectedError: new Error(`${ErrorMessage.INVALID_RULE_CONFIG} ${PriceRuleTypeEnum.BUY_X_FOR_Y}`),
            },
        ];

        testCases.forEach((testCase) => {
            it(JSON.stringify(testCase), async () => {
                try {
                    expect(calculateBuyXForY(testCase.count, testCase.price, testCase.config)).toBe(testCase.expectedTotal);
                } catch (err) {
                    expect(err).toEqual(testCase.expectedError);
                }
            });
          });
    });

    describe("calculateBulkDiscount", () => {
        const testCases = [
            {
                count: 2,
                price: 20,
                config: {
                    bulkNumber: 3,
                    discountedPrice: 10,
                },
                expectedTotal: 40,
            },
            {
                count: 5,
                price: 20,
                config: {
                    bulkNumber: 4,
                    discountedPrice: 10,
                },
                expectedTotal: 50,
            },
            {
                count: 6,
                price: 20,
                config: {
                    bulkNumber: 4,
                    discountedPrice: 30,
                },
                expectedTotal: 80,
                expectedError: new Error(`${ErrorMessage.INVALID_RULE_CONFIG} ${PriceRuleTypeEnum.BULK_DISCOUNT}`),
            },
        ];

        testCases.forEach((testCase) => {
            it(JSON.stringify(testCase), async () => {
                try {
                    expect(calculateBulkDiscount(testCase.count, testCase.price, testCase.config)).toBe(testCase.expectedTotal);
                } catch (err) {
                    expect(err).toEqual(testCase.expectedError);
                }
            });
          });
    });

    describe("calculateBuddleForFree", () => {
        const testCases = [
            {
                count: 6,
                price: 20,
                targetProductCount: 3,
                expectedTotal: 60,
            },
            {
                count: 3,
                price: 20,
                targetProductCount: 6,
                expectedTotal: 0,
            },
            {
                count: 3,
                price: 20,
                targetProductCount: 3,
                expectedTotal: 0,
            },
        ];

        testCases.forEach((testCase) => {
            it(JSON.stringify(testCase), async () => {
                expect(calculateBuddleForFree(testCase.count, testCase.price, testCase.targetProductCount)).toBe(testCase.expectedTotal);
            });
          });
    });
});