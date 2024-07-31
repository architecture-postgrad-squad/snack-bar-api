import { ApiProperty } from '@nestjs/swagger';

import { Client } from '@/core/domain/client/client.entity';
import { Payment } from '@/core/domain/payment/payment.entity';
import { CLIENT } from '@/transport/constant/client.constant';
import { ORDER } from '@/transport/constant/order.constant';
import { PAYMENT } from '@/transport/constant/payment.constant';
import { IsNotEmpty, IsNumber, IsObject, IsString } from 'class-validator';

const { VALUE, METHOD } = PAYMENT.API_PROPERTY.PAYMENT;
const { ID: ORDER_ID } = ORDER.API_PROPERTY.ORDER;

export class CreatePaymentDto {
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({
    description: VALUE.DESC,
    example: VALUE.EXAMPLE,
    required: true,
  })
  readonly value: number;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: METHOD.DESC,
    example: METHOD.EXAMPLE,
    required: true,
  })
  readonly method: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: ORDER_ID.DESC, example: ORDER_ID.EXAMPLE, required: true })
  readonly orderId: string;

  @IsObject()
  @IsNotEmpty()
  @ApiProperty({ example: CLIENT.API_PROPERTY.CLIENT, required: true })
  readonly client: Client;
}

export const toDomain = (dto: CreatePaymentDto): Payment => {
  return new Payment(null, dto.value, dto.method, null);
};
