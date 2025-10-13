import { Router } from "express";
import { UserController } from "../controllers/user.controller";

const router = Router();

router.get("/", UserController.getAllUsers);

router.get("/by-role", UserController.getByRole);
router.get("/by-name", UserController.getByName);
router.get("/by-surname", UserController.getBySurname);
router.get("/by-email", UserController.getByEmail);

router.get('/:id', UserController.getUserById);


router.post("/", UserController.createUser);


export default router;