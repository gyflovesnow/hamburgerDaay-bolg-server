import { Module,MiddlewareConsumer, RequestMethod} from '@nestjs/common';
import { DemoService } from './demo.service';
import { DemoController } from './demo.controller';
import { LoggerMiddleware } from '../../logger.middleware';

@Module({
  controllers: [DemoController],
  providers: [DemoService],
  exports: [DemoService] // 导出DemoService，以便其他模块导入和使用
})
export class DemoModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes({path:'/demo',method:RequestMethod.GET})
  }
}
