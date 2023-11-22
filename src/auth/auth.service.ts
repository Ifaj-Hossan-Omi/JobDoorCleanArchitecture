import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { JobProviderService } from 'src/JobProvider/jobProvider.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(
        private readonly jobProviderService: JobProviderService,
        private jwtService: JwtService,
    ) { }

    async validateUser(username: string, password: string) {
        const jobProvider = await this.jobProviderService.getJobProviderByUsername(username);
        if (jobProvider && (await bcrypt.compare(password, jobProvider.password))) {
            const { password, ...result } = jobProvider;
            return result;
        }
        return null;
    }

    async login(jobProvider: any) {
        const payload = {
            id: jobProvider.id,
            sub: {
                username: jobProvider.username,
            },
        };

        return {
            ...jobProvider,
            accessToken: this.jwtService.sign(payload),
            refreshToken: this.jwtService.sign(payload, { expiresIn: '7d' }),
        };
    }

    async refreshToken(user: any) {

        const payload = {
            id: user.id,
            sub: {
                username: user.username,
            },
        };

        return {
            accessToken: this.jwtService.sign(payload),
        };
    }
}
