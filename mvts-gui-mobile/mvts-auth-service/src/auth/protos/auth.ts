// Code generated by protoc-gen-ts_proto. DO NOT EDIT.
// versions:
//   protoc-gen-ts_proto  v2.7.0
//   protoc               v3.20.3
// source: src/users/protos/auth.proto

/* eslint-disable */
import { GrpcMethod, GrpcStreamMethod } from "@nestjs/microservices";
import { Observable } from "rxjs";

export const protobufPackage = "auth_service";

/** Requests */
export interface CreateUserDTO {
  name: string;
  lastName: string;
  email: string;
  password: string;
}

export interface LoginDTO {
  email: string;
  password: string;
}

export interface BannedTokenDTO {
  token: string;
}

export interface TokenDTO {
  token: string;
}

/** Responses */
export interface UserResponse {
  id: string;
  name: string;
  email: string;
}

export interface LoginResponse {
  token: string;
  user: UserResponse | undefined;
}

export interface BannedResponse {
  isBanned: boolean;
  token: string;
}

export interface IsBannedResponse {
  isBanned: boolean;
}

export interface TokenDataResponse {
  userId: string;
}

export interface VerifyTokenResponse {
  isValid: boolean;
}

export interface EmptyMessage {
}

export const AUTH_SERVICE_PACKAGE_NAME = "auth_service";

export interface UsersServiceClient {
  createUser(request: CreateUserDTO): Observable<UserResponse>;

  login(request: LoginDTO): Observable<LoginResponse>;

  banToken(request: BannedTokenDTO): Observable<BannedResponse>;

  isTokenBanned(request: BannedTokenDTO): Observable<IsBannedResponse>;

  verifyToken(request: TokenDTO): Observable<VerifyTokenResponse>;

  getTokenData(request: TokenDTO): Observable<TokenDataResponse>;
}

export interface UsersServiceController {
  createUser(request: CreateUserDTO): Promise<UserResponse> | Observable<UserResponse> | UserResponse;

  login(request: LoginDTO): Promise<LoginResponse> | Observable<LoginResponse> | LoginResponse;

  banToken(request: BannedTokenDTO): Promise<BannedResponse> | Observable<BannedResponse> | BannedResponse;

  isTokenBanned(request: BannedTokenDTO): Promise<IsBannedResponse> | Observable<IsBannedResponse> | IsBannedResponse;

  verifyToken(request: TokenDTO): Promise<VerifyTokenResponse> | Observable<VerifyTokenResponse> | VerifyTokenResponse;

  getTokenData(request: TokenDTO): Promise<TokenDataResponse> | Observable<TokenDataResponse> | TokenDataResponse;
}

export function UsersServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = ["createUser", "login", "banToken", "isTokenBanned", "verifyToken", "getTokenData"];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcMethod("UsersService", method)(constructor.prototype[method], method, descriptor);
    }
    const grpcStreamMethods: string[] = [];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcStreamMethod("UsersService", method)(constructor.prototype[method], method, descriptor);
    }
  };
}

export const USERS_SERVICE_NAME = "UsersService";
