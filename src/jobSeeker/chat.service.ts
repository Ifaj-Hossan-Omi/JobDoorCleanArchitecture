import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Chat } from "./chat.entity";

@Injectable()
export class ChatService {
  chatGateway: any;
  constructor(
    @InjectRepository(Chat)
    private chatRepository: Repository<Chat>,
  ) {}

  async sendMessage(senderId: string, receiverId: string, message: string, room: string): Promise<Chat> {
    const chat = this.chatRepository.create({ senderId, receiverId, message });
    await this.chatRepository.save(chat);
  
    // Emit 'chat' event with new message
    this.chatGateway.server.to(room).emit('chat', chat);
  
    return chat;
  }

  async getMessages(user1Id: string, user2Id: string): Promise<Chat[]> {
    return this.chatRepository
      .createQueryBuilder("chat")
      .where("chat.senderId IN (:...ids) AND chat.receiverId IN (:...ids)", { ids: [user1Id, user2Id] })
      .orderBy("chat.timestamp", "ASC")
      .getMany();
  }
}