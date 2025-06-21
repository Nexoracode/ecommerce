import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { Observable } from "rxjs";
import { map } from 'rxjs/operators';

@Injectable()
export class ResponseInterceptor<T> implements NestInterceptor<T, any> {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        return next.handle().pipe(
            map((data) => {
                const res = context.switchToHttp().getResponse();
                const statusCode = res.statusCode || 200;

                if (
                    typeof data === 'object' &&
                    data !== null &&
                    'data' in data &&
                    'message' in data
                ) {
                    return {
                        success: true,
                        statusCode,
                        message: data.message,
                        data: data.data,
                    }
                }

                return {
                    success: true,
                    statusCode,
                    message: 'عملیات با موفقیت انجام شد',
                    data: data,
                }
            })
        )
    }
}