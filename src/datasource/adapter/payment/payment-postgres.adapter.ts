import { PrismaService } from '@/config/prisma.config';
import { Payment } from '@/core/domain/payment/payment.entity';
import { IPaymentRepository } from '@/core/repository/payment/payment.repository';
import { CreatePaymentDto } from '@/transport/dto/payment/request/payment.dto';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PaymentPostgresAdapter implements IPaymentRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(payment: CreatePaymentDto): Promise<Payment> {
    return await this.prisma.payment.create({
      data: {
        ...payment,
      },
    });
  }
}
