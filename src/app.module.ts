import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MembersModule } from './members/members.module';
import { PatientsModule } from './patients/patients.module';
import { AppointmentsModule } from './appointments/appointments.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [MembersModule, PatientsModule, AppointmentsModule,AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
