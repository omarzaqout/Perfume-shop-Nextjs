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
  take = 10,
  brandId?: string
) {

  const where: any = {
    categoryId: categoryId,
  };


  if (search) {
    where.OR = [
      { name: { contains: search, mode: "insensitive" } },
      { description: { contains: search, mode: "insensitive" } },
    ];
  }


  if (brandId) {
    where.brandId = brandId;
  }

  return await prisma.product.findMany({
    where,
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
  take = 10,
  categoryId?: string
) {

  const where: any = {
    brandId: brandId,
  };

  if (search) {
    where.OR = [
      { name: { contains: search, mode: "insensitive" } },
      { description: { contains: search, mode: "insensitive" } },
    ];
  }

  if (categoryId) {
    where.categoryId = categoryId;
  }

  return await prisma.product.findMany({
    where,
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
  userId, // 👈 seller's userId must be passed here
}: IProduct & { userId: string }) => {
  // 1. Fetch seller data
  const seller = await prisma.user.findUnique({
    where: { id: userId },
    include: {
      brandOwners: {
        include: {
          brand: {
            include: { products: true },
          },
        },
      },
    },
  });

  if (!seller || seller.role !== "SELLER") {
    throw new Error("User is not a seller.");
  }

  // 2. Count total products owned by this seller
  const totalProducts = seller.brandOwners.reduce(
    (sum, bo) => sum + bo.brand.products.length,
    0
  );

  if (totalProducts >= seller.productLimit) {
    throw new Error("You have reached your maximum allowed number of products.");
  }

  // 3. Create the product
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

export async function getProductByIdAction(productId: string) {
  try {
    const product = await prisma.product.findUnique({
      where: { id: productId },
      include: {
        brand: {
          include: {
            brandOwners: {
              include: {
                user: true,
              },
            },
          },
        },
        category: true,
      },
    });

    if (!product) return null;

    // نفرض أنه البراند له مالك واحد أو أول مالك هو المطلوب
    const brandOwner = product.brand.brandOwners[0]?.user;

    let sellerRequest = null;
    if (brandOwner) {
      sellerRequest = await prisma.sellerRequest.findFirst({
        where: {
          userId: brandOwner.id,
          status: "APPROVED",
        },
      });
    }

    const productWithSellerDetails = {
      ...product,
      brand: {
        ...product.brand,
        owner: brandOwner
          ? {
            ...brandOwner,
            companyName: sellerRequest?.name || brandOwner.name,
            logoUrl: sellerRequest?.logoUrl || null,
            phone: sellerRequest?.phone || null,
            address: sellerRequest?.address || null,
            description: sellerRequest?.description || null,
          }
          : null,
      },
    };

    return productWithSellerDetails;
  } catch (error) {
    console.error("Failed to fetch product:", error);
    return null;
  }
}

//update product limit for seller
export const updateProductLimit = async (email: string, newLimit: number) => {
  await prisma.user.update({
    where: { email },
    data: { productLimit: newLimit },
  });
  revalidatePath("/");
};