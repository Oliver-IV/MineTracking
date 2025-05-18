import { status } from "@grpc/grpc-js";
import { HttpStatus } from "@nestjs/common";

export const grpcToHttpStatus = {
    [status.OK]: HttpStatus.OK,
    [status.CANCELLED]: HttpStatus.BAD_REQUEST,
    [status.UNKNOWN]: HttpStatus.INTERNAL_SERVER_ERROR,
    [status.INVALID_ARGUMENT]: HttpStatus.BAD_REQUEST,
    [status.DEADLINE_EXCEEDED]: HttpStatus.GATEWAY_TIMEOUT,
    [status.NOT_FOUND]: HttpStatus.NOT_FOUND,
    [status.ALREADY_EXISTS]: HttpStatus.CONFLICT,
    [status.PERMISSION_DENIED]: HttpStatus.FORBIDDEN,
    [status.RESOURCE_EXHAUSTED]: HttpStatus.TOO_MANY_REQUESTS,
    [status.FAILED_PRECONDITION]: HttpStatus.PRECONDITION_REQUIRED,
    [status.ABORTED]: HttpStatus.CONFLICT,
    [status.OUT_OF_RANGE]: HttpStatus.BAD_REQUEST,
    [status.UNIMPLEMENTED]: HttpStatus.NOT_IMPLEMENTED,
    [status.INTERNAL]: HttpStatus.INTERNAL_SERVER_ERROR,
    [status.UNAVAILABLE]: HttpStatus.SERVICE_UNAVAILABLE,
    [status.DATA_LOSS]: HttpStatus.INTERNAL_SERVER_ERROR,
    [status.UNAUTHENTICATED]: HttpStatus.UNAUTHORIZED,
  };

export const statusNames = {
    [HttpStatus.BAD_REQUEST]: 'Bad Request',
    [HttpStatus.UNAUTHORIZED]: 'Unauthorized',
    [HttpStatus.FORBIDDEN]: 'Forbidden',
    [HttpStatus.NOT_FOUND]: 'Not Found',
    [HttpStatus.CONFLICT]: 'Conflict',
    [HttpStatus.PRECONDITION_REQUIRED]: 'Precondition Required',
    [HttpStatus.TOO_MANY_REQUESTS]: 'Too Many Requests',
    [HttpStatus.INTERNAL_SERVER_ERROR]: 'Internal Server Error',
    [HttpStatus.NOT_IMPLEMENTED]: 'Not Implemented',
    [HttpStatus.SERVICE_UNAVAILABLE]: 'Service Unavailable',
    [HttpStatus.GATEWAY_TIMEOUT]: 'Gateway Timeout',
  };