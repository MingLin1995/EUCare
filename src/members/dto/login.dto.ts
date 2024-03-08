// src/members/dto/login.dto.ts

import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({ example: '0912345678', description: '電話號碼' })
  phoneNumber: string;

  @ApiProperty({ example: '123456', description: '密碼' })
  password: string;
}
