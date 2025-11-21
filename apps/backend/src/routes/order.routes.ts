import { Router } from "express";
import { OrderController } from "../controllers/order.controller";
import { authMiddleware } from "../middlewares/authMiddleware";
import { authorizeRoles } from "../middlewares/roleMiddleware";
import { UserRole } from "@devcourses/domain";

const router = Router();

const ADMIN: UserRole = "admin";
const STUDENT: UserRole = "student";

//GET
// router.get(
//     "/", 
//     authMiddleware, 
//     authorizeRoles(ADMIN), 
//     OrderController.getAllOrders
// );
router.get(
    "/for-user/:id", 
    authMiddleware, 
    authorizeRoles(ADMIN, STUDENT), 
    OrderController.getOrdersForUser
);

//POST
router.post(
    "/purchase",
    authMiddleware,
    authorizeRoles(STUDENT, ADMIN),
    OrderController.purchaseCourse
);

//PATCH
router.patch(
    "/cancel/:orderId",
    authMiddleware,
    authorizeRoles(ADMIN, STUDENT),
    OrderController.cancelOrder
);

router.patch(
    "/refund/:orderId",
    authMiddleware,
    authorizeRoles(ADMIN),
    OrderController.refundOrder
);

export default router;