import { OrderService } from "../../services/order-service";
import { CreateOrderDTO, Order } from "../../entities/order";
import { OrderItem } from "../../entities/orderItem";

interface PurchaseCourseData {
    dependencies: {orderService: OrderService},
    payload: CreateOrderDTO,
} 

export async function purchaseCourse({ dependencies, payload }: PurchaseCourseData) {  
    const { v4: uuid } = await import("uuid");

    const orderId = uuid();

    if (payload.items.length === 0) {
    return new Error("Una orden debe contener por lo menos un item");
    }

  
    const newItems: OrderItem[] = payload.items.map(item => ({
        id: uuid(),
        orderId,
        courseId: item.courseId,
        price: item.price,
        })
      )        

    const order: Order = {
        ...payload,
        items: newItems,
        id: orderId,
        status: "pending",
        createdAt: new Date(),
        updatedAt: new Date(),
    };
    const createdOrder = await dependencies.orderService.createOrder(order);
    return createdOrder;
}