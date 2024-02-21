/*
 * @Author: hamburgerDaddy
 * @Date: 2023-1-21 19:28:09
 * @LastEditTime: 2023-1-21 13:48:11
 * @Description: 坚持学习！
 * @FilePath: \hamburgerDaddy-blog\src\app.module.ts
 * 
 */

import { Module,ValidationPipe} from '@nestjs/common';
import {APP_GUARD,APP_INTERCEPTOR,APP_FILTER,APP_PIPE} from "@nestjs/core"
import {ConfigModule,ConfigService} from '@nestjs/config';
import { TypeOrmModule,TypeOrmModuleOptions} from '@nestjs/typeorm';
import { addTransactionalDataSource } from 'typeorm-transactional';
import { DataSource } from 'typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './modules/user/user.module';
import { DemoModule } from './modules/demo/demo.module';
import { getYmlConfig } from './utils/ymlConfig';
// import { JwtAuthGuard } from './common/guard/auth.guard';
import { TransformInterceptor } from './common/interceptor/transform.interceptor';
import { HttpExceptionFilter } from './common/filters/exceptions/http.exception.filter';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal:true,
      ignoreEnvFile:true,
      load: [getYmlConfig]
  }),
  // 数据库
  TypeOrmModule.forRootAsync({
    imports: [ConfigModule],
    inject: [ConfigService],
    useFactory: (config: ConfigService) => {
      return {
        type: 'mysql',
        autoLoadEntities: true,
        keepConnectionAlive: true,
        ...config.get('MYSQL')
      } as TypeOrmModuleOptions
    },
    // async dataSourceFactory (options) {
    //   if(!options) {
    //     return new Error('数据库配置错误')
    //   }
    //   return addTransactionalDataSource(new DataSource(options));
    // }
  }),UserModule, DemoModule],
  controllers: [AppController],
  providers: [AppService]
  // providers: [AppService, {
  //   provide: APP_PIPE,
  //   useClass: ValidationPipe,
  // },{
  //   provide: APP_INTERCEPTOR,
  //   useClass: TransformInterceptor,
  // }, {
  //   provide: APP_FILTER,
  //   useClass: HttpExceptionFilter,
  // }],
  // {
  //   // provide: APP_GUARD,
  //   // useClass: JwtAuthGuard, // 这里使用 JwtAuthGuard 作为全局守卫
  // }
})
export class AppModule {}
