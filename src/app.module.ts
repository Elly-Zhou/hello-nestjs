import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigService, ConfigModule } from '@nestjs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PostsModule } from './posts/posts.module';
import envConfig from '../config/env';
import { PostsEntity } from './posts/posts.entity';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,  // 设置为全局
      envFilePath: [envConfig.path]
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        type: 'mysql', // 数据库类型
        // entities: [PostsEntity],  // 数据表实体
        autoLoadEntities: true, // load entities automatially
        host: configService.get('DB_HOST', 'localhost'), // 主机，默认为localhost
        port: configService.get<number>('DB_PORT', 3306), // 端口号
        username: configService.get('DB_USER', 'root'),   // 用户名
        password: configService.get('DB_PASSWORD', 'root'), // 密码
        database: configService.get('DB_DATABASE', 'sql_blog'), //数据库名
        timezone: '+08:00', //服务器上配置的时区
        synchronize: configService.get('DB_SYNCHRONIZE', false), //根据实体自动创建数据库表， 生产环境建议关闭
      }),
    }), PostsModule, UserModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
