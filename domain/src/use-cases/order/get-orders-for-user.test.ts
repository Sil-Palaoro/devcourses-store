import { describe, expect, test } from "vitest";
import { getOrdersForUser } from "./get-orders-for-user"
import { orderServiceMockIntegration } from "../../services/mocks/order-service-mock.integration";


describe("getOrdersForUser", async () =>{

    test("Given an userId, should return the list of orders for the user", async () => {
        const result = await getOrdersForUser({
            dependencies: { orderService: orderServiceMockIntegration },
            payload: {userId: "2"}}
            ); 
        expect(result).toStrictEqual([
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
                createdAt: expect.any(Date),
                updatedAt: expect.any(Date),
            },
        ])
    })
});