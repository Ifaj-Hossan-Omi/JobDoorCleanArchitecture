import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { JobProviderDTO } from './jobProvider.dto';
import { JobDTO } from './job.dto';
import { search } from 'superagent';
// import { AppService } from './app.service';

@Controller('jobprovider')
export class JobProviderController {
  // constructor(private readonly appService: AppService) { }
  constructor() { }

  @Get()
  getHello(): string {
    return "";
  }


  @Get()
  login(@Query('username') username: string, @Query('password') password: string): object {
    return { "message": "login successful", "userName": username };
  }

  @Get()
  logout(): object {
    return { "message": "logout successful" }
  };


  @Post('createAccount')
  createAccount(@Body() jobProvider: JobProviderDTO): object {
    return jobProvider;
  }

  @Post('postJob')
  postJob(@Body() job: JobDTO): object {
    return job;
  }

  @Get('searchJob/:name')
  searchJob(@Param('name') name: string): object {
    let job: JobDTO = new JobDTO();
    job.title = name;
    job.vacancy = "2";
    job.skill = "Java";
    return job;
  }




  // @Get()
  // (): string {
  //   return "";
  // }

}
