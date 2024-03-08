// src/members/dto/register.dto.ts

import { ApiProperty } from '@nestjs/swagger';

export class RegisterDto {
  @ApiProperty({ example: '0912345678', description: '電話號碼' })
  phoneNumber: string;

  @ApiProperty({ example: '123456', description: '密碼' })
  password: string;
}
