import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { JobProviderModule } from './JobProvider/jobProvider.module';

@Module({
  imports: [JobProviderModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
