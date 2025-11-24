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
