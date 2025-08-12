

export interface ICategory {

    id: string;
    name: string;

}

export interface IProduct {
    id: string;
    name: string;
    description: string;
    price: number;
    imageUrl: string;
    quantity: number;
    categoryId: string;
    brandId: string;
    createdAt: Date;
    updatedAt: Date;
    brand: {
        name: string;
    };
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

export interface MobileNavItemProps {
    href: string;
    text: string;
    onClick: () => void;
}