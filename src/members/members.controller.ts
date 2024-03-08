import { Controller, Post, Body } from '@nestjs/common';
import { MembersService } from './members.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { ApiTags, ApiResponse } from '@nestjs/swagger';
import { LoginResponseDto } from './dto/login-response.dto';
import { RegisterResponseDto } from './dto/register-response.dto';
import { MemberErrorResponseDto } from './dto/members-error-response.dto';

@ApiTags('members')
@Controller('members')
export class MembersController {
  constructor(private readonly membersService: MembersService) {}

 @Post('register')
@Post('register')
  @ApiResponse({ status: 201, description: '註冊成功', type: RegisterResponseDto })
  @ApiResponse({ status: 409, description: '註冊失敗', type: MemberErrorResponseDto })
  async register(@Body() registerDto: RegisterDto): Promise<RegisterResponseDto> {
    const member = await this.membersService.register(registerDto.phoneNumber, registerDto.password);
    return { id: member.id, phoneNumber: member.phoneNumber };
  }

@Post('login')
  @ApiResponse({ status: 200, description: '登入成功', type: LoginResponseDto })
  @ApiResponse({ status: 401, description: '登入失敗', type: MemberErrorResponseDto })
  async login(@Body() loginDto: LoginDto): Promise<LoginResponseDto> {
    const accessToken = await this.membersService.login(loginDto.phoneNumber, loginDto.password);
    return { accessToken };
  }
}
