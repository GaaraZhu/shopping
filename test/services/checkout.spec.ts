import { ProductSKUEnum } from "../../src/models/product";
import { Checkout } from "../../src/services/checkout";
import { mockedPriceRules } from "../mocks";

describe("checkout service", () => {
    describe("buy x for y", () => {
        const testCases = [
            {
                skus: [ProductSKUEnum.ATV],
                expectedTotal: 109.50,
            },
            {
                skus: [ProductSKUEnum.ATV, ProductSKUEnum.ATV],
                expectedTotal: 219,
            },
            {
                skus: [ProductSKUEnum.ATV, ProductSKUEnum.ATV, ProductSKUEnum.ATV],
                expectedTotal: 219,
            },
            {
                skus: [ProductSKUEnum.ATV, ProductSKUEnum.ATV, ProductSKUEnum.ATV, ProductSKUEnum.ATV],
                expectedTotal: 328.5,
            },
        ];

        testCases.forEach((testCase) => {
            it(testCase.skus.toString(), async () => {
                const checkout = new Checkout(mockedPriceRules);
                testCase.skus.forEach(sku => checkout.scan(sku));
                expect(checkout.total()).toBe(testCase.expectedTotal);
            });
          });
    });

    describe("bulk discount", () => {
        const testCases = [
            {
                skus: [ProductSKUEnum.IPD],
                expectedTotal: 549.99,
            },
            {
                skus: [ProductSKUEnum.IPD, ProductSKUEnum.IPD],
                expectedTotal: 1099.98,
            },
            {
                skus: [ProductSKUEnum.IPD, ProductSKUEnum.IPD, ProductSKUEnum.IPD],
                expectedTotal: 1649.97,
            },
            {
                skus: [ProductSKUEnum.IPD, ProductSKUEnum.IPD, ProductSKUEnum.IPD, ProductSKUEnum.IPD],
                expectedTotal: 2199.96,
            },
            {
                skus: [ProductSKUEnum.IPD, ProductSKUEnum.IPD, ProductSKUEnum.IPD, ProductSKUEnum.IPD, ProductSKUEnum.IPD],
                expectedTotal: 2499.95,
            },
        ];

        testCases.forEach((testCase) => {
            it(testCase.skus.toString(), async () => {
                const checkout = new Checkout(mockedPriceRules);
                testCase.skus.forEach(sku => checkout.scan(sku));
                expect(checkout.total()).toBe(testCase.expectedTotal);
            });
          });
    });

    describe("buddle for free", () => {
        const testCases = [
            {
                skus: [ProductSKUEnum.VGA],
                expectedTotal: 30,
            },
            {
                skus: [ProductSKUEnum.VGA, ProductSKUEnum.VGA],
                expectedTotal: 60,
            },
            {
                skus: [ProductSKUEnum.VGA, ProductSKUEnum.VGA, ProductSKUEnum.MBP],
                expectedTotal: 1429.99,
            },
            {
                skus: [ProductSKUEnum.VGA, ProductSKUEnum.MBP, ProductSKUEnum.MBP],
                expectedTotal: 2799.98,
            },
            {
                skus: [ProductSKUEnum.VGA, ProductSKUEnum.VGA, ProductSKUEnum.VGA, ProductSKUEnum.MBP],
                expectedTotal: 1459.99,
            },
        ];

        testCases.forEach((testCase) => {
            it(testCase.skus.toString(), async () => {
                const checkout = new Checkout(mockedPriceRules);
                testCase.skus.forEach(sku => checkout.scan(sku));
                expect(checkout.total()).toBe(testCase.expectedTotal);
            });
          });
    });

    describe("all together", () => {
        const testCases = [
            {
                skus: [ProductSKUEnum.ATV, ProductSKUEnum.ATV, ProductSKUEnum.ATV, ProductSKUEnum.VGA],
                expectedTotal: 249.00,
            },
            {
                skus: [ProductSKUEnum.ATV, ProductSKUEnum.IPD, ProductSKUEnum.IPD, ProductSKUEnum.ATV, ProductSKUEnum.IPD, ProductSKUEnum.IPD, ProductSKUEnum.IPD],
                expectedTotal: 2718.95,
            },
            {
                skus: [ProductSKUEnum.MBP, ProductSKUEnum.VGA, ProductSKUEnum.IPD],
                expectedTotal: 1949.98,
            },
        ];

        testCases.forEach((testCase) => {
            it(testCase.skus.toString(), async () => {
                const checkout = new Checkout(mockedPriceRules);
                testCase.skus.forEach(sku => checkout.scan(sku));
                expect(checkout.total()).toBe(testCase.expectedTotal);
            });
          });
    });
});