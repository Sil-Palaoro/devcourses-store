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
router.post("/register", UserController.registerUser);
router.post("/login", UserController.loginUser);


router.patch('/update/:id', UserController.updateUser);

router.delete('/delete/:id', UserController.deleteUser);


export default router;