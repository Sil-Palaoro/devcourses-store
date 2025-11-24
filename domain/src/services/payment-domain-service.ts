import { PaymentService } from "./payment-service";
import { OrderService } from "./order-service";
import { ProviderPaymentService } from "./provider-payment-service";

interface initializePaymentData {
    orderId: string,
    userId: string,
    amount: number,
    currency: "ARS", 
}


export class PaymentDomainService {
    constructor(
        private paymentService: PaymentService,
        private orderService: OrderService,
        private providerPaymentService: ProviderPaymentService
    ) {}

    async initializePayment(data: initializePaymentData) {
        const payment = await this.paymentService.createPayment({
            orderId: data.orderId,
            userId: data.userId,
            provider: "MercadoPago",
        } as any);
        
        if (!payment) throw new Error("No se pudo crear el pago");

        const providerResult = await this.providerPaymentService.createPayment({
            paymentId: payment.id,
            userId: data.userId,
            orderId: data.orderId,
            amount: data.amount,
        });

        return {
            payment,
            checkoutUrl: providerResult.checkoutUrl,
            providerPaymentId: providerResult.providerPaymentId
        };
    }
}