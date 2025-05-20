import { Body, Controller, Post, Res } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { RegisterUserDto } from './dto/register-user.dto';
import { AuthService } from './auth.service';
import { TokenDto } from './dto/token.dto';
import { Response } from 'express';

@Controller('auth')
export class AuthController {

    constructor(private readonly authService: AuthService) { }

    @Post('login')
    async login(@Body() loginDto: LoginDto, @Res() res: Response) {
        console.log(loginDto);
        const response = await this.authService.login(loginDto);
        res.cookie('auth_token', response.token, {
            httpOnly: true,
            secure: true,
            sameSite: 'none',
            expires: new Date(Date.now() + 3600000),
        });
        return res.status(200).json({
            success: true,
            user: response.user,
            token: response.token
        });
    }

    @Post('register')
    register(@Body() registerUserDto: RegisterUserDto) {
        return this.authService.createUser(registerUserDto);
    }

    @Post('ban-token')
    banToken(@Body() bannedTokenDto: TokenDto) {
        return this.authService.banToken(bannedTokenDto);
    }

    @Post('is-token-banned')
    isTokenBanned(@Body() bannedTokenDto: TokenDto) {
        return this.authService.isTokenBanned(bannedTokenDto);
    }

    @Post('verify-token')
    verifyToken(@Body() tokenDto: TokenDto) {
        return this.authService.verifyToken(tokenDto);
    }

    @Post('get-token-data')
    getTokenData(@Body() tokenDto: TokenDto) {
        return this.authService.getTokenData(tokenDto);
    }

}
