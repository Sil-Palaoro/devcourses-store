import { Router } from "express";
import { CheckoutController } from "../controllers/checkout.controller";
import { MercadoPagoWebhookController } from "../controllers/mercadopago-webhook.controller";
import { authMiddleware } from "../middlewares/authMiddleware";
import { authorizeRoles } from "../middlewares/roleMiddleware";
import { UserRole } from "@devcourses/domain";

const router = Router();

const ADMIN: UserRole = "admin";
const STUDENT: UserRole = "student";

//POST
router.post(
    "/", 
    authMiddleware, 
    authorizeRoles(STUDENT, ADMIN), 
    CheckoutController.start
);

router.post(
    "/webhook/mercadopago",
    MercadoPagoWebhookController.listen
);
export default router;
