import { Request, Response } from "express";
import { prismaPaymentServiceImplementation } from "../services/prisma-payment-service-implementation";
import { prismaOrderServiceImplementation } from "../services/prisma-order-service-implementation";
import { completePayment, failPayment } from "@devcourses/domain";
import axios from "axios";

export class MercadoPagoWebhookController {
    static async listen(req: Request, res: Response) {
        try {
            //TEST MODE: si viene simulatedStatus, usamos datos del body
            console.log("BODY RECIBIDO:", req.body);

            if (req.body.simulatedStatus) {
                console.log("Simulando webhook de MP..");

                const { paymentId, providerPaymentId, orderId } = req.body;

                const { simulatedStatus } = req.body ?? {};

                if (!simulatedStatus) {
                  return res.status(400).json({
                    message: "simulatedStatus is required for test requests"
                  });
                }

                if (!paymentId || !orderId) {
                    return res.status(400).json({ message: "paymentId y orderId son obligatorios en test mode" });
                };
                if (simulatedStatus === "approved") {
                    await completePayment({
                        dependencies: {
                            paymentService: prismaPaymentServiceImplementation,
                            orderService: prismaOrderServiceImplementation
                        },
                        payload: {
                            orderId,
                            paymentId,
                            providerPaymentId: providerPaymentId ?? "SIMULATED_MP_ID"
                        }
                    });

                } else if (simulatedStatus === "rejected") {
                    await failPayment({
                        dependencies: {
                            paymentService: prismaPaymentServiceImplementation,
                            orderService: prismaOrderServiceImplementation
                        },
                        payload: {
                            orderId,
                            paymentId,
                            providerPaymentId: providerPaymentId ?? "SIMULATED_Rejected_MP_ID"
                        }
                    });
                }

                return res.status(200).json({ ok: true, simulated: true });
            }




            //PRODUCTION MODE

            //Respuesta de MercadoPago: action (payment.updated), data(id)
            const { action, data } = req.body;
            const paymentProviderId = data?.id;

            if (!paymentProviderId) {
                return res.status(400).json({ message: "No provider payment id"});
            }

            const mpResponse = await axios.get(
                `https://api.mercadopago.com/v1/payment/${paymentProviderId}`,
                {
                    headers: {
                        Authorization: `Bearer ${process.env.MP_ACCESS_TOKEN}`
                    },
                }
            );

            const mpPayment = mpResponse.data;

            const status = mpPayment.status;
            const external_reference = mpPayment.external_reference;    //equivale a mi orderId
            const paymentId = mpPayment.metadata.paymentId;

            if(!external_reference || !paymentId) {
                return res.status(400).json({ message: "Metadata faltante"});
            }

            if (status === "approved") {
                const result = await completePayment({
                    dependencies: {
                        paymentService: prismaPaymentServiceImplementation,
                        orderService: prismaOrderServiceImplementation
                    },
                    payload: {
                        orderId: external_reference,
                        paymentId: paymentId,
                        providerPaymentId: paymentProviderId
                    }
                });

                if (result instanceof Error) {
                    return res.status(400).json({ message: result.message });
                }
            } else if (status === "rejected") {
                const result = await failPayment({
                    dependencies: {
                        paymentService: prismaPaymentServiceImplementation,
                        orderService: prismaOrderServiceImplementation
                    },
                    payload: {
                        orderId: external_reference,
                        paymentId: paymentId,
                        providerPaymentId: paymentProviderId
                    }
                });

                if (result instanceof Error) {
                    return res.status(400).json({ message: result.message });
                }
            }
            
            return res.sendStatus(200);

        } catch (error: any) {
            console.error(error);
            return res.status(500).json({ message: error.message })
        };
    }
};

