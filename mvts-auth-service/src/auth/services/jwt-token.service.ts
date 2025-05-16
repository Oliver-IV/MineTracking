import { Injectable } from "@nestjs/common";
import { Response } from "express";
import { JwtService } from "@nestjs/jwt"

@Injectable()
export class JwtTokenService {

    constructor(private readonly jwtService: JwtService) {}

    signToken(userId: string) : string {
        const token = this.jwtService.sign({ userId: userId });
        return token ;
    }


    verifyToken(token:any, key:string) : boolean {
        try {
            return (this.getTokenData(token, key));
        } catch (error) {
            return false ;   
        }
    }

    getTokenData(token:any, key:string) {
        return this.jwtService.verify(token, {secret: key}) ;
    }

}