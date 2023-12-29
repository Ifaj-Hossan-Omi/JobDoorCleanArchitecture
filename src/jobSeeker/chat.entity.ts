import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from "typeorm";



@Entity()
export class Chat {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  senderId: string;

  @Column()
  receiverId: string;

  @Column()
  message: string;

  @CreateDateColumn()
  timestamp: Date;
}