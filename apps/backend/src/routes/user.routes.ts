import { Router } from "express";
import { UserController } from "../controllers/user.controller";
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
    UserController.getAllUsers
);

router.get(
    "/by-role", 
    authMiddleware, 
    authorizeRoles(ADMIN), 
    UserController.getByRole);

router.get(
    "/by-name", 
    authMiddleware, 
    authorizeRoles(ADMIN), 
    UserController.getByName);
router.get(
    "/by-surname", 
    authMiddleware, 
    authorizeRoles(ADMIN), 
    UserController.getBySurname);
router.get(
    "/by-email", 
    authMiddleware, 
    authorizeRoles(ADMIN),     
    UserController.getByEmail);

router.get(
    '/:id', 
    authMiddleware, 
    authorizeRoles(ADMIN), 
    UserController.getUserById);

    
//POST
router.post("/", UserController.createUser);
router.post("/register", UserController.registerUser);
router.post("/login", UserController.loginUser);


//PATCH
router.patch(
    '/update/:id',
    authMiddleware, 
    authorizeRoles(ADMIN), 
    UserController.updateUser
);


//DELETE
router.delete(
    '/delete/:id',
    authMiddleware, 
    authorizeRoles(ADMIN), 
    UserController.deleteUser
);


export default router;