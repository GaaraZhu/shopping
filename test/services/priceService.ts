import { ErrorMessage } from "../../src/models/errorMessages";
import { PriceRuleTypeEnum } from "../../src/models/priceRule";
import { calculateBuyXForY } from "../../src/services/priceService";

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
            it(testCase.toString(), async () => {
                try {
                    expect(calculateBuyXForY(testCase.count, testCase.price, testCase.config)).toBe(testCase.expectedTotal);
                } catch (err) {
                    expect(err).toEqual(testCase.expectedError);
                }
            });
          });
    });
});