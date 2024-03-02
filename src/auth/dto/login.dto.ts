import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class LoginDto {
  @ApiProperty({ description: 'username' })
  @IsNotEmpty({ message: 'Please input username' })
  username: string;

  @ApiProperty({ description: 'password' })
  @IsNotEmpty({ message: 'Please input password' })
  password: string;
}