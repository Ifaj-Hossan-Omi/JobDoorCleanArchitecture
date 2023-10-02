import { Module } from '@nestjs/common';
import { JobProviderController } from './jobProvider.controller';

@Module({
  imports: [],
  controllers: [JobProviderController],
  providers: [],
})
export class JobProviderModule { }
