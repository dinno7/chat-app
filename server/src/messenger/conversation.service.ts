import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  Conversation,
  ConversationDocument,
} from './schemas/conversation.schema';
import { Message } from './schemas/message.schema';

@Injectable()
export class ConversationService {
  constructor(
    @InjectModel(Message.name) private readonly MessageModel: Model<Message>,
    @InjectModel(Conversation.name)
    private readonly ConversationModel: Model<Conversation>,
  ) {}
  async getConversation(
    from: string,
    to: string,
  ): Promise<ConversationDocument> | null {
    return this.ConversationModel.findOne({
      $or: [
        { from: from, to: to },
        { from: to, to: from },
      ],
    });
  }

  async getMessagesFromConversation(conversation: ConversationDocument) {
    const conversationMsgs = await conversation.populate({
      path: 'messages',
      options: { limit: 3, sort: { createdAt: -1 } },
    });

    return conversationMsgs.messages.reverse();
  }

  async getMessages(from: string, to: string) {
    const conversation = await this.getConversation(from, to);
    if (!conversation?._id) return [];
    return this.getMessagesFromConversation(conversation);
  }
}
