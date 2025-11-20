import { describe, expect, test, vi } from "vitest";
import { purchaseCourse } from "./purchase-course";
import { CreateOrderDTO } from "../../entities/order";
import { orderServiceMockUnit } from "../../services/mocks/order-service-mock.unit";

vi.mock("uuid", () => ({ v4: () => "mocked-uuid" }));


describe("purchaseCourse", async () =>{

    test("Given the order data, the order should be created", async () => {
        const payload: CreateOrderDTO = {
            userId: "1",
            items: [
                {
                    courseId: "2",
                    price: 25000,
                }
            ],
            totalAmount: 25000,
            currency: "ARS",
            paymentMethod: "MercadoPago",
        };

        const order = await purchaseCourse({
            dependencies: { orderService: orderServiceMockUnit },
            payload: payload
        });    
    

        expect(orderServiceMockUnit.createOrder).toHaveBeenCalledWith({
            id: "mocked-uuid",
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
            createdAt: expect.any(Date),
            updatedAt: expect.any(Date),
        });
             
        expect(orderServiceMockUnit.createOrder).toHaveBeenCalledTimes(1);
        
    });

    test("Given an order data without an item, should throw an error", async () => {
        const payload: CreateOrderDTO = {
            userId: "1",
            items: [],
            totalAmount: 25000,
            currency: "ARS",
            paymentMethod: "MercadoPago",
        };

        const order = await purchaseCourse({
            dependencies: { orderService: orderServiceMockUnit },
            payload: payload
        });   

      expect(order).toBeInstanceOf(Error)

    });
});
    