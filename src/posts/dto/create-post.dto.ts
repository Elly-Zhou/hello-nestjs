import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString, IsOptional } from 'class-validator';

export class CreatePostDto {
  @ApiProperty({ description: 'Post title' })
  @IsNotEmpty({ message: '文章标题必填' })
  readonly title: string;

  @ApiProperty({ description: 'Post author' })
  @IsNotEmpty({ message: '缺少作者信息' })
  readonly author: string;

  @ApiPropertyOptional({ description: 'Post content' })
  readonly content: string;

  @ApiPropertyOptional({ description: 'Post cover url' })
  readonly cover_url: string;


  @ApiPropertyOptional({ description: 'Post type' })
  @IsOptional()
  @IsNumber()
  readonly type: number;
}