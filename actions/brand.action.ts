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

export const getBrandByOwnerIdActions = async (ownerId: string) => {
    return await prisma.brand.findFirst({
        where: { ownerId },
        select: { id: true },
    });
};



export const createBrandActions = async ({ name, logoUrl, ownerId }: IBrand) => {
    await prisma.brand.create({
        data: {
            name,
            logoUrl,
            ownerId,
        },
    });
    await prisma.user.update({
        where: { id: ownerId },
        data: { role: "SELLER" },
    });
    revalidatePath("/");
};
