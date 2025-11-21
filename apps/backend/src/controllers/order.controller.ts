import { Request, Response } from "express";
import { prismaOrderServiceImplementation } from "../services/prisma-order-service-implementation";
import { 
    getOrdersForUser,
    purchaseCourse,
    cancelOrder,
    refundOrder
 } from "@devcourses/domain";

export class OrderController {
    static async getOrdersForUser(req: Request, res: Response) {
        try {
            const userId = req.params.userId!;

            const orders = await getOrdersForUser({
                dependencies: { orderService: prismaOrderServiceImplementation },
                payload: { userId }
            });

            if (orders instanceof Error) {
              return res.status(404).json({ message: orders.message });
            };

            res.status(200).json(orders);
        } catch (error: any) {
            res.status(500).json({ message: error.mesagge})
        }
    }

    static async purchaseCourse(req: Request, res: Response) {
        try {
            const payload = req.body;

            const order = await purchaseCourse({
                dependencies: { orderService: prismaOrderServiceImplementation },
                payload: payload
            })

            if (order instanceof Error) {
              return res.status(400).json({ message: order.message });
            };

            res.status(200).json(order);

        } catch (error: any) {
            res.status(500).json({ message: error.mesagge})
        }
    }

    static async cancelOrder(req: Request, res: Response) {
        try {
            const orderId = req.params.orderId!;

            const updatedOrder = await cancelOrder({
                dependencies: {orderService: prismaOrderServiceImplementation},
                payload: { orderId }
            })

            if (updatedOrder instanceof Error) {
              return res.status(400).json({ message: updatedOrder.message });
            };

            res.status(200).json(updatedOrder);

        } catch (error: any) {
            res.status(500).json({ message: error.mesagge})
        } 
    }

    static async refundOrder(req: Request, res: Response) {
        try {
            const orderId = req.params.orderId!;

            const updatedOrder = await refundOrder({
                dependencies: {orderService: prismaOrderServiceImplementation},
                payload: { orderId }
            })

            if (updatedOrder instanceof Error) {
              return res.status(400).json({ message: updatedOrder.message });
            };

            res.status(200).json(updatedOrder);

        } catch (error: any) {
            res.status(500).json({ message: error.mesagge})
        } 
    }
}