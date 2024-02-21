import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response} from '@nestjs/common';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: () => void) {
    console.log('Logger 局部中间件拦截', req.headers)
    next();
  }
}
