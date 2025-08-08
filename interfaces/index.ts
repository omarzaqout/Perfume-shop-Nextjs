

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

export interface IUser {
    id: string;
    name: string;
    email: string;
}

export interface IBrand {
    name: string;
    logoUrl: string;
    ownerId: string;
}