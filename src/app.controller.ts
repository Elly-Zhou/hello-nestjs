import { Controller, Get, Post, Put } from '@nestjs/common';
import { AppService } from './app.service';

@Controller("app")
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  getHi(): string {
    return this.appService.getHi();
  }

  // 1.固定路径
  @Get("list")
  getHello(): string {
    return this.appService.getHello();
  }

  @Post("create")
  create(): string {
    return this.appService.create();
  }

  // 2.通配符路径(?+* 三种通配符 )
  // 可以匹配到 get请求, http://localhost:9080/app/user_xxx
  @Get("user_*")
  getUser() { return "getUser" }

  // 这个put需要写在下个 list/:id 的前面
  @Put("list/user")
  updateUser() {
    return { userId: 1 }
  }

  // 3.带参数路径
  // 可以匹配到put请求，http://localhost:9080/app/list/xxxx
  @Put("list/:id")
  update() { return "update" }



}
