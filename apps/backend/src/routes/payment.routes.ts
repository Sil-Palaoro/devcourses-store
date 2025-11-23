import { Router } from "express";
import { PaymentController } from "../controllers/payment.controller";
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
    PaymentController.createPayment
);

router.post(
    "/complete", 
    authMiddleware, 
    authorizeRoles(STUDENT, ADMIN), 
    PaymentController.completePayment
);

router.post(
    "/fail", 
    authMiddleware, 
    authorizeRoles(STUDENT, ADMIN), 
    PaymentController.failPayment
);

router.post(
    "/webhook/mercadopago",
    MercadoPagoWebhookController.listen
);

export default router;
