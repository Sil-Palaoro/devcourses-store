import { OrderService } from "../../services/order-service";


interface GetOrdersForUserData {
    dependencies: {orderService: OrderService};
    payload: {userId: string}
};

export async function getOrdersForUser({dependencies, payload}: GetOrdersForUserData) {   
    const { orderService } = dependencies;
    const { userId } = payload;
    
    const orders = await orderService.getOrdersForUser(userId)
    if (!orders) return [];
    return  orders;
};