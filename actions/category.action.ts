"use server";
import { PrismaClient } from "@prisma/client";
import { revalidatePath } from "next/cache";


const prisma = new PrismaClient();

export const getCategoryListActions = async () => {


    return await prisma.category.findMany({
        orderBy: {
            name: "desc",
        },
    });
};

export const createCategoryActions = async ({ name }: { name: string }) => {
    await prisma.category.create({
        data: {
            name,
        },
    });
    revalidatePath("/");
};