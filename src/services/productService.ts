import { Product, ProductSKUEnum } from "../models/product";
import { IProductService } from "./interfaces/productService";

export class ProductService implements IProductService {

    public static BUILDER = new ProductService();

    find(sku: string): Product | undefined {
        return products[sku];
    }
}

// Hard coded the catalog data here for simplicity
const products: Record<string, Product> = {
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