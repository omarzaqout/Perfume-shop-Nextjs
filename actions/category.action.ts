"use server";
import { PrismaClient } from "@prisma/client";
import { revalidatePath } from "next/cache";

import { ICategory } from "@/interfaces";

const prisma = new PrismaClient();

export const getCategoryListActions = async () => {


    return await prisma.category.findMany({
        orderBy: {
            name: "desc",
        },
    });
};

export const createCategoryActions = async ({ name }: ICategory) => {
    await prisma.category.create({
        data: {
            name,
        },
    });
    revalidatePath("/");
};