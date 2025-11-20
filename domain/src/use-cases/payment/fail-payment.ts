import { OrderService } from "../../services/order-service";
import { PaymentService } from "../../services/payment-service";
import { Payment } from "../../entities/payment";

interface FailPaymentData {
    dependencies: {
        paymentService: PaymentService,
        orderService: OrderService
    },
    payload: {
        orderId: string,
        paymentId: string,
        providerPaymentId: string
    }
}

export async function failPayment({ dependencies, payload }: FailPaymentData): Promise<Payment | Error> {
    const { paymentService, orderService } = dependencies;
    const { orderId, paymentId, providerPaymentId } = payload;

    const order = await orderService.getById(orderId);
    if (!order) return new Error("No se encontró la orden");

    if (order.status !== "pending") {
        return new Error(`La orden no se puede marcar como fallida con el status ${order.status}`);
    }

    const failedPayment = await paymentService.failPayment(paymentId, providerPaymentId);
    if (!failedPayment) return new Error("No se pudo marcar el pago como fallido");

    const updatedOrder = await orderService.updateStatus(orderId, "failed");

    if (!updatedOrder) return new Error("No se pudo actualizar el status de la orden");

    return failedPayment;
}
