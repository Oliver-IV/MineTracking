import { HttpException, HttpStatus, Inject, Injectable, OnModuleInit } from "@nestjs/common";
import { AUTH_SERVICE_PACKAGE_NAME, BannedResponse, BannedTokenDTO, CreateUserDTO, IsBannedResponse, LoginDTO, LoginResponse, TokenDataResponse, TokenDTO, UserResponse, USERS_SERVICE_NAME, UsersServiceClient, VerifyTokenResponse } from "./protos/auth";
import { ClientGrpc } from "@nestjs/microservices";
import { Observable } from "rxjs";
import { lastValueFrom } from "rxjs";

@Injectable()
export class AuthService implements OnModuleInit {
    private authService: UsersServiceClient; // Mantenemos el cliente gRPC internamente

    constructor(
        @Inject(AUTH_SERVICE_PACKAGE_NAME) private client: ClientGrpc
    ) {}

    onModuleInit() {
        this.authService = this.client.getService<UsersServiceClient>(USERS_SERVICE_NAME);
    }

    async createUser(userDto: CreateUserDTO): Promise<UserResponse> {
        return await lastValueFrom(this.authService.createUser(userDto));
    }

    async login(loginDto: LoginDTO): Promise<LoginResponse> {
        const response = await lastValueFrom(this.authService.login(loginDto));
        if(!response.token)
            throw new HttpException("Invalid credentials", HttpStatus.UNAUTHORIZED);
        return response;
    }

    async banToken(tokenDto: BannedTokenDTO): Promise<BannedResponse> {
        return await lastValueFrom(this.authService.banToken({token: tokenDto.token}));
    }

    async isTokenBanned(tokenDto: BannedTokenDTO): Promise<IsBannedResponse> {
        return await lastValueFrom(this.authService.isTokenBanned({token: tokenDto.token}));
    }

    async verifyToken(tokenDto: TokenDTO): Promise<VerifyTokenResponse> {
        return await lastValueFrom(this.authService.verifyToken({token: tokenDto.token}));
    }

    async getTokenData(tokenDto: TokenDTO): Promise<TokenDataResponse> {
        const response = await lastValueFrom(this.authService.getTokenData({token: tokenDto.token}));
        if(!response.userId)
            throw new HttpException("Invalid token", HttpStatus.UNAUTHORIZED);
        return response;
    }
}