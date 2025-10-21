import { CartService } from "@devcourses/domain";
import db from "../lib/prisma";
import { cartMapper } from "../lib/mappers";


export const prismaCartServiceImplementation: CartService = {
    async getAll() {
        return await db.cart.findMany({
              include: { items: true },
        });
    },
    async getById(id) {
        const cart = await db.cart.findUnique({ 
            where: { id: id },
            include: { items: true },
        })
        return cart ?? undefined;
    },
    async getByUserId(userId) {
        const cart = await db.cart.findUnique({ 
            where: { userId },
            include: { items: true },
        });
        return cart ?? undefined;
    },
    async create(data) {
        const created = await db.cart.create({
            data: cartMapper.toPrismaCreate(data),
            include: { items: true },
        });
        cartMapper.toDomain(created);        
        return ;
    },
    async update(id, data) {
        const existingCart = await db.cart.findUnique({ where: { id: id } });
        if (!existingCart) return undefined;

        const updatedCart = await db.cart.update({ 
            where: {id: id}, 
            data: cartMapper.toPrismaUpdate(data),
            include: { items: true },
        });
        return cartMapper.toDomain(updatedCart);
    },
    async delete(id) {
        await db.cart.delete({ where: { id: id } });
        return;
    },
}