import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService as AuthService } from './services/auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BannedToken } from './entites/banned-token.entity';
import { User } from './entites/user.entity';
import { JwtTokenService } from './services/jwt-token.service';
import { JwtModule } from '@nestjs/jwt';
import { JWT_KEY } from 'src/configs/jwt.config';

@Module({
  controllers: [AuthController],
  providers: [AuthService, JwtTokenService],
  imports:[
    TypeOrmModule.forFeature([User, BannedToken]),
    JwtModule.register({
    secret: JWT_KEY,
    signOptions: { expiresIn: '1h' }
  })],
})
export class AuthModule { }
