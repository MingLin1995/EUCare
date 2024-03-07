import { Injectable, ConflictException, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../../prisma/prisma.service'; 
import { JwtService } from '@nestjs/jwt'; 
import { Member } from '@prisma/client'; 

@Injectable()
export class MembersService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async register(phoneNumber: string, password: string): Promise<Member> {
    const existingMember = await this.prisma.member.findUnique({
      where: { phoneNumber },
    });
    if (existingMember) {
      throw new ConflictException('電話號碼已被註冊');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const member = await this.prisma.member.create({
      data: {
        phoneNumber,
        password: hashedPassword,
      },
    });

    return member;
  }

async login(phoneNumber: string, password: string): Promise<string> {
    const member = await this.prisma.member.findUnique({
      where: { phoneNumber },
    });
    if (!member) {
      throw new UnauthorizedException('此電話號碼尚未註冊');
    }

    const isPasswordValid = await bcrypt.compare(password, member.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('密碼錯誤');
    }

    const payload = { phoneNumber: member.phoneNumber, sub: member.id };
    return this.jwtService.sign(payload);
  }
}
