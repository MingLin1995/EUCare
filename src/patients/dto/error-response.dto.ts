// src/common/dto/error-response.dto.ts

import { ApiProperty } from '@nestjs/swagger';

export class ErrorResponseDto {
  @ApiProperty({ example: 409, description: 'HTTP 狀態碼' })
  statusCode: number;

  @ApiProperty({ example: '該病患資料已經存在', description: '錯誤訊息' })
  message: string;

  @ApiProperty({ example: 'Conflict', description: '錯誤描述' })
  error: string;
}
