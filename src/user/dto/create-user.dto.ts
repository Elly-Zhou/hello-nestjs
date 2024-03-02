import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsIdentityCard, IsNotEmpty, IsNumber, IsString, IsOptional } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ description: 'username' })
  @IsNotEmpty({ message: 'username is required' })
  username: string;

  @ApiProperty({ description: 'password' })
  @IsNotEmpty({ message: 'password is required' })
  password: string;

  @ApiPropertyOptional({ description: 'avatar url' })
  avatar_url: string;

  @ApiPropertyOptional({ description: 'user role' })
  role: string;
}
