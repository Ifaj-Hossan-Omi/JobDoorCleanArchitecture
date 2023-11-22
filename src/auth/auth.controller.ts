import { Body, Controller, Injectable, Post, UseGuards, Request, Get } from '@nestjs/common';
import { JobProviderService } from 'src/JobProvider/jobProvider.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
// import { RefreshJwtGuard } from './guards/refresh-jwt-auth.guard';
import { AuthService } from './auth.service';
import { RefreshJwtGuard } from './guards/refresh-jwt-auth.guard';
import { JwtGuard } from './guards/jwt-auth.guard';

@Injectable()
@Controller('auth')
export class AuthController {
    constructor(
        private authService: AuthService,
        // private userService: UserService,
    ) { }

    @UseGuards(LocalAuthGuard)
    @Post('login')
    async login(@Request() req) {
        return await this.authService.login(req.user);
    }

    //   @Post('register')
    //   async registerUser(@Body() createUserDto: CreateUserDto) {
    //     return await this.userService.create(createUserDto);
    //   }

    @UseGuards(RefreshJwtGuard)
    @Post('refresh')
    async refrshToken(@Request() req) {
        return this.authService.refreshToken(req.user);
    }

    @UseGuards(JwtGuard)
    @Get('logout')
    logout(): object {
        return { "message": "logout successful" }
    };
}
