import { PrismaService } from '@/config/prisma.config';
import { Payment } from '@/domain/entity/payment/payment.entity';
import { PaymentRepository } from '@/domain/repository/payment/payment.repository';
import { CreatePaymentDto } from '@/transport/dto/payment.dto';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PrismaPaymentRepository implements PaymentRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(payment: CreatePaymentDto): Promise<Payment> {
    return await this.prisma.payment.create({
      data: {
        ...payment,
      },
    });
  }
}
