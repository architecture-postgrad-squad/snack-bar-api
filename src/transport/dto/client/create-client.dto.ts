import { Client } from '@/core/domain/client/client.entity';
import { CLIENT } from '@/transport/constant/client.constant';
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsOptional, IsString, Length, MinLength } from 'class-validator';

const { CPF, NAME, EMAIL } = CLIENT.API_PROPERTY.CLIENT;

export class CreateClientDto {
  @IsOptional()
  @IsString()
  @Length(11)
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

export const toDomain = (dto: CreateClientDto): Client => {
  return new Client(
    null,
    dto.name,
    dto.email,
    dto.cpf
  )
}
