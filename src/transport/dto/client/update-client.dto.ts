import { CLIENT } from '@/transport/constant/client.constant';
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsOptional, IsString, MinLength } from 'class-validator';

const { ID, CPF, NAME, EMAIL } = CLIENT.API_PROPERTY.CLIENT;

export class UpdateClientDto {
  @IsString()
  @ApiProperty({ example: ID.EXAMPLE, description: ID.DESC, required: true })
  readonly id: string;

  @IsOptional()
  @IsString()
  @MinLength(11)
  @ApiProperty({ example: CPF.EXAMPLE, description: CPF.DESC, required: false })
  readonly cpf?: string;

  @IsOptional()
  @IsString()
  @MinLength(1)
  @ApiProperty({ example: NAME.EXAMPLE, description: NAME.DESC, required: false })
  readonly name?: string;

  @IsOptional()
  @IsEmail()
  @ApiProperty({ example: EMAIL.EXAMPLE, description: EMAIL.DESC, required: true })
  readonly email: string;
}
