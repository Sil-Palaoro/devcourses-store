import { OrderService } from "../../services/order-service";

interface RefundOrderData {
    dependencies: {orderService: OrderService},
    payload: { orderId: string}
}

export async function refundOrder({ dependencies, payload }: RefundOrderData) {
    const { orderService } = dependencies;
    const { orderId } = payload;

    const order = await orderService.getById(orderId);
    if(!order) return new Error("No se encontró la orden");

    if (order.status !== "paid" && order.status !== "succeeded") {
        return new Error(`No se puede devolver una order con status ${order.status}`)
    };

    const updated = await orderService.updateStatus(orderId, "refunded");
    
    if(!updated) return new Error("No se pudo actualizar el status de la orden");

    return updated;
};