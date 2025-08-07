"use server";
import { PrismaClient } from "@prisma/client";
import { revalidatePath } from "next/cache";

import { IProduct } from "@/interfaces";

const prisma = new PrismaClient();

export const getProductListActions = async (searchTerm?: string) => {
    return await prisma.product.findMany({
        where: searchTerm
            ? {
                name: {
                    contains: searchTerm,
                    mode: "insensitive",
                },
            }
            : {},
        orderBy: {
            name: "desc",
        },
    });
};

export const createProductActions = async ({
    name,
    description,
    price,
    imageUrl,
    quantity,
    categoryId,
    brandId,
}: IProduct) => {
    console.log("Creating product with data:",)
    await prisma.product.create({
        data: {
            name,
            description,
            price,
            imageUrl: imageUrl ?? "",
            quantity,
            categoryId,
            brandId,
        },
    });
    revalidatePath("/");
};