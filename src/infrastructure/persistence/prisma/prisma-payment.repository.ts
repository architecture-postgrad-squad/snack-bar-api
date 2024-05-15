import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { PaymentRepository } from 'src/domain/repository/payment/payment.repository';
import { Payment } from 'src/domain/entity/payment/payment.entity';

@Injectable()
export class PrismaPaymentRepository implements PaymentRepository {
    constructor(private readonly prisma: PrismaService) {}

    async create(payment: Payment): Promise<Payment> {
        const createdPayment = await this.prisma.payment.create({
            data: {
                value: payment.value,
                method: payment.method,
            },
        });
        return createdPayment;
    }
}