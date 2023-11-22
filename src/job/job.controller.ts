import { Body, Controller, HttpException, HttpStatus, Post, UseGuards, ValidationPipe, UsePipes, Request, Get, Put, Param, ParseUUIDPipe, HttpCode, Delete } from '@nestjs/common';
import { JwtGuard } from 'src/auth/guards/jwt-auth.guard';
import { JobService } from './job.service';
import { JobCreateRequestDTO } from './dtos/jobDTOs/jobCreateRequest.dto';
import { JobProviderRequestDTO } from 'src/JobProvider/DTOs/JobProviderDTOs/jobProviderRequest.dto';
import { JobUpdateRequestDTO } from './dtos/jobDTOs/jobUpdateRequest.dto';
import { UUID } from 'crypto';

@Controller('job')
export class JobController {
    constructor(private readonly jobService: JobService) { }

    @UseGuards(JwtGuard)
    @Post('postJob')
    @UsePipes(new ValidationPipe)
    @HttpCode(HttpStatus.CREATED)
    async postJob(@Request() req, @Body() job: JobCreateRequestDTO): Promise<any> {
        try {
            job.jobProviderId = req.user.id;
            return await this.jobService.postJob(job);
        }
        catch (error) {
            throw new HttpException(error.message, HttpStatus.NOT_IMPLEMENTED);
        }
    }

    @UseGuards(JwtGuard)
    @HttpCode(HttpStatus.ACCEPTED)
    @Put('updateJob')
    @UsePipes(new ValidationPipe)
    async updateJob(@Body() updatedJob: JobUpdateRequestDTO): Promise<any> {
        try {
            return await this.jobService.updateJob(updatedJob);
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.NOT_FOUND);
        }
    };

    @UseGuards(JwtGuard)
    @HttpCode(HttpStatus.FOUND)
    @Get('showPostedJobs')
    async showPostedJobs(@Request() req): Promise<any> {
        try {
            return await this.jobService.showPostedJobs(req.user.id);
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.NO_CONTENT);
        }
    };

    @UseGuards(JwtGuard)
    @HttpCode(HttpStatus.FOUND)
    @Get('searchJobByID/:id')
    async searchJob(@Param('id', ParseUUIDPipe) id: UUID): Promise<any> {
        try {
            return await this.jobService.searchJobById(id);
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.NOT_FOUND);
        }
    };

    @UseGuards(JwtGuard)
    @HttpCode(HttpStatus.FOUND)
    @Get('searchJobByTitle/:title')
    async searchJobByTitle(@Param('title') title: string): Promise<any> {
        try {
            return await this.jobService.searchJobByTitle(title);
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.NOT_FOUND);
        }
    };

    @UseGuards(JwtGuard)
    @HttpCode(HttpStatus.FOUND)
    @Get('getAllJobs')
    async getAllJobs(): Promise<any> {
        try {
            return await this.jobService.getAllJobs();
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.NOT_FOUND);
        }
    };

    @UseGuards(JwtGuard)
    @HttpCode(HttpStatus.ACCEPTED)
    @Delete('deleteJob/:id')
    async deleteJob(@Request() req, @Param('id', ParseUUIDPipe) id: UUID): Promise<any> {
        try {
            await this.jobService.deleteJob(id, req.user.id);
            return { "message": `Job with ID : ${id} was deleted successfully` };
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.NOT_FOUND);
        }
    };

    //Not Working
    @UseGuards(JwtGuard)
    @HttpCode(HttpStatus.ACCEPTED)
    @Delete('deleteAllJobsByJobProvider')
    async deleteAllJobsByJobProvider(@Request() req): Promise<any> {
        try {
            await this.jobService.deleteAllJobsByJobProvider(req.user.id);
            return { "message": `All jobs were deleted successfully` };
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.NOT_FOUND);
        }
    };

    @UseGuards(JwtGuard)
    @HttpCode(HttpStatus.ACCEPTED)
    @Delete('deleteAllJobs')
    async deleteAllJobs(): Promise<any> {
        try {
            await this.jobService.deleteAllJobs();
            return { "message": `All jobs were deleted successfully` };
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.NOT_FOUND);
        }
    };

    // @UseGuards(JwtGuard)
    // @HttpCode(HttpStatus.ACCEPTED)
    // @Get('assignInterviewer/:id')



}
