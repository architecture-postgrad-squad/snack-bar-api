import { PrismaService } from '@/config/prisma.config';
import { Payment } from '@/domain/entity/payment/payment.entity';
import { IPaymentRepository } from '@/domain/repository/payment/payment.repository';
import { CreatePaymentDto } from '@/transport/dto/Payment/payment.dto';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PrismaPaymentRepository implements IPaymentRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(payment: CreatePaymentDto): Promise<Payment> {
    return await this.prisma.payment.create({
      data: {
        ...payment,
      },
    });
  }
}
