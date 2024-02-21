import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class DemoPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    console.log('我是处理demo参数的管道')
    return value;
  }
}
