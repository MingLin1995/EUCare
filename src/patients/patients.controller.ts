// src/patients/patients.controller.ts

import { Controller, Get, Post, Body, UseGuards, Req } from '@nestjs/common';
import { ApiTags, ApiResponse } from '@nestjs/swagger';
import { PatientsService } from './patients.service';
import { CreatePatientDto } from './dto/create-patient.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import {
  PatientResponseDto,
  PatientSearchResponseDto,
} from './dto/patient-response.dto';
import { PatientErrorResponseDto } from './dto/patients-error-response.dto';

@ApiTags('patients')
@Controller('patients')
export class PatientsController {
  constructor(private readonly patientsService: PatientsService) {}

  // 建立病患資料
  @UseGuards(JwtAuthGuard)
  @Post()
  @ApiResponse({
    status: 201,
    description: '病患資料建立成功',
    type: PatientResponseDto,
  })
  @ApiResponse({
    status: 409,
    description: '該病患資料已經存在',
    type: PatientErrorResponseDto,
  })
  async create(@Req() req, @Body() createPatientDto: CreatePatientDto) {
    return this.patientsService.create(req.user.userId, createPatientDto);
  }

  // 查詢病患資料
  @UseGuards(JwtAuthGuard)
  @Get()
  @ApiResponse({
    status: 200,
    description: '取得所有病患資料',
    type: [PatientSearchResponseDto],
  })
  async searchAll(@Req() req): Promise<PatientSearchResponseDto[]> {
    const patients = await this.patientsService.findAll(req.user.userId);
    return patients.map((patient) => ({
      name: patient.name,
      identityNo: patient.identityNo,
      birthdate: patient.birthdate,
      address: patient.address,
    }));
  }
}
