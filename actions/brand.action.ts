"use server";
import { IBrand } from "@/interfaces";
import { PrismaClient } from "@prisma/client";
import { revalidatePath } from "next/cache";

const prisma = new PrismaClient();

export const getBrandListActions = async () => {
    return await prisma.brand.findMany({
        orderBy: {
            name: "desc",
        },
    });
};

export const getBrandsByOwnerIdActions = async (ownerId: string) => {
    const brands = await prisma.brand.findMany({
        where: {
            brandOwners: {
                some: {
                    userId: ownerId, // بنفلتر حسب الـ userId في BrandOwner
                },
            },
        },
        select: {
            id: true,
            name: true,
        },
    });

    return brands;
};


export const createBrandActions = async ({
    name,
    logoUrl,
    ownerId,
}: IBrand) => {
    let existingBrand = await prisma.brand.findFirst({
        where: {
            name: {
                equals: name,
                mode: "insensitive",
            },
        },
    });

    if (existingBrand) {
        // تحقق هل الربط موجود
        const existingLink = await prisma.brandOwner.findFirst({
            where: {
                brandId: existingBrand.id,
                userId: ownerId,
            },
        });

        if (!existingLink) {
            await prisma.brandOwner.create({
                data: {
                    brandId: existingBrand.id,
                    userId: ownerId,
                },
            });
        }

        return existingBrand;
    }

    const newBrand = await prisma.brand.create({
        data: {
            name,
            logoUrl,
        },
    });

    await prisma.brandOwner.create({
        data: {
            brandId: newBrand.id,
            userId: ownerId,
        },
    });

    revalidatePath("/");

    return newBrand;
};


export const getBrands = async () => {
    const brands = await prisma.brand.findMany({
        orderBy: {
            name: "desc",
        },
        select: {
            name: true,
            logoUrl: true,
            brandOwners: {
                select: {
                    user: {
                        select: {
                            name: true,
                            email: true,
                        },
                    },
                },
            },
            _count: {
                select: {
                    products: true,
                },
            },
        },
    });

    return brands.map((brand) => ({
        brandName: brand.name,
        brandLogo: brand.logoUrl,
        owners: brand.brandOwners.map((bo) => ({
            ownerName: bo.user.name,
            ownerEmail: bo.user.email,
        })),
        productCount: brand._count.products,
    }));
};


export const getBrandByIdAction = async (id: string) => {
    try {
        const brand = await prisma.brand.findUnique({
            where: { id },
        });
        return brand;
    } catch (error) {
        return null;
    }
};
