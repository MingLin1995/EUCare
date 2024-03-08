import { ApiProperty } from '@nestjs/swagger';

export class AppointmentErrorResponseDto {
  @ApiProperty({ example: 409, description: 'HTTP 狀態碼' })
  statusCode: number;

  @ApiProperty({ example: '預約必須為整點時段、每位使用者最多可預約5個時段或每位病患最多可預約2個時段', description: '錯誤訊息' })
  message: string;

  @ApiProperty({ example: 'Conflict', description: '錯誤描述' })
  error: string;
}
