import { Controller,Get} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AppService } from './app.service';
import { AllowAnon } from './common/decorator/allow-anon.decorator';
@Controller() // 使用 @Controller() 装饰器将该类标记为控制器
export class AppController {
    constructor(private readonly appService: AppService,private configService:ConfigService) {}
    @Get() // 使用 @Get() 装饰器将该方法标记为 GET 请求的处理程序
    @AllowAnon() // 允许匿名访问
    getHello(): string {
        return this.configService.get('APP'); // 调用 app.service.ts 中的 getHello() 方法并返回结果
    }
}