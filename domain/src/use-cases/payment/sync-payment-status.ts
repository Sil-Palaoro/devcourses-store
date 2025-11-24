import { PaymentService } from "../../services/payment-service";
import { OrderService } from "../../services/order-service";
import { ProviderPaymentService } from "../../services/provider-payment-service";
import { completePayment } from "./complete-payment";
import { failPayment } from "./fail-payment";

interface SyncPaymentStatusData {
    dependencies: {
        paymentService: PaymentService;
        orderService: OrderService;
        providerPaymentService: ProviderPaymentService;
    };
    payload: {
        paymentId: string;          
        providerPaymentId: string;  
    };
}

export async function syncPaymentStatus({ dependencies, payload }: SyncPaymentStatusData) {
    const { paymentService, orderService, providerPaymentService } = dependencies;
    const { paymentId, providerPaymentId } = payload;

    const payment = await paymentService.getById(paymentId);
    if (!payment) throw new Error("No se encontró el payment interno");

    const providerStatus = await providerPaymentService.getPaymentStatus(providerPaymentId);

    if (!providerStatus) {
        throw new Error("No se pudo obtener el estado del pago desde MercadoPago");
    }

    switch (providerStatus) {
        case "approved":
            return await completePayment({
                dependencies: { paymentService, orderService },
                payload: {
                    orderId: payment.orderId,
                    paymentId: payment.id,
                    providerPaymentId
                }
            });

        case "rejected":
        case "cancelled":
            return await failPayment({
                dependencies: { paymentService, orderService },
                payload: {
                    orderId: payment.orderId,
                    paymentId: payment.id,
                    providerPaymentId
                }
            });

        case "in_process":
        case "pending":
        default:
            return { message: "Pago en proceso, no se actualiza nada" };
    }
};
