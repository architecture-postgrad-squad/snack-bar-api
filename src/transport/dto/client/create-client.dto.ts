import { CLIENT } from '@/transport/constant/client.constant';
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsOptional, IsString, MinLength } from 'class-validator';

const { CPF, NAME, EMAIL } = CLIENT.API_PROPERTY.CLIENT;

export class CreateClientDto {
  @IsOptional()
  @IsString()
  @MinLength(11)
  @ApiProperty({ example: CPF.EXAMPLE, description: CPF.DESC })
  readonly cpf?: string;

  @IsOptional()
  @IsString()
  @MinLength(1)
  @ApiProperty({ example: NAME.EXAMPLE, description: NAME.DESC })
  readonly name?: string;

  @IsOptional()
  @IsEmail()
  @ApiProperty({ example: EMAIL.EXAMPLE, description: EMAIL.DESC })
  readonly email: string;
}
