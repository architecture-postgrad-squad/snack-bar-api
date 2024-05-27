import { Client } from '@/core/domain/client/client.entity';
import { CLIENT } from '@/transport/constant/client.constant';
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsOptional, IsString, MinLength } from 'class-validator';

const { CPF, NAME, EMAIL } = CLIENT.API_PROPERTY.CLIENT;

export class UpdateClientDto {

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

export const toDomain = (dto: UpdateClientDto, id: string): Client => {
  return new Client(
    id,
    dto.name,
    dto.email,
    dto.cpf
  )
}
