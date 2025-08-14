"use server";
import { PrismaClient } from "@prisma/client";
import { revalidatePath } from "next/cache";

import { IUser } from "@/interfaces";

const prisma = new PrismaClient();


export async function createUserAction({ id, email, name }: IUser) {
    if (!id || !email) return;

    const existingUser = await prisma.user.findUnique({ where: { id } });
    if (existingUser) return;

    await prisma.user.create({
        data: { id, email, name, role: "CLIENT", },
    });
    revalidatePath("/");
}

export async function getUserByIdAction(id: string) {
    return await prisma.user.findUnique({
        where: { id },
    });
}