"use server";
import { PrismaClient } from "@prisma/client";
import { revalidatePath } from "next/cache";

import { IProduct } from "@/interfaces";

const prisma = new PrismaClient();

export const getHeroSlidesAction = async () => {
  try {
    const slides = await prisma.heroSlide.findMany({
      where: {
        isActive: true, 
      },
      orderBy: {
        order: 'asc', 
      },
    });
    return slides;
  } catch (error) {
    console.error("Failed to fetch hero slides:", error);
    return []; 
  }
};