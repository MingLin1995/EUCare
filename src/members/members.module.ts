import { Module } from '@nestjs/common';
import { MembersController } from './members.controller';
import { MembersService } from './members.service';
import { PrismaService } from '../../prisma/prisma.service';
import { JwtModule } from '@nestjs/jwt';

@Module({
  controllers: [MembersController],
  providers: [MembersService, PrismaService],
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET , 
      signOptions: { expiresIn: '600s' }, 
    }),
  ],
})
export class MembersModule {}
