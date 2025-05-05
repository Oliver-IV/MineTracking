import { CallHandler, ExecutionContext, HttpException, HttpStatus, Injectable, NestInterceptor } from "@nestjs/common";
import { catchError, Observable, throwError } from "rxjs";
import { grpcToHttpStatus, statusNames } from "./state-code-mapping";

@Injectable()
export class GrpcExceptionInterceptor implements NestInterceptor {

    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        return next.handle()
          .pipe(
            catchError(error => {
              if (!error.code) {
                return throwError(() => error);
              }
              
              const httpStatus = grpcToHttpStatus[error.code] || HttpStatus.INTERNAL_SERVER_ERROR;
              
              const errorResponse = {
                statusCode: httpStatus,
                error: this.getStatusName(httpStatus),
                details: error.details,
              };
    
              console.error(`[Error] code: ${error.code}, status: ${httpStatus}, details: ${error.details}`);
              
              return throwError(() => new HttpException(errorResponse, httpStatus));
            })
          );
      }

      private getStatusName(status: HttpStatus): string {
        return statusNames[status] || 'Unknown Error';
      }
}