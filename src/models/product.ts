/*================================================================================
=========================== CORE PRODUCT IN THE CATALOGUE ========================
================================================================================*/
export type Product = {
    sku: ProductSKUEnum;
    name: string;
    price: number;
};

export enum ProductSKUEnum {
    IPD = "ipd",
    MBP = "mbp",
    ATV = "atv",
    VGA = "vga",
}
