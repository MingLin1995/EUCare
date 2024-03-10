// src/appointments/dto/appointments-response.dto.ts

import { ApiProperty } from '@nestjs/swagger';

export class AppointmentResponseDto {
  @ApiProperty({ example: 52, description: '預約ID' })
  id: number;

  @ApiProperty({ example: 26, description: '病患ID' })
  patientId: number;

  @ApiProperty({ example: '03/14/2024, 09:00', description: '預約日期和時間' })
  date: string;

  @ApiProperty({ example: '約體檢', description: '預約內容' })
  content: string;
}
