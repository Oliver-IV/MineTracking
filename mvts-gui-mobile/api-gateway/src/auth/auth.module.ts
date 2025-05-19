import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { AUTH_SERVICE_URL } from 'src/configs/enviroment';
import { AUTH_SERVICE_PACKAGE_NAME } from './protos/auth';
import { JwtGuard } from './guards/JwtGuard';
import { AuthService } from './auth.service';
import * as grpc from '@grpc/grpc-js';
import * as fs from 'fs';

@Module({
  controllers: [AuthController],
  imports: [
    ClientsModule.register([
      {
        name: AUTH_SERVICE_PACKAGE_NAME,
        transport: Transport.GRPC,
        options: {
          url: AUTH_SERVICE_URL,
          package: 'auth_service',
          protoPath: join(process.cwd(), 'src', 'auth', 'protos', 'auth.proto'),
          credentials: grpc.credentials.createSsl(
            fs.readFileSync('../api-gateway/src/auth/certs/server.crt'),null,null,{ checkServerIdentity: () =>undefined})
        },
      },
    ])
  ],
  providers: [JwtGuard, AuthService],
  exports: [JwtGuard, AuthService]
})
export class AuthModule {}
