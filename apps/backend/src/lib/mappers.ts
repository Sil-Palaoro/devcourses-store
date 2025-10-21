import { Cart } from "@devcourses/domain";
import { Prisma } from "@prisma/client";

export const cartMapper = {
    toPrismaCreate(cart: Cart): Prisma.CartCreateInput {
        return {
            user: {
                connect: { id: cart.userId }
            },
            currency: cart.currency,
            ...(cart.items && cart.items.length > 0 && {
                items: { 
                    create: cart.items.map(item => ({
                        courseId: item.courseId,
                        quantity: item.quantity,
                        priceSnapshot: item.priceSnapshot,                    
                    })),
                },
            }),
        };
    },

    toPrismaUpdate(cart: Partial<Cart>): Prisma.CartUpdateInput {
        const data: Prisma.CartUpdateInput = {};

        if(cart.currency) data.currency = cart.currency;

        if (cart.items&& cart.items.length > 0){
            const itemIds = cart.items.map((item) => item.id);
        
            data.items = {
                deleteMany: {
                    id: { notIn: itemIds }
                },
                upsert: cart.items.map(item => ({
                    where: { id: item.id },
                    update: {
                        quantity: item.quantity,
                        priceSnapshot: item.priceSnapshot,
                    },
                    create: {
                        courseId: item.courseId,
                        quantity: item.quantity,
                        priceSnapshot: item.priceSnapshot,
                    },
                })),
            };
        }
        return data;
    },

    toDomain(prismaCart: Prisma.CartGetPayload<{ include: { items: true } }>): Cart {
        return {
            id: prismaCart.id,
            userId: prismaCart.userId,
            currency: prismaCart.currency, 
            items: prismaCart.items.map(item => ({
                id: item.id,
                cartId: item.cartId,
                courseId: item.courseId,
                quantity: item.quantity,
                priceSnapshot: item.priceSnapshot,
            })),
        };
    }
}