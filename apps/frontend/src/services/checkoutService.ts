import api from "./api";

interface StartCheckoutResponse {
    checkoutUrl: string;
}

interface FrontendCheckoutService {
    startCheckout : () => Promise<StartCheckoutResponse>;
}

export const checkoutService: FrontendCheckoutService = {
    async startCheckout() {
        return await api.post<StartCheckoutResponse>("/checkout");
     },
}

    // completePayment: (paymentId: string, providerPaymentId?: string) => Promise<Payment | undefined>;
    // failPayment: (paymentId: string, providerPaymentId?: string) => Promise<Payment | undefined>;

// interface FrontendPaymentService {
    // createPayment: (data: Payment) => Promise<Payment | undefined>;
    // completePayment: (paymentId: string, providerPaymentId?: string) => Promise<Payment | undefined>;
//     failPayment: (paymentId: string, providerPaymentId?: string) => Promise<Payment | undefined>;
// }

    // async createPayment(data) {
    //     return api.post("/payments", { data });
    //  },

    //  async completePayment(paymentId, providerPaymentId) {
    //     return api.post("/payments/complete", {
    //         paymentId,
    //         providerPaymentId
    //     });
    //  },

    //  async failPayment(paymentId, providerPaymentId) {
    //     return api.post("/payments/fail", {
    //         paymentId,
    //         providerPaymentId
    //     })
    //  },