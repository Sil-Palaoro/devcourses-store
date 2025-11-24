import { OrderService } from "../../services/order-service";
import { PaymentService } from "../../services/payment-service";

interface CompletePaymenteData {
    dependencies: { 
        paymentService: PaymentService,
        orderService: OrderService },
    payload: { 
        orderId: string,
        paymentId: string,
        providerPaymentId?: string,
    }
}

export async function completePayment({ dependencies, payload }: CompletePaymenteData ) {
    const { paymentService, orderService } = dependencies;
    const { orderId, paymentId, providerPaymentId } = payload;

    const order = await orderService.getById(orderId);    
    if(!order) throw new Error("No se encontró la orden");

    if(order.status !== "pending"){
        return new Error(`La orden no se puede completar con el status ${order.status}`)
    };

    const completedPayment = await paymentService.completePayment(paymentId, providerPaymentId);
    if(!completedPayment) return new Error("No se pudo completar el pago");

    const updatedOrder = await orderService.updateStatus(orderId, "paid", completedPayment.id);

    if(!updatedOrder) return new Error("No se pudo actualizar el status de la orden");

    return completedPayment;
};