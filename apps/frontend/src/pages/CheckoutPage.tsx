import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { checkoutService } from "../services/checkoutService";

const CheckoutPage: React.FC = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const startCheckout = async () => {
            try {
                const response = await checkoutService.startCheckout();

                if (response) {
                    const { checkoutUrl } = response;

                    if (checkoutUrl) {
                        window.location.href = checkoutUrl;
                    }
                } else {
                    navigate("/checkout/failure");
                }
            } catch (error: any) {
                console.error("Error iniciando checkout:", error);
                navigate("/checkout/failure");
            };
        };

        startCheckout();
    }, [])


    return (
        <main className="text-center mt-20">
            <h2 className="text-2xl font-bold text-purpleNeon-400">Redirigiendo al pago...</h2>
            <p className="mt-4 text-gray-400">Por favor espera un momento</p>
        </main>
    );
};

export default CheckoutPage;