import { z } from "zod";

export const productFormSchema = z.object({
  name: z
    .string()
    .min(3, { message: "Name must be at least 3 characters" })
    .max(100, { message: "Name must not exceed 100 characters" }),

  description: z
    .string()
    .min(10, { message: "Description must be at least 10 characters" })
    .max(500, { message: "Description must not exceed 500 characters" }),

  price: z.coerce.number().min(1, {
    message: "Price must be at least 1.",
  }),

  quantity: z.coerce.number().min(1, {
    message: "Quantity must be at least 1.",
  }),
  image: z.instanceof(File),

  categoryId: z
    .string()
    .length(24, { message: "Invalid category ID format (must be 24 characters)" }),

  // brandId: z
  //   .string()
  //   .length(24, { message: "Invalid brand ID format (must be 24 characters)" }),
});


export const categoryFormSchema = z.object({
  name: z
    .string()
    .min(3, { message: "Name must be at least 3 characters" })
    .max(100, { message: "Name must not exceed 100 characters" }),

});


export const brandFormSchema = z.object({
  name: z
    .string()
    .min(3, { message: "Name must be at least 3 characters" })
    .max(100, { message: "Name must not exceed 100 characters" }),

  logoUrl: z.string()
    .min(3, { message: "Name must be at least 3 characters" })
    .max(100, { message: "Name must not exceed 100 characters" }),



});