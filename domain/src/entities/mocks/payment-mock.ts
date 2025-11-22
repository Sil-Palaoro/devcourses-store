import { Currency } from "../cart";
import { Payment, Provider } from "../payment";

export const mockPaymentBase = {
    orderId: "1",
    userId: "1",
    amount: 25000,
    currency: "ARS" as Currency,
    provider: "MercadoPago" as Provider, 
    createdAt: new Date(),
    updatedAt: new Date(),
};

export const mockPayment: Payment = {
    id: "1",
    orderId: "1",
    userId: "1",
    amount: 25000,
    currency: "ARS" as Currency,
    provider: "MercadoPago", 
    status: "pending",
    createdAt: new Date(),
    updatedAt: new Date(),
};

export const mockPayments: Payment[] = [{
    id: "1",
    orderId: "2",
    userId: "1",
    amount: 25000,
    currency: "ARS" as Currency,
    provider: "MercadoPago", 
    status: "pending",
    createdAt: new Date(),
    updatedAt: new Date(),
},
{
    id: "2",
    orderId: "3",
    userId: "1",
    amount: 30000,
    currency: "ARS" as Currency,
    provider: "MercadoPago", 
    status: "pending",
    createdAt: new Date(),
    updatedAt: new Date(),
},
{
    id: "3",
    orderId: "4",
    userId: "1",
    amount: 35000,
    currency: "ARS" as Currency,
    provider: "MercadoPago", 
    status: "pending",
    createdAt: new Date(),
    updatedAt: new Date(),
}
]