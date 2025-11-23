import { PaymentService } from "@devcourses/domain";
import db from "../lib/prisma";
import { paymentMapper } from "../lib/mappers/payment.mapper";

export const prismaPaymentServiceImplementation: PaymentService = {
  async getAll() {
    const payments = await db.payment.findMany();
    return payments.map(paymentMapper.toDomain);
  },

  async getById(id) {
    const p = await db.payment.findUnique({ where: { id } });
    return p ? paymentMapper.toDomain(p) : undefined;
  },

  async createPayment(data) {
    const created = await db.payment.create({
      data: paymentMapper.toPrismaCreate(data),
    });
    return paymentMapper.toDomain(created);
  },

  async completePayment(paymentId, providerPaymentId) {
    const existing = await db.payment.findUnique({ where: { id: paymentId }});
    if (!existing) return undefined;

    const updated = await db.payment.update({
      where: { id: paymentId },
      data: paymentMapper.toPrismaUpdatePartial({ providerPaymentId, status: "completed" }),
    });

    return paymentMapper.toDomain(updated);
  },

  async failPayment(paymentId, providerPaymentId) {
    const existing = await db.payment.findUnique({ where: { id: paymentId }});
    if (!existing) return undefined;

    const updated = await db.payment.update({
      where: { id: paymentId },
      data: paymentMapper.toPrismaUpdatePartial({ providerPaymentId, status: "failed" }),
    });

    return paymentMapper.toDomain(updated);
  },

  async refundPayment(paymentId) {
    const existing = await db.payment.findUnique({ where: { id: paymentId }});
    if (!existing) return undefined;

    const updated = await db.payment.update({
      where: { id: paymentId },
      data: paymentMapper.toPrismaUpdatePartial({ status: "refunded" }),
    });

    return paymentMapper.toDomain(updated);
  },

  async getPaymentsForOrder(orderId) {
    const payments = await db.payment.findMany({ where: { orderId } });
    return payments.map(paymentMapper.toDomain);
  },

  async getPaymentsForUser(userId) {
    const payments = await db.payment.findMany({ where: { userId } });
    return payments.map(paymentMapper.toDomain);
  },
};
