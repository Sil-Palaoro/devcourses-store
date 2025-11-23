import { z } from "zod";

export const createPaymentSchema = z.object({
  orderId: z.uuid(),
  userId: z.uuid(),
  provider: z.enum(["MercadoPago", "Stripe"]),
});

export type CreatePaymentSchemaType = z.infer<typeof createPaymentSchema>;

export const paymentActionSchema = z.object({
  orderId: z.uuid(),
  paymentId: z.uuid(),
  providerPaymentId: z.string().optional(),
});
