import { Payment } from "../payment";

export const mockPayment: Payment = {
    id: "1",
    orderId: "1",
    userId: "1",
    amount: 25000,
    currency: "ARS",
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
    currency: "ARS",
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
    currency: "ARS",
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
    currency: "ARS",
    provider: "MercadoPago", 
    status: "pending",
    createdAt: new Date(),
    updatedAt: new Date(),
}
]