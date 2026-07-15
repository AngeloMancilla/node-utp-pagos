import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { MetricsService } from './metrics.service';
import { Observable, tap } from 'rxjs';

@Injectable()
export class HttpMetricsInterceptor implements NestInterceptor {
  constructor(private readonly metrics: MetricsService) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
    const req = context
      .switchToHttp()
      .getRequest<{ method: string; route?: { path?: string }; url: string }>();
    const res = context.switchToHttp().getResponse<{ statusCode: number }>();
    const start = process.hrtime.bigint();

    return next.handle().pipe(
      tap({
        next: () => this.record(req, res, start),
        error: () => this.record(req, res, start),
      }),
    );
  }

  private record(
    req: { method: string; route?: { path?: string }; url: string },
    res: { statusCode: number },
    start: bigint,
  ) {
    const seconds = Number(process.hrtime.bigint() - start) / 1e9;
    const route = req.route?.path ?? req.url;
    this.metrics.observarHttp(req.method, route, res.statusCode, seconds);
  }
}
