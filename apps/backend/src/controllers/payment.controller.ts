import { Request, Response } from "express";
import { prismaPaymentServiceImplementation } from "../services/prisma-payment-service-implementation";
import { prismaOrderServiceImplementation } from "../services/prisma-order-service-implementation";
import { createPayment, completePayment, failPayment } from "@devcourses/domain";
import { createPaymentSchema, paymentActionSchema } from "../validators/payment.validator";

export class PaymentController {
    static async createPayment(req: Request, res: Response) {
        try {
            const parsed = createPaymentSchema.safeParse(req.body);
            if (!parsed.success) return res.status(400).json({ message: "Payload inválido"});

            const payload = parsed.data;

            const createdPayment = await createPayment({
                dependencies: {
                    paymentService: prismaPaymentServiceImplementation,
                    orderService: prismaOrderServiceImplementation,
                },
                payload: payload,
            });

            if(createdPayment instanceof Error) return res.status(400).json({ message: createdPayment.message });

            return res.status(201).json(createdPayment);

        } catch (error: any) {          
            return res.status(500).json({ message: error.message ?? "Error interno" });
        };
    };

    static async completePayment(req: Request, res: Response) {
        try {
            const parsed = paymentActionSchema.safeParse(req.body);
            if (!parsed.success) return res.status(400).json({ message: "Payload inválido"});

            const payload = parsed.data;

            const completedPayment = await completePayment({
                dependencies: {
                    paymentService: prismaPaymentServiceImplementation,
                    orderService: prismaOrderServiceImplementation,
                },
                payload: payload,
            });

            if(completedPayment instanceof Error) return res.status(400).json({ message: completedPayment.message });

            return res.status(200).json(completedPayment);

        } catch (error: any) {
            return res.status(500).json({ message: error.message ?? "Error interno" });
        };

    };

    static async failPayment(req: Request, res: Response) {
        try {
            const parsed = paymentActionSchema.safeParse(req.body);
            if (!parsed.success) return res.status(400).json({ message: "Payload inválido"});

            const payload = parsed.data;

            const failedPayment = await failPayment({
                dependencies: {
                    paymentService: prismaPaymentServiceImplementation,
                    orderService: prismaOrderServiceImplementation,
                },
                payload: payload,
            });

            if(failedPayment instanceof Error) return res.status(400).json({ message: failedPayment.message });

            return res.status(200).json(failedPayment);

        } catch (error: any) {
            return res.status(500).json({ message: error.message ?? "Error interno" });
        };

    };
};