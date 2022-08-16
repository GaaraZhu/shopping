import { Product } from "../../models/product";

export interface IProductService {
    /**
     * Product look up by SKU value
     * 
     * @param sku Product SKU
     */
    find(sku: string): Product | undefined;
}
