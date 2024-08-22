import {
  Body,
  Controller,
  FileTypeValidator,
  Get,
  MaxFileSizeValidator,
  ParseFilePipe,
  Post,
  Query,
  Req,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Request } from 'express';
import { diskStorage } from 'multer';
import { ActiveUser } from 'src/iam/authentication/decorators/active-user.decorator';
import { Serialize } from 'src/iam/decorators/serialize.decorator';
import { REQUEST_USER_KEY } from 'src/iam/iam.constants';
import { UpdateUserDto } from './dtos/update-user.dto';
import { UserSerializeSchema } from './dtos/user.serialize';
import { UserDocument } from './schemas/users.schema';
import { UpdatableFields } from './types/updatable-fields.type';
import { UserService } from './user.service';

@Controller('user')
@Serialize(UserSerializeSchema)
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Get('me')
  getMe(@ActiveUser() user: UserDocument) {
    return user.toObject();
  }

  @UseInterceptors(
    FileInterceptor('profilePicture', {
      storage: diskStorage({
        destination: './public/images/profiles',
        filename(req, file, callback) {
          const user = req[REQUEST_USER_KEY] as UserDocument;
          const ext = file.originalname.split('.').at(-1);
          const imageName = `${user.id}.${ext}`;
          callback(null, imageName);
        },
      }),
    }),
  )
  @Post('update')
  async updateUser(
    @ActiveUser() user: UserDocument,
    @Body() body: UpdateUserDto,
    @Req() req: Request,
    @UploadedFile(
      new ParseFilePipe({
        fileIsRequired: false,
        validators: [
          new FileTypeValidator({
            fileType: new RegExp('image/(jpeg|jpg|png|svg)'),
          }),
          new MaxFileSizeValidator({ maxSize: 1024 * 500 /*500 KB*/ }),
        ],
      }),
    )
    userProfilePicture,
  ) {
    const updatedFields: UpdatableFields = {
      ...body,
    };

    if (userProfilePicture) {
      updatedFields.profilePicture = `/images/profiles/${userProfilePicture.filename}`;
    }
    const updatedUser = await this.userService.updateUser(
      user.id,
      updatedFields,
    );

    return updatedUser;
  }

  @Get('find')
  findUsers(@Query('q') nameOrEmail: string) {
    if (!nameOrEmail.length) return [];
    return this.userService.getUserByEmailOrName(nameOrEmail);
  }
}
