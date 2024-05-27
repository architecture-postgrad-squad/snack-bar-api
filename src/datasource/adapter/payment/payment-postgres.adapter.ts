import { PrismaService } from '@/config/prisma.config';
import { Payment } from '@/core/domain/payment/payment.entity';
import { IPaymentRepository } from '@/core/repository/payment/payment.repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PaymentPostgresAdapter implements IPaymentRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(payment: Payment): Promise<Payment> {
    return await this.prisma.payment.create({
      data: {
        method: payment.method,
        value: payment.value,
      },
    });
  }
}
