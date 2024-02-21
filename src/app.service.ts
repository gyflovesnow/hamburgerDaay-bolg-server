import { Injectable } from '@nestjs/common';
 
@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!'; // 这里返回的字符串将作为默认的 "hello" 路由处理函数的结果
  }
}