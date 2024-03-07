import { ApiProperty } from '@nestjs/swagger';

export class MemberErrorResponseDto {
@ApiProperty({
    description: 'HTTP 狀態碼',
    example: '例如 401 或 409。'
  })
  statusCode: number;

  @ApiProperty({
    description: '錯誤訊息',
    example: '例如「電話號碼已被註冊」或「此電話號碼尚未註冊」或「密碼錯誤」。'
  })
  message: string;

  @ApiProperty({
    description: '錯誤類型',
    example: '例如「Conflict」或「Unauthorized」。'
  })
  error: string;
}
