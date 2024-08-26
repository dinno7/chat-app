import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MemoryStorageModule } from 'src/memory-storage/memory-storage.module';
import { UsersModule } from 'src/user/user.module';
import { ConversationService } from './conversation.service';
import { MessengerService } from './messenger.gateway';
import { ParseMongoObjectId } from './pipes/parse-mongo-object-id.pipe';
import {
  Conversation,
  ConversationSchema,
} from './schemas/conversation.schema';
import { Message, MessageSchema } from './schemas/message.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Message.name, schema: MessageSchema },
      { name: Conversation.name, schema: ConversationSchema },
    ]),
    MemoryStorageModule,
    UsersModule,
  ],
  providers: [MessengerService, ParseMongoObjectId, ConversationService],
})
export class MessengerModule {}
