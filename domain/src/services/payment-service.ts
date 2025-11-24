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