import { PaymentService } from "../../services/payment-service";
import { OrderService } from "../../services/order-service";
import { Payment, CreatePaymentDTO } from "../../entities/payment";

interface CreatePaymentData {
    dependencies: { 
        paymentService: PaymentService,
        orderService: OrderService,
    };
    payload: CreatePaymentDTO      
}

export async function createPayment({ dependencies, payload }: CreatePaymentData) {
    const { paymentService, orderService } = dependencies;
    const { orderId, userId, provider } = payload;
    const { v4: uuid } = await import("uuid");


    const order = await orderService.getById(orderId);
    if(!order) throw new Error("No se encontró la orden");

    if(order.status !== "pending") {
        throw new Error(`El status de la orden debe ser 'pending'. El estatus recibido es: ${order.status}`);
    };

    const createPaymentPayload: Payment = {
        id: uuid(),
        orderId,
        userId,
        amount: order.totalAmount,
        currency: order.currency,
        provider,
        status: order.status,
        createdAt: new Date(),
        updatedAt: new Date(),
    };

    const payment = await paymentService.createPayment(createPaymentPayload);

    return payment;
};