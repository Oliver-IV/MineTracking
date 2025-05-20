import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entites/user.entity';
import { Repository } from 'typeorm';
import { BannedResponse, BannedTokenDTO, CreateUserDTO, IsBannedResponse, LoginDTO, LoginResponse, TokenDataResponse, TokenDTO, UserResponse, VerifyTokenResponse } from '../protos/auth';
import { BannedToken } from '../entites/banned-token.entity';
import * as bcrypt from 'bcrypt';
import { JwtTokenService } from './jwt-token.service';
import { JWT_KEY } from 'src/configs/jwt.config';

@Injectable()
export class AuthService {

    constructor(
        @InjectRepository(User) private readonly usersRepository: Repository<User>,
        @InjectRepository(BannedToken) private readonly bannedTokensRepository: Repository<BannedToken>,
        private readonly jwtTokenService: JwtTokenService
    ) { }

    async createUser(userDto: CreateUserDTO): Promise<UserResponse> {
        const userEntity = this.usersRepository.create(userDto);
        await this.usersRepository.save(userEntity);
        return {
            id: userEntity.id,
            name: userEntity.name,
            email: userEntity.email
        }
    }

    async login(loginDto: LoginDTO): Promise<LoginResponse> {
        const user = await this.usersRepository.findOne({ where: { email: loginDto.email } });
        if (!user) {
            throw new Error('User not found');
        }
        const isPasswordValid = await bcrypt.compare(loginDto.password, user.password);
        if (!isPasswordValid) {
            throw new Error('Invalid password');
        }
        const token = this.jwtTokenService.signToken(user.id);
        return {
            token: token,
            user: {
                id: user.id,
                name: user.name,
                email: user.email
            }
        }
    }

    async banToken(tokenDto: BannedTokenDTO): Promise<BannedResponse> {
        const isTokenValid = this.jwtTokenService.verifyToken(tokenDto.token, JWT_KEY);
        if (!isTokenValid)
            return {
                isBanned: false,
                token: tokenDto.token
            }
        const isTokenBanned = await this.isTokenBanned(tokenDto);
        if (isTokenBanned.isBanned)
            return {
                isBanned: true,
                token: tokenDto.token
            }
        const tokenEntity = this.bannedTokensRepository.create(tokenDto);
        const token = await this.bannedTokensRepository.save(tokenEntity);
        if (token)
            return {
                isBanned: true,
                token: tokenDto.token
            }
        return {
            isBanned: false,
            token: tokenDto.token
        }
    }

    async isTokenBanned(tokenDto: BannedTokenDTO): Promise<IsBannedResponse> {
        const token = await this.bannedTokensRepository.findOne({ where: { token: tokenDto.token } });
        if (token)
            return {
                isBanned: true
            }
        return {
            isBanned: false
        }
    }

    verifyToken(token: TokenDTO): VerifyTokenResponse {
        const verified = this.jwtTokenService.verifyToken(token.token, JWT_KEY);
        if(verified)
            return {
                isValid: verified
            };
        return {
            isValid: false
        }
    }
    getTokenData(token: TokenDTO): TokenDataResponse {
        const isTokenValid = this.jwtTokenService.verifyToken(token.token, JWT_KEY);
        if (!isTokenValid)
            return {
                userId: ''
            };
        const tokenData = this.jwtTokenService.getTokenData(token.token, JWT_KEY);
        return {
            userId: tokenData.userId
        };
    }

}
