import { Controller, Get, Post, Body, Patch, Param, Delete, ValidationPipe, UsePipes, UseGuards, Session, ParseIntPipe } from '@nestjs/common';
import { InterviewProcessService } from './interview_process.service';
import { CreateInterviewProcessDto } from './dto/create-interview_process.dto';
import { UpdateInterviewProcessDto } from './dto/update-interview_process.dto';
import { interviewerGuard } from 'src/JobInterviewer/interviewer.guard';

@Controller('interview-process')
@UseGuards(interviewerGuard)
export class InterviewProcessController {
  constructor(private readonly interviewProcessService: InterviewProcessService) {}

  @Post()
  create(@Body() createInterviewProcessDto: CreateInterviewProcessDto, @Session() session) {
    const interviewer_id = session.user_id;
    createInterviewProcessDto.interviewer = interviewer_id;
    createInterviewProcessDto.status = "Pending";
    return this.interviewProcessService.create(createInterviewProcessDto);
  }

  @Get()
  findAll() {
    return this.interviewProcessService.findAll();
  }

  @Get(':id')
  @UsePipes(new ValidationPipe())
  findOne(@Param('id', ParseIntPipe) id: string) {
    return this.interviewProcessService.findOne(+id);
  }

  @Patch(':id')
  @UsePipes(new ValidationPipe())
  update(@Param('id', ParseIntPipe) id: string, @Body() updateInterviewProcessDto: UpdateInterviewProcessDto, @Session() session) {
    const interviewer_id = session.user_id;
    updateInterviewProcessDto.interviewer = interviewer_id;
    updateInterviewProcessDto.status = "Pending";
    return this.interviewProcessService.update(+id, updateInterviewProcessDto);
  }

  @Delete(':id')
  @UsePipes(new ValidationPipe())
  remove(@Param('id', ParseIntPipe) id: string) {
    return this.interviewProcessService.remove(+id);
  }
}
