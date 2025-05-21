import { CanActivate, ExecutionContext, HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { Request } from "express";
import { JWT_KEY } from "src/configs/jwt.config";
import { Repository } from "typeorm";
import { AuthService } from "../auth.service";

@Injectable()
export class JwtGuard implements CanActivate {
    constructor(
        private readonly authService: AuthService
    ) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const req: Request = context.switchToHttp().getRequest();
        const token = req.cookies?.auth_token;
        if (!token) {
            if(req.path.endsWith("/login") || req.path.endsWith("/register"))
                return true;
            throw new HttpException("Login required", HttpStatus.UNAUTHORIZED);
        }
        try {
            const tokenResponse = await this.authService.verifyToken({token: token});
            if (tokenResponse.isValid) {
                if (req.path.endsWith("/login") || req.path.endsWith("/register")) {
                    throw new HttpException("Logout required", HttpStatus.UNAUTHORIZED);
                }

                const tokenData = await this.authService.getTokenData({token: token});
                req['user_id'] = tokenData.userId;
                return true;
            }

            throw new HttpException("Invalid token", HttpStatus.UNAUTHORIZED);
        } catch (error) {
            throw new HttpException(
                error.message || "Login required",
                HttpStatus.UNAUTHORIZED
            );
        }
    }
}