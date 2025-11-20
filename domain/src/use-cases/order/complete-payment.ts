import { OrderService } from "../../services/order-service";

interface CompletePaymenteData {
    dependencies: { orderService: OrderService },
    payload: { 
        orderId: string,
        paymentId: string
    }
}

export async function completePayment({ dependencies, payload }: CompletePaymenteData ) {
    const { orderService } = dependencies;
    const { orderId, paymentId } = payload;

    const order = await orderService.getById(orderId);
    
    if(!order) return new Error("No se encontró la orden");

    if(order.status !== "pending"){
        return new Error(`La orden no se puede completar con el status ${order.status}`)
    };

    const updated = await orderService.updateStatus(orderId, "paid");

    if(!updated) return new Error("No se pudo actualizar el status de la orden");

    updated.paymentId = paymentId;
    updated.updatedAt = new Date();

    return updated;
};