import { Router } from "express";
import { CartController } from "../controllers/cart.controller";
import { authMiddleware } from "../middlewares/authMiddleware";
import { authorizeRoles } from "../middlewares/roleMiddleware";
import { UserRole } from "@devcourses/domain";

const router = Router();

const ADMIN: UserRole = "admin";
const INSTRUCTOR: UserRole = "instructor";
const STUDENT: UserRole = "student";

//GET
router.get(
    "/", 
    authMiddleware, 
    authorizeRoles(ADMIN), 
    CartController.getAllCarts
);
router.get(
    "/by-user-id/:id", 
    authMiddleware, 
    authorizeRoles(ADMIN, STUDENT), 
    CartController.getCartByUserId
);
router.get(
    '/:id', 
    authMiddleware, 
    authorizeRoles(ADMIN, STUDENT), 
    CartController.getCartById
);

//POST
router.post(
    "/", 
    authMiddleware, 
    authorizeRoles(ADMIN, STUDENT), 
    CartController.createCart
);

//PATCH
router.patch(
    '/update/:id', 
    authMiddleware, 
    authorizeRoles(ADMIN), 
    CartController.updateCart
);
router.patch(
    '/add-item', 
    authMiddleware, 
    authorizeRoles(ADMIN, STUDENT), 
    CartController.addItemToCart
);
router.patch(
    '/remove-item',
    authMiddleware, 
    authorizeRoles(ADMIN, STUDENT),  
    CartController.removeItemFromCart
);

//DELETE
router.delete(
    '/delete/:id', 
    authMiddleware, 
    authorizeRoles(ADMIN), 
    CartController.deleteCart
);


export default router;