import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import { WsException } from '@nestjs/websockets';
import { isValidObjectId } from 'mongoose';

@Injectable()
export class ParseMongoObjectId implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    if (!isValidObjectId(value)) {
      throw new WsException('Validation failed (object-id is expected)');
    }
    return value;
  }
}
