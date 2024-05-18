import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsOptional, MinLength } from 'class-validator';

export class UpdateClientDTO {
  @ApiProperty({ example: 'ffec97aa-b596-4e17-bd07-1c1f639eeeb6' })
  readonly id: string;
  @IsOptional()
  @MinLength(11)
  @ApiProperty({ example: '547.768.270-18' })
  readonly cpf?: string;
  @IsOptional()
  @MinLength(1)
  @ApiProperty({ example: 'John Doe' })
  readonly name?: string;
  @IsOptional()
  @IsEmail()
  @ApiProperty({ example: 'loremipsum@email.com' })
  readonly email: string;
}
