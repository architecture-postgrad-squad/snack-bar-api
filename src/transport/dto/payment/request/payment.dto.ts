import { PAYMENT } from '@/transport/constant/payment.constant';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

const { VALUE, METHOD } = PAYMENT.API_PROPERTY.PRODUCT;

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
}
