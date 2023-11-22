import { Module } from '@nestjs/common';

import { JobProviderModule } from './JobProvider/jobProvider.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import typeOrmConfig from './config/typeOrmConfig';
import { MailerModule } from '@nestjs-modules/mailer';
import mailerConfig from './config/mailerConfig';
import { ConfigModule } from '@nestjs/config';
import { JobModule } from './job/job.module';

@Module({
  imports: [
    // ConfigModule.forRoot(),
    JobProviderModule,
    TypeOrmModule.forRoot(typeOrmConfig),
    AuthModule,
    MailerModule.forRoot(mailerConfig),
    JobModule,
  ],
})
export class AppModule { }









// @Module({
//   imports: [JobProviderModule, TypeOrmModule.forRoot(typeOrmConfig), AuthModule,
//     MailerModule.forRoot({
//       transport: {
//         host: 'smtp.gmail.com',
//         auth: {
//           user: 'omiifajhossanofficial@gmail.com',
//           pass: 'hrjv wmar cibj hgic',
//         },
//       }
//     }),
//   ],
//   controllers: [AppController],
//   providers: [AppService],
// })
// export class AppModule { }


















// @Module({
//   imports: [JobProviderModule, TypeOrmModule.forRoot(
//     {
//       type: 'postgres',
//       host: 'localhost',
//       port: 5432,
//       username: 'postgres',
//       password: '1234',
//       database: 'jobDoorDB',//Change to your database name
//       autoLoadEntities: true,
//       synchronize: true,
//     }), AuthModule,],
//   controllers: [AppController],
//   providers: [AppService],
// })
// export class AppModule { }

