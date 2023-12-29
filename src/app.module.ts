import { Module } from '@nestjs/common';
import { JobSeekerModule } from './jobSeeker/jobSeeker.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Chat } from './jobSeeker/chat.entity';


@Module({
  imports: [JobSeekerModule,  TypeOrmModule.forRoot(
    { 
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'sudo',
      database: 'JobDoor',//Change to your database name
      autoLoadEntities: true,
      synchronize: true,
    } ),
    TypeOrmModule.forFeature([Chat])
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
