// src/members/dto/register-response.dto.ts

import { ApiProperty } from '@nestjs/swagger';

export class RegisterResponseDto {
  @ApiProperty({ example: 1, description: '用戶ID' })
  id: number;

  @ApiProperty({ example: '0912345678', description: '電話號碼' })
  phoneNumber: string;
}
