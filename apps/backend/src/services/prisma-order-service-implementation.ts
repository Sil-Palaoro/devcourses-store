import { OrderService } from "@devcourses/domain";
import db from "../lib/prisma";
import { orderMapper } from "../lib/mappers";


export const prismaOrderServiceImplementation: OrderService = {
    async getAll() {
        return await db.order.findMany({
              include: { items: true },
        });
    },
    async getById(orderId) {
        const order = await db.order.findUnique({ 
            where: { id: orderId },
            include: { items: true },
        })
        return order ?? undefined;
    },
    async getOrdersForUser(userId) {
        const orders = await db.order.findMany({ 
            where: { userId: userId },
            include: { items: true },
        });
        return orders ?? undefined;
    },
    async createOrder(data) {
        const created = await db.order.create({
            data: orderMapper.toPrismaCreate(data),
            include: { items: true },
        });               
        return orderMapper.toDomain(created); 
    },
    async updateStatus(orderId, status) {
        const existingOrder = await db.order.findUnique({ where: { id: orderId } });
        if (!existingOrder) return undefined;

        const updatedorder = await db.order.update({ 
            where: {id: orderId}, 
            data: orderMapper.toPrismaUpdate({ status: status }),
            include: { items: true },
        });
        return orderMapper.toDomain(updatedorder);
    },

    async cancelOrder(orderId) {
        const existingorder = await db.order.findUnique({ where: { id: orderId } });
        if (!existingorder) return undefined;

        const updatedorder = await db.order.update({ 
            where: {id: orderId}, 
            data: orderMapper.toPrismaUpdate({ status: "cancelled" }),
            include: { items: true },
       });
        return orderMapper.toDomain(updatedorder);
    },

    async refundOrder(orderId) {
        const existingorder = await db.order.findUnique({ where: { id: orderId } });
        if (!existingorder) return undefined;

        const updatedorder = await db.order.update({ 
            where: {id: orderId}, 
            data: orderMapper.toPrismaUpdate({ status: "refunded" }),
            include: { items: true },
       });
        return orderMapper.toDomain(updatedorder);
    },
}