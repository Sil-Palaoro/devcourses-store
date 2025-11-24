import { Request, Response } from "express";
import { prismaPaymentServiceImplementation } from "../services/prisma-payment-service-implementation";
import { prismaOrderServiceImplementation } from "../services/prisma-order-service-implementation";
import { mercadoPagoPaymentService } from "../services/providers/mercadopago-payment-service";
import { MercadoPagoPaymentResponse } from "../types/MercadoPagoPaymentResponse.type";
import { completePayment, failPayment } from "@devcourses/domain";
import axios from "axios";
import crypto from "crypto";


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
                
                console.log("Webhook simulation:", { simulatedStatus, orderId, paymentId, providerPaymentId });


                if (simulatedStatus === "approved") {
                    await completePayment({
                        dependencies: {
                            paymentService: prismaPaymentServiceImplementation,
                            orderService: prismaOrderServiceImplementation
                        },
                        payload: {
                            orderId,
                            paymentId,
                            providerPaymentId: providerPaymentId ?? `SIMULATED_MP_${crypto.randomUUID()}`
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
                            providerPaymentId: providerPaymentId ?? `SIMULATED_MP_${crypto.randomUUID()}`
                        }
                    });
                }

                return res.status(200).json({ ok: true, simulated: true });
            }




            //PRODUCTION MODE

            //Respuesta de MercadoPago: type, data(id)
            const { type, data } = req.body;

            if (type !== "payment") {
                return res.status(200).json({ message: "Evento ignorado"});
            }

            const paymentProviderId = data?.id;

            if (!paymentProviderId) {
                return res.status(400).json({ message: "Falta providerPaymentId"});
            }

            const rawResponse = await mercadoPagoPaymentService.getPaymentData(paymentProviderId);
            const mpResponse = rawResponse as MercadoPagoPaymentResponse;

            const status = mpResponse.status;
            const orderId = mpResponse.external_reference;   
            const internalPaymentId  = mpResponse.metadata.paymentId;

            if(!orderId || !internalPaymentId) {
                console.warn("No vino metadata.paymentId, no puedo continuar");
                return res.status(400).json({ message: "Metadata faltante"});
            }

            if (status === "approved") {
                const result = await completePayment({
                    dependencies: {
                        paymentService: prismaPaymentServiceImplementation,
                        orderService: prismaOrderServiceImplementation
                    },
                    payload: {
                        orderId: orderId,
                        paymentId: internalPaymentId,
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
                        orderId: orderId,
                        paymentId: internalPaymentId,
                        providerPaymentId: paymentProviderId
                    }
                });

                if (result instanceof Error) {
                    return res.status(400).json({ message: result.message });
                }
            }
            
            return res.status(200).json({ message: "Webhook procesado correctamente"});

        } catch (error: any) {
            console.error("Error en webhook:", error);
            return res.status(500).json({ message: error.message })
        };
    }
};