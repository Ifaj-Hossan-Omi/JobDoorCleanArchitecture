import { Injectable } from '@nestjs/common';
import { Job } from './job.dto';

@Injectable()
export class JobSeekerService {
  getHello(): string {
    return 'Hello World!';
  }
}
