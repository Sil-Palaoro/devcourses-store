import { Router } from "express";
import { UserController } from "../controllers/user.controller";

const router = Router();

router.get("/", UserController.getAllUsers);
router.get('/:id', UserController.getUserById);
router.get("/", UserController.getByRole);
router.get("/", UserController.getByName);

router.post("/", UserController.createUser);


export default router;