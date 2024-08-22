import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { CommonModule } from './common/common.module';
import { IamModule } from './iam/iam.module';
import { MemoryStorageModule } from './memory-storage/memory-storage.module';
import { MessengerModule } from './messenger/messenger.module';
import { UsersModule } from './user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.env${process.env.NODE_ENV ? '.' + process.env.NODE_ENV : ''}`,
    }),
    MongooseModule.forRootAsync({
      useFactory: () => ({
        uri: process.env.DATABASE_URI,
      }),
    }),
    CommonModule,
    MessengerModule,
    UsersModule,
    IamModule,
    MemoryStorageModule,
  ],
})
export class AppModule {}
