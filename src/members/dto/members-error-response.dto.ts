// src/members/dto/members-error-response.dto.ts

import { ApiProperty } from '@nestjs/swagger';

export class RegisterErrorResponseDto {
  @ApiProperty({
    description: 'HTTP 狀態碼',
    example: '409',
  })
  statusCode: number;

  @ApiProperty({
    description: '錯誤訊息',
    example: '密碼錯誤',
  })
  message: string;

  @ApiProperty({
    description: '錯誤類型',
    example: 'Conflict',
  })
  error: string;
}

export class LoginErrorResponseDto {
  @ApiProperty({
    description: 'HTTP 狀態碼',
    example: '401',
  })
  statusCode: number;

  @ApiProperty({
    description: '錯誤訊息',
    example: '「電話號碼已被註冊」或「此電話號碼尚未註冊」。',
  })
  message: string;

  @ApiProperty({
    description: '錯誤類型',
    example: 'Unauthorized',
  })
  error: string;
}
