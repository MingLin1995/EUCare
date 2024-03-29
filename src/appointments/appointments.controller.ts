// src/appointments/appointments.controller.ts

import { Controller, Post, Body, UseGuards, Req, Get } from '@nestjs/common';
import { ApiTags, ApiResponse } from '@nestjs/swagger';
import { AppointmentsService } from './appointments.service';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { AppointmentResponseDto } from './dto/appointments-response.dto';
import { AppointmentErrorResponseDto } from './dto/appointments-error-response.dto';

@ApiTags('appointments')
@Controller('appointments')
export class AppointmentsController {
  constructor(private readonly appointmentsService: AppointmentsService) {}

  // 新增預約
  @UseGuards(JwtAuthGuard)
  @Post()
  @ApiResponse({
    status: 201,
    description: '預約成功',
    type: AppointmentResponseDto,
  })
  @ApiResponse({
    status: 409,
    description: '預約失敗',
    type: AppointmentErrorResponseDto,
  })
  async create(
    @Req() req,
    @Body() createAppointmentDto: CreateAppointmentDto,
  ): Promise<AppointmentResponseDto> {
    const appointment = await this.appointmentsService.create(
      req.user.userId,
      createAppointmentDto,
    );
    const appointmentResponseDto = new AppointmentResponseDto();
    appointmentResponseDto.id = appointment.id;
    appointmentResponseDto.patientId = appointment.patientId;
    appointmentResponseDto.date = appointment.date;
    appointmentResponseDto.content = appointment.content;
    return appointmentResponseDto;
  }

  // 取得預約資料
  @UseGuards(JwtAuthGuard)
  @Get()
  @ApiResponse({
    status: 200,
    description: '取得所有預約資料',
    type: [AppointmentResponseDto],
  })
  async searchAll(@Req() req): Promise<AppointmentResponseDto[]> {
    const appointments = await this.appointmentsService.findAll(
      req.user.userId,
    );
    return appointments.map((appointmentDto) => {
      const appointmentResponseDto = new AppointmentResponseDto();
      appointmentResponseDto.id = appointmentDto.id;
      appointmentResponseDto.patientId = appointmentDto.patientId;
      appointmentResponseDto.date = appointmentDto.date;
      appointmentResponseDto.content = appointmentDto.content;
      return appointmentResponseDto;
    });
  }
}
