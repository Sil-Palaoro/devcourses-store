import { Order } from "@devcourses/domain";
import { Prisma } from "@prisma/client";


export const orderMapper = {
    toPrismaCreate(order: Order): Prisma.OrderCreateInput {
        return {
            id: order.id,
            user: {
                connect: { id: order.userId }
            },
            currency: order.currency,
            totalAmount: order.totalAmount,
            status: order.status,
            paymentId: order.paymentId ?? null,
            paymentMethod: order.paymentMethod,
            ...(order.items && order.items.length > 0 && {
                items: { 
                    create: order.items.map(item => ({
                        id: item.id,
                        courseId: item.courseId,
                        price: item.price,                    
                    })),
                },
            }),
        };
    },

    toPrismaUpdate(order: Partial<Order>): Prisma.OrderUpdateInput {
        const data: Prisma.OrderUpdateInput = {};

        if(order.totalAmount) data.totalAmount = order.totalAmount;
        if(order.currency) data.currency = order.currency;
        if(order.status) data.status = order.status;
        if(order.paymentId) data.paymentId = order.paymentId;
        if(order.paymentMethod) data.paymentMethod = order.paymentMethod;

        if (order.items&& order.items.length > 0){
            const itemIds = order.items.map((item) => item.id);
        
            data.items = {
                deleteMany: {
                    id: { notIn: itemIds }
                },
                upsert: order.items.map(item => ({
                    where: { id: item.id },
                    update: {
                        price: item.price,
                    },
                    create: {
                        courseId: item.courseId,
                        price: item.price,
                    },
                })),
            };
        }
        return data;
    },

    toDomain(prismaOrder: Prisma.OrderGetPayload<{ include: { items: true } }>): Order {
        return {
            id: prismaOrder.id,
            userId: prismaOrder.userId,
            totalAmount: prismaOrder.totalAmount, 
            currency: prismaOrder.currency, 
            status: prismaOrder.status, 
            paymentId: prismaOrder.paymentId ?? null,
            paymentMethod: prismaOrder.paymentMethod, 
            items: prismaOrder.items.map(item => ({
                id: item.id,
                orderId: item.orderId,
                courseId: item.courseId,
                price: item.price,
            })),
            createdAt: prismaOrder.createdAt,
            updatedAt: prismaOrder.updatedAt,
        };
    }
}