export interface ICategory {

    id: string;
    name: string;

}

export interface IProduct {
    name: string;
    description: string;
    price: number;
    imageUrl: string;
    quantity: number;
    categoryId: string;
    brandId: string;
}