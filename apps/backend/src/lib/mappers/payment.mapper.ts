import { Prisma } from "@prisma/client";
import { Payment } from "@devcourses/domain";

export const paymentMapper = {
  toPrismaCreate(payment: Payment): Prisma.PaymentCreateInput {
    return {
      id: payment.id,
      order: { connect: { id: payment.orderId } },
      user: { connect: { id: payment.userId } },
      provider: payment.provider,
      providerPaymentId: payment.providerPaymentId ?? null,
      status: payment.status,
      amount: payment.amount,
      currency: payment.currency,
    };
  },

  toPrismaUpdatePartial(partial: Partial<Payment>): Prisma.PaymentUpdateInput {
    const data: Prisma.PaymentUpdateInput = {};
    if (partial.providerPaymentId !== undefined) data.providerPaymentId = partial.providerPaymentId;
    if (partial.status !== undefined) data.status = partial.status;
    if (partial.amount !== undefined) data.amount = partial.amount;
    if (partial.currency !== undefined) data.currency = partial.currency;
    return data;
  },

  toDomain(prismaPayment: Prisma.PaymentGetPayload<{}>): Payment {
    return {
      id: prismaPayment.id,
      orderId: prismaPayment.orderId,
      userId: prismaPayment.userId,
      provider: prismaPayment.provider as Payment["provider"],
      providerPaymentId: prismaPayment.providerPaymentId ?? null,
      status: prismaPayment.status as Payment["status"],
      amount: prismaPayment.amount,
      currency: prismaPayment.currency,
      createdAt: prismaPayment.createdAt,
      updatedAt: prismaPayment.updatedAt,
    };
  },
};
