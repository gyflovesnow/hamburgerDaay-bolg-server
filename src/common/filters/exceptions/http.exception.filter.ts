import { ArgumentsHost, Catch, ExceptionFilter,HttpException,HttpStatus} from '@nestjs/common';
import { Request,Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter<T> implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const request = host.switchToHttp().getRequest<Request>();
    const response = host.switchToHttp().getResponse<Response>();

    // http 异常处理
    response.status(HttpStatus.NOT_FOUND).send({
      statusCode: HttpStatus.NOT_FOUND,
      timestamp: new Date().toISOString(),
      path: request.url,
      message: exception.getResponse()
    })
  }
}
