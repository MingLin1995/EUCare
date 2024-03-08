import { Injectable, ConflictException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { AppointmentResponseDto } from './dto/appointments-response.dto';

@Injectable()
export class AppointmentsService {
  constructor(private prisma: PrismaService) {}

  async create(userId: number, createAppointmentDto: CreateAppointmentDto): Promise<AppointmentResponseDto> {
    const patientId = createAppointmentDto.patientId;
    const appointmentDate = new Date(createAppointmentDto.date);

    if (appointmentDate.getMinutes() !== 0 || appointmentDate.getSeconds() !== 0) {
      throw new ConflictException('預約必須為整點時段');
    }

    const dayStart = new Date(appointmentDate);
    dayStart.setHours(0, 0, 0, 0);

    const dayEnd = new Date(appointmentDate);
    dayEnd.setHours(23, 59, 59, 999);

    const countAppointmentsForPatient = await this.prisma.appointment.count({
      where: {
        patientId,
        date: {
          gte: dayStart,
          lt: dayEnd,
        },
      },
    });

    if (countAppointmentsForPatient >= 2) {
      throw new ConflictException('每位病患最多可預約2個時段');
    }

    const countAppointmentsForDoctor = await this.prisma.appointment.count({
      where: {
        patient: {
          memberId: userId,
        },
        date: {
          gte: dayStart,
          lt: dayEnd,
        },
      },
    });

    if (countAppointmentsForDoctor >= 5) {
      throw new ConflictException('每位使用者最多可預約5個時段');
    }

    const appointment = await this.prisma.appointment.create({
      data: {
        patientId,
        content: createAppointmentDto.content,
        date: appointmentDate,
      },
    });

    const appointmentResponseDto = new AppointmentResponseDto();
      appointmentResponseDto.id = appointment.id;
      appointmentResponseDto.patientId = appointment.patientId;

      // 將日期格式化為 "03/14/2024, 09:00"
      const formattedDate = `${(appointmentDate.getMonth() + 1).toString().padStart(2, "0")}/${appointmentDate.getDate().toString().padStart(2, "0")}/${appointmentDate.getFullYear()}, ${appointmentDate.getHours().toString().padStart(2, "0")}:${appointmentDate.getMinutes().toString().padStart(2, "0")}`;
      appointmentResponseDto.date = formattedDate;

      appointmentResponseDto.content = appointment.content;

      return appointmentResponseDto;
  }

  async findAll(memberId: number): Promise<AppointmentResponseDto[]> {
  const appointments = await this.prisma.appointment.findMany({
    where: {
      patient: {
        memberId: memberId,
      },
    },
  });
  return appointments.map(appointment => {
    const dto = new AppointmentResponseDto();
    dto.id = appointment.id;
    dto.patientId = appointment.patientId;

    // 將日期格式化為 "03/14/2024, 09:00"
    const appointmentDate = new Date(appointment.date);
    const day = appointmentDate.getDate();
    const month = appointmentDate.getMonth() + 1;
    const year = appointmentDate.getFullYear();
    const hours = appointmentDate.getHours();
    const minutes = appointmentDate.getMinutes();
    const formattedDate = `${month.toString().padStart(2, "0")}/${day.toString().padStart(2, "0")}/${year}, ${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}`;
    dto.date = formattedDate;

    dto.content = appointment.content;
    return dto;
  });
}





}
