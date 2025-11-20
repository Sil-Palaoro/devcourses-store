import { Order } from "../order";

export const mockOrders: Order[] = [{
    id: "1",
    userId: "1",
    items: [
        {
            id: "mocked-uuid",
            orderId: "mocked-uuid",
            courseId: "2",
            price: 25000,
        }
    ],
    totalAmount: 25000,
    currency: "ARS",
    status: "paid",
    paymentMethod: "MercadoPago",
    createdAt: new Date(),
    updatedAt: new Date(),
},
{
    id: "2",
    userId: "1",
    items: [
        {
            id: "mocked-uuid",
            orderId: "mocked-uuid",
            courseId: "2",
            price: 25000,
        }
    ],
    totalAmount: 25000,
    currency: "ARS",
    status: "pending",
    paymentMethod: "MercadoPago",
    createdAt: new Date(),
    updatedAt: new Date(),
},
{
    id: "3",
    userId: "2",
    items: [
        {
            id: "mocked-uuid",
            orderId: "mocked-uuid",
            courseId: "2",
            price: 25000,
        }
    ],
    totalAmount: 25000,
    currency: "ARS",
    status: "pending",
    paymentMethod: "MercadoPago",
    createdAt: new Date(),
    updatedAt: new Date(),
},
];