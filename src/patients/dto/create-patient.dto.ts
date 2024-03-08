// src/patients/dto/create-patient.dto.ts

import { ApiProperty } from '@nestjs/swagger';

export class CreatePatientDto {
  @ApiProperty({ example: '林小銘', description: '病患姓名' })
  name: string;

  @ApiProperty({ example: 'A123456789', description: '身分證字號' })
  identityNo: string;

  @ApiProperty({
    example: '1980-01-01',
    description: '出生年月日',
    type: 'string',
  })
  birthdate: string;

  @ApiProperty({ example: '台北市', description: '住址' })
  address: string;
}
