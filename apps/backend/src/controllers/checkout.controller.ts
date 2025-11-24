import { Response } from "express";
import { prismaOrderServiceImplementation } from "../services/prisma-order-service-implementation";
import { prismaPaymentServiceImplementation } from "../services/prisma-payment-service-implementation";
import { prismaCartServiceImplementation } from "../services/prisma-cart-service-implementation";
import { mercadoPagoPaymentService } from "../services/providers/mercadopago-payment-service";
import { purchaseCourse, createPayment, getCartByUserId } from "@devcourses/domain";
import { AuthRequest } from "../middlewares/authMiddleware";

export class CheckoutController {
    static async start(req: AuthRequest, res: Response) {
        try {
            const userId = req.user?.id;

            if (userId) {
            const cart = await getCartByUserId({
                dependencies: { cartService: prismaCartServiceImplementation},
                payload: {userId: userId}
            });

            if (cart instanceof Error) {
                return res.status(400).json({ message: "Error al buscar el carrito" });
            }

            if (!cart || cart.items.length === 0) {
                return res.status(400).json({ message: "Carrito vacío" });
            }

            const total = cart.items.reduce(
                (acc, item) => acc + item.priceSnapshot * item.quantity,
                0
            );

            const order = await purchaseCourse({
                dependencies: { orderService: prismaOrderServiceImplementation},
                payload: {
                    userId: userId,
                    totalAmount: total,
                    currency: "ARS",
                    paymentMethod: "MercadoPago",
                    items: []
                }
            });

            if (order instanceof Error) {
                return res.status(400).json({ message: "Error al crear la orden" });
            }


            const payment = await createPayment({
                dependencies: {
                    paymentService: prismaPaymentServiceImplementation,
                    orderService: prismaOrderServiceImplementation
                },
                payload: {
                    orderId: order.id,
                    userId: userId,
                    provider: "MercadoPago" 
                }
            });

            if (!payment) {
                return res.status(400).json({ message: "No se pudo crear el pago" });
            }

            const mpPayment = await mercadoPagoPaymentService.createPayment({
                paymentId: payment.id,
                orderId: order.id,
                userId: userId,
                amount: total,
            });

            return res.status(200).json({ checkoutUrl: mpPayment.checkoutUrl });
            }

        } catch (error: any) {
            console.error(error);
            return res.status(500).json({ message: error.message });
        }
    }
}
