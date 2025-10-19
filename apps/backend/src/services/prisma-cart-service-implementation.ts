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
    async addItemToCart(userId, courseId, quantity, priceSnapshot) {
       const cart = await db.cart.findUnique({ 
            where: { userId },
            include: { items: true },
        });         
        if (!cart) {
           throw new Error("El usuario no tiene un carrito de compras");
        }
        
        const existingItem = cart.items.find((item) => item.courseId === courseId);
        if(existingItem) throw new Error("El item ya existe en el carrito de compras");
                        
        const newItem = {
            id: "4",
            cartId: cart.id,
            courseId,
            quantity,
            priceSnapshot, 
        };
        cart.items.push(newItem);
        
        return cart;
    },
    async removeItemFromCart(userId, cartItemId) {
       let cart = await db.cart.findUnique({ 
            where: { userId },
            include: { items: true },
        });           
        if (!cart) {
            throw new Error("El usuario no tiene un carrito de compras");}
         
        const existingItem = cart.items.find((item) => item.id === cartItemId);
        if(!existingItem) throw new Error("El item no existe en el carrito de compras");
        
        await db.cartItem.delete({ where: { id: cartItemId },});

        const updatedCart = await db.cart.findUnique({ 
            where: { userId },
            include: { items: true },
        });  

        if (!updatedCart) throw new Error("Error al actualizar el carrito después de eliminar el item");

        return updatedCart;
    }
}