import { CreatePaymentProviderDTO, PaymentStatus } from "../entities/payment";

export interface ProviderPaymentService {
    createPayment: (data: CreatePaymentProviderDTO) => Promise<{providerPaymentId: string, checkoutUrl?: string}>;

    getPaymentStatus: (providerPaymentId: string) => Promise<PaymentStatus | unknown>;
}