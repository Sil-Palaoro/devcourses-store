
export interface MercadoPagoPaymentResponse {
    id: string;
    status: string;
    external_reference: string;
    metadata: {
        paymentId: string;
        [key: string]: any;
    };
    [key: string]: any;
}