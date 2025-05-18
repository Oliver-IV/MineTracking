import { Controller } from '@nestjs/common';
import { BannedResponse, BannedTokenDTO, CreateUserDTO, EmptyMessage, IsBannedResponse, LoginDTO, LoginResponse, TokenDataResponse, TokenDTO, UserResponse, UsersServiceController, UsersServiceControllerMethods, VerifyTokenResponse } from './protos/auth';
import { Observable } from 'rxjs';
import { AuthService } from './services/auth.service';

@Controller()
@UsersServiceControllerMethods()
export class AuthController implements UsersServiceController {

    constructor(private readonly usersService: AuthService) {}
    verifyToken(request: TokenDTO): VerifyTokenResponse {
        return this.usersService.verifyToken(request);
    }
    getTokenData(request: TokenDTO): TokenDataResponse {
        return this.usersService.getTokenData(request);
    }

    createUser(request: CreateUserDTO): Promise<UserResponse> {
        return this.usersService.createUser(request);
    }

    login(request: LoginDTO): Promise<LoginResponse> {
        return this.usersService.login(request);
    }

    banToken(request: BannedTokenDTO): Promise<BannedResponse>  {
        return this.usersService.banToken(request);
    }

    isTokenBanned(request: BannedTokenDTO): Promise<IsBannedResponse> { 
        return this.usersService.isTokenBanned(request);
    }

}
