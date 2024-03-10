// src/appointments/dto/create-appointment.dto.ts

import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsString, Length } from 'class-validator';

export class CreateAppointmentDto {
  @ApiProperty({ example: 1, description: '病患 ID' })
  patientId: number;

  @ApiProperty({ example: '2024-03-14 06:00', description: '預約日期和時間' })
  @IsDateString()
  date: string;

  @ApiProperty({ example: '約體檢', description: '預約內容' })
  @IsString()
  @Length(1, 500)
  content: string;
}
