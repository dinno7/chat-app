import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { ParseMongoObjectId } from './parse-mongo-object-id.pipe';

@Injectable()
export class ParseUserById implements PipeTransform {
  constructor(
    private readonly userService: UserService,
    private readonly parseMongoObjectId: ParseMongoObjectId,
  ) {}

  async transform(value: any, metadata: ArgumentMetadata) {
    const userId = this.parseMongoObjectId.transform(value, metadata);
    const user = await this.userService.getUserById(userId);
    return user;
  }
}
