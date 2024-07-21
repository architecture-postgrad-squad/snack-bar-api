import { ApiProperty } from '@nestjs/swagger';

import { Payment } from '@/core/domain/payment/payment.entity';
import { PAYMENT } from '@/transport/constant/payment.constant';

const { STATUS } = PAYMENT.API_PROPERTY.PAYMENT;

export class GetPaymentStatusResponseDto {
  @ApiProperty({
    description: STATUS.DESC,
    example: STATUS.EXAMPLE,
  })
  status: string;

  constructor(id?: string) {
    this.status = id ? 'APROVADO' : null;
  }
}

export const toDTO = (payment: Payment): GetPaymentStatusResponseDto => {
  return new GetPaymentStatusResponseDto(payment.id);
};
