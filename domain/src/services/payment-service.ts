import { Payment } from "../entities/payment";
import { ReadOnlyService } from "../utils/types/service";

export interface PaymentService extends ReadOnlyService<Payment>{
    createPayment: (data: Payment) => Promise<Payment | undefined>;
    completePayment: (paymentId: string, providerPaymentId?: string) => Promise<Payment | undefined>;
    failPayment: (paymentId: string, providerPaymentId?: string) => Promise<Payment | undefined>;
    refundPayment: (paymentId: string) => Promise<Payment | undefined>;

    getPaymentsForOrder: (orderId: string) => Promise<Payment[]>;
    getPaymentsForUser: (userId: string) => Promise<Payment[]>;
};


// import { OrderStatus } from "src/entities/order";

    // processPayment: (paymentData: string) => Promise<Payment | undefined>;
    // validateWebHook: (webHookPayload: string) => void;
    // updatePaymentStatus: (paymentId: string, status: OrderStatus) => void;