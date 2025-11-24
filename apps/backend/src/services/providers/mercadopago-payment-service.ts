import axios from "axios";
import { ProviderPaymentService } from "@devcourses/domain";

export const mercadoPagoPaymentService: ProviderPaymentService = {
    async createPayment({ paymentId, orderId, amount, currency}) {
        const response = await axios.post(
            "https://api.mercadopago.com/checkout/preferences",
            {
                items: [
                    {
                        title: "Compra en Devcourses",
                        quantity: 1,
                        unit_price: amount
                    },
                ],
                external_reference: orderId,
                metadata: { paymentId },
            },
            {
                headers: {
                    Authorization: `Bearer ${process.env.MP_ACCESS_TOKEN}`
                }
            }
        );

        return {
            providerPaymentId: response.data.id,
            checkoutUrl: response.data.init_point,
        };
    },

    async getPaymentStatus(providerPaymentId) {
        const response = await axios.get(
            `https://api.mercadopago.com/v1/payments/${providerPaymentId}`,
            {
                headers: {
                    Authorization: `Bearer ${process.env.MP_ACCESS_TOKEN}`
                },
            }
        );

        const status = response.data.status;

        switch (status) {
            case "approved": return "completed";
            case "rejected": return "failed";
            case "refunded": return "refunded";
            default: return "unknown";
        }
    }
};