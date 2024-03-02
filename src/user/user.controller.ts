import { Controller, Get, Post, Body, Patch, Param, Delete, ClassSerializerInterceptor, UseInterceptors, Req, UseGuards, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';

import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthGuard } from '@nestjs/passport';

@ApiTags("User")
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @ApiOperation({ summary: 'User Register' })
  @UseInterceptors(ClassSerializerInterceptor) // 用于过滤掉password的回显
  @Post('register')
  register(@Body() createUserDto: CreateUserDto) {
    return this.userService.register(createUserDto);
  }


  @ApiOperation({ summary: 'Get User Information' })
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))  // 对应着 jwt.strategy.ts
  @Get()
  async getUserInfo(@Req() req) {
    console.log(req.user)
    return req.user;
  }


  @ApiOperation({ summary: 'Get All users' })
  @Get('all')
  findAll(@Query() query) {
    return this.userService.findAll(query);
  }

  @ApiOperation({ summary: 'Get User by ID' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
