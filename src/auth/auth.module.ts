import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JobProviderService } from 'src/JobProvider/jobProvider.service';
import { JwtModule } from '@nestjs/jwt';
import { LocalStrategy } from './strategies/local-strategy';
// import { JwtStrategy } from './strategies/jwt-strategy';
// import { RefreshJwtStrategy } from './strategies/refreshToken.strategy';
import { JobProviderEntity } from 'src/entities/jobProvider.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JobProviderModule } from 'src/JobProvider/jobProvider.module';
import { JwtStrategy } from './strategies/jwt-strategy';
import { RefreshJwtStrategy } from './strategies/refreshToken.strategy';

@Module({
  providers: [
    AuthService,
    // JobProviderService,
    LocalStrategy,
    JwtStrategy,
    RefreshJwtStrategy,
    // JobProviderService,
  ],
  controllers: [AuthController],
  imports: [
    JobProviderModule,
    // TypeOrmModule.forFeature([JobProviderEntity]),
    JwtModule.register({
      secret: `${process.env.jwt_secret}`,
      signOptions: { expiresIn: '1d' },
    }),
  ],
})
export class AuthModule { }
