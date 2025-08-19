"use server";
import { PrismaClient } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { IProduct } from "@/interfaces";

const prisma = new PrismaClient();

export async function getProductListActions(searchTerm?: string, skip = 0, take = 10) {
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
        skip,
        take,
        include: {
            brand: {
                select: {
                    name: true,
                },
            },
        },
    });
}

export async function getProductsByCategoryActions(
    categoryId: string,
    search: string = "",
    skip = 0,
    take = 10
) {
    return await prisma.product.findMany({
        where: {
            categoryId: categoryId,
            OR: search
                ? [
                    { name: { contains: search, mode: "insensitive" } },
                    { description: { contains: search, mode: "insensitive" } },
                ]
                : undefined,
        },
        orderBy: {
            createdAt: "desc",
        },
        skip,
        take,
        include: {
            brand: {
                select: {
                    name: true,
                },
            },
            category: {
                select: {
                    name: true,
                },
            },
        },
    });
}


export async function getProductsByBrandActions(
    brandId: string,
    search: string = "",
    skip = 0,
    take = 10
) {
    return await prisma.product.findMany({
        where: {
            brandId: brandId,
            OR: search
                ? [
                    { name: { contains: search, mode: "insensitive" } },
                    { description: { contains: search, mode: "insensitive" } },
                ]
                : undefined,
        },
        orderBy: {
            createdAt: "desc",
        },
        skip,
        take,
        include: {
            brand: {
                select: {
                    name: true,
                },
            },
            category: {
                select: {
                    name: true,
                },
            },
        },
    });
}



export const createProductActions = async ({
    name,
    description,
    price,
    imageUrl,
    quantity,
    categoryId,
    brandId,
}: IProduct) => {
    console.log("Creating product with data:");
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