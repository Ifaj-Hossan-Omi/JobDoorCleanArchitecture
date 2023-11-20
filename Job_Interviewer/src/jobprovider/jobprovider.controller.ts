import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, UsePipes, ValidationPipe } from '@nestjs/common';
import { JobproviderService } from './jobprovider.service';
import { CreateJobproviderDto } from './dto/create-jobprovider.dto';
import { UpdateJobproviderDto } from './dto/update-jobprovider.dto';

@Controller('jobprovider')
@UsePipes(new ValidationPipe)
export class JobproviderController {
  constructor(private readonly jobproviderService: JobproviderService) {}

  @Post()
  create(@Body() createJobproviderDto: CreateJobproviderDto) {
    return this.jobproviderService.create(createJobproviderDto);
  }

  @Get()
  findAll() {
    return this.jobproviderService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: string) {
    return this.jobproviderService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: string, @Body() updateJobproviderDto: UpdateJobproviderDto) {
    return this.jobproviderService.update(+id, updateJobproviderDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: string) {
    return this.jobproviderService.remove(+id);
  }
}
