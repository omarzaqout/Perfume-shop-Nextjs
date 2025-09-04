"use server";
import { PrismaClient } from "@prisma/client";
import { revalidatePath } from "next/cache";


const prisma = new PrismaClient();


//create order
export async function createOrder(userId: string, address: string, phone: number, total: number) {
    const order = await prisma.order.create({

        data: {
            userId,
            address,
            phone: phone,
            total,
            status: "PENDING",
        }
    });
    return order.id;
}


//add order items

export async function addOrderItems(orderId: string, productId: string, quantity: number, price: number) {
    const orderItem = await prisma.orderItem.create({
        data: {
            orderId,
            productId,
            quantity,
            price,
        }
    });
    revalidatePath("/dashboard/orders");
}


//update order status
// export async function updateOrderStatus(orderId: string, status: string) {
//     const order = await prisma.order.update({
//         where: { id: orderId },
//         data: {
//             status: status
//          },

//     });
//     revalidatePath("/dashboard/orders");
//     revalidatePath("/dashboard");

//     return order;

// }