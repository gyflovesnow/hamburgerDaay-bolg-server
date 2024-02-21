import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import {map} from 'rxjs/operators'

interface Response<T> {
  data: T;
}
@Injectable()
export class TransformInterceptor<T> implements NestInterceptor <T,Response<T>>{
  intercept(context: ExecutionContext, next: CallHandler<T>): Observable<Response<T>> | Promise<Observable<Response<T>>> {
    // 数据返回之前对数据进行处理
    return next.handle().pipe(
      map((data) => ({
        code:0,
        data,
        pagination: { //分页
          total:100,
          pageSize:10,
          pages:10,
          page:1,
        },
        message:'success'

      })) // 返回一个对象，包含data属性
    )
  }
}
