import type { Entity } from "../utils/types/entity";

export const PaymentStatusOptions = {
    PENDING: "pending",
    PROCESSING: "processing",
    COMPLETED: "completed",
    FAILED: "failed",
    REFUNDED: "refunded"
} as const;

export type PaymentStatus = (typeof PaymentStatusOptions)[keyof typeof PaymentStatusOptions]; 

export const ProviderOptions = {
    MERCADOPAGO: "MercadoPago",
    STRIPE: "Stripe",
} as const;

export type Provider = (typeof ProviderOptions)[keyof typeof ProviderOptions]; 


export interface Payment extends Entity {
    orderId: Entity["id"];
    userId: Entity["id"];
    provider: Provider;
    providerPaymentId?: string | null;
    status: PaymentStatus;
    amount: number;    
    currency: "ARS";   
    createdAt: Date;
    updatedAt: Date;
}


export interface CreatePaymentDTO {
    orderId: Entity["id"];
    userId: Entity["id"];
    provider: Provider; 
}