// patient-response.dto.ts

import { ApiProperty } from '@nestjs/swagger';

export class PatientResponseDto {

  @ApiProperty({ example: 15, description: '病患 ID' })
  id: number;

  @ApiProperty({ example: '林小銘', description: '病患姓名' })
  name: string;

  @ApiProperty({ example: 'A123456789', description: '身分證字號' })
  identityNo: string;

  @ApiProperty({ example: '1980-01-01', description: '出生年月日' })
  birthdate: string;

  @ApiProperty({ example: '台北市', description: '住址' })
  address: string;

  @ApiProperty({ example: 4, description: '會員 ID' })
  memberId: number;
}

export class PatientSearchResponseDto {

  @ApiProperty({ example: '林小銘', description: '病患姓名' })
  name: string;

  @ApiProperty({ example: 'A123456789', description: '身分證字號' })
  identityNo: string;

  @ApiProperty({ example: '1980-01-01', description: '出生年月日' })
  birthdate: string;

  @ApiProperty({ example: '台北市', description: '住址' })
  address: string;
}
