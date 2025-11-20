import { OrderService } from "../../services/order-service";

interface CancelOrderData {
    dependencies: {orderService: OrderService},
    payload: { orderId: string}
}

export async function cancelOrder({ dependencies, payload }: CancelOrderData) {
    const { orderService } = dependencies;
    const { orderId } = payload;

    const order = await orderService.getById(orderId);
    if(!order) return new Error("No se encontró la orden");

    if (order.status !== "pending") {
        return new Error(`No se puede cancelar una orden con status ${order.status}`);
    }

    const updated = await orderService.updateStatus(orderId, "cancelled");
    return updated;
};