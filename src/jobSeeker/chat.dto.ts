export class ChatDTO {
    id: number;
    senderId: string;
    receiverId: string;
    message: string;
    room: string;
    timestamp: Date;
}
