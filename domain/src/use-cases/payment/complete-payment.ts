import { OrderService } from "../../services/order-service";
import { PaymentService } from "../../services/payment-service";

interface CompletePaymenteData {
    dependencies: { 
        paymentService: PaymentService,
        orderService: OrderService },
    payload: { 
        orderId: string,
        paymentId: string,
        providerPaymentId: string,
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

    const updatedOrder = await orderService.updateStatus(orderId, "paid");

    if(!updatedOrder) return new Error("No se pudo actualizar el status de la orden");


    return completedPayment;
};


// import { OrderService } from "../../services/order-service";
// import { PaymentService } from "../../services/payment-service";

// interface CompletePaymenteData {
//     dependencies: { 
//         orderService: OrderService },
//     payload: { 
//         orderId: string,
//         paymentId: string
//     }
// }

// export async function completePayment({ dependencies, payload }: CompletePaymenteData ) {
//     const { orderService } = dependencies;
//     const { orderId, paymentId } = payload;

//     const order = await orderService.getById(orderId);
    
//     if(!order) return new Error("No se encontró la orden");

//     if(order.status !== "pending"){
//         return new Error(`La orden no se puede completar con el status ${order.status}`)
//     };

//     const updated = await orderService.updateStatus(orderId, "paid");

//     if(!updated) return new Error("No se pudo actualizar el status de la orden");

//     updated.paymentId = paymentId;
//     updated.updatedAt = new Date();

//     return updated;
// };