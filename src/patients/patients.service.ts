// src/patients/patients.service.ts

import { Injectable, ConflictException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreatePatientDto } from './dto/create-patient.dto';
import { PatientSearchResponseDto } from './dto/patient-response.dto';

@Injectable()
export class PatientsService {
  constructor(private prisma: PrismaService) {}

  // 建立病患資料
  async create(memberId: number, createPatientDto: CreatePatientDto) {
    const existingPatient = await this.prisma.patient.findUnique({
      where: {
        identityNo: createPatientDto.identityNo,
      },
    });

    if (existingPatient) {
      throw new ConflictException('該病患資料已經存在');
    }

    const data = {
      ...createPatientDto,
      birthdate: new Date(createPatientDto.birthdate),
      memberId,
    };

    return this.prisma.patient.create({ data });
  }

  // 查詢病患資料
  async findAll(memberId: number): Promise<PatientSearchResponseDto[]> {
    const patients = await this.prisma.patient.findMany({
      where: { memberId: memberId },
    });
    return patients.map((patient) => ({
      name: patient.name,
      identityNo: patient.identityNo,
      birthdate: patient.birthdate.toISOString().split('T')[0],
      address: patient.address,
    }));
  }
}
