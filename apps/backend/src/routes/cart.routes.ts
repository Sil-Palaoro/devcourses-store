import { Router } from "express";
import { CartController } from "../controllers/cart.controller";

const router = Router();

router.get("/", CartController.getAllCarts);
router.get("/by-user-id/:id", CartController.getCartByUserId);
router.get('/:id', CartController.getCartById);

router.post("/", CartController.createCart);

router.patch('/update/:id', CartController.updateCart);
router.patch('/add-item', CartController.addItemToCart);
router.patch('/remove-item', CartController.removeItemFromCart);

router.delete('/delete/:id', CartController.deleteCart);


export default router;