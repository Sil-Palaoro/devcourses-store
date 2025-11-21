import { OrderService } from "@devcourses/domain";
import db from "../lib/prisma";
// import { orderMapper } from "../lib/mappers";


export const prismaOrderServiceImplementation: OrderService = {
    async getAll() {
        return await db.order.findMany({
              include: { items: true },
        });
    },
    async getById(id) {
        const order = await db.order.findUnique({ 
            where: { id: id },
            include: { items: true },
        })
        return order ?? undefined;
    },
    async getOrdersForUser(userId) {
        const orders = await db.order.findMany({ 
            where: { userId },
            include: { items: true },
        });
        return orders ?? undefined;
    },
    async createOrder(data) {
        const created = await db.order.create({
            data: orderMapper.toPrismaCreate(data),
            include: { items: true },
        });
        orderMapper.toDomain(created);        
        return ;
    },
    async updateStatus(orderId, status) {
        const existingorder = await db.order.findUnique({ where: { id: orderId } });
        if (!existingorder) return undefined;

        const updatedorder = await db.order.update({ 
            where: {id: orderId}, 
            data: orderMapper.toPrismaUpdate(status),
            include: { items: true },
        });
        return orderMapper.toDomain(updatedorder);
    },

    async cancelOrder(orderId) {
        const existingorder = await db.order.findUnique({ where: { id: orderId } });
        if (!existingorder) return undefined;

        const updatedorder = await db.order.update({ 
            where: {id: orderId}, 
            data: orderMapper.toPrismaUpdate(status),
            include: { items: true },
       });
        return orderMapper.toDomain(updatedorder);
    },

    async refundOrder(orderId) {
        const existingorder = await db.order.findUnique({ where: { id: orderId } });
        if (!existingorder) return undefined;

        const updatedorder = await db.order.update({ 
            where: {id: orderId}, 
            data: orderMapper.toPrismaUpdate(status),
            include: { items: true },
       });
        return orderMapper.toDomain(updatedorder);
    },
}