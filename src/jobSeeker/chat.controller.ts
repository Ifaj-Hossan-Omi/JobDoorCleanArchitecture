import { Body, Controller, Get, Post, Session, UseGuards } from '@nestjs/common';
import { Request, Response } from 'express';
import { Chat } from './chat.entity';
import { SessionGuard } from './session.guard';
import { ChatService } from './chat.service';
import { send } from 'process';
import { ChatDTO } from './chat.dto';


@Controller('chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Post('/sendMessage')
  @UseGuards(SessionGuard)
  async sendMessage(@Body() chatDTO : ChatDTO): Promise<Chat> {
    const message = chatDTO.message;
    const receiverId = chatDTO.receiverId;
    const senderId = chatDTO.senderId;
    const room = chatDTO.room;
    return this.chatService.sendMessage(senderId, receiverId, message, room);
  }

  @Post('/getMessages')
  @UseGuards(SessionGuard)
  async getMessages(@Body() chatDTO: ChatDTO): Promise<Chat[]> {
    return this.chatService.getMessages(chatDTO.senderId, chatDTO.receiverId);
  }
}
