import { Injectable, OnModuleInit } from '@nestjs/common';
import {
  collectDefaultMetrics,
  Counter,
  Histogram,
  Registry,
} from 'prom-client';

@Injectable()
export class MetricsService implements OnModuleInit {
  readonly register = new Registry();

  readonly pagosTotal: Counter<'resultado'>;
  readonly httpRequestDuration: Histogram<'method' | 'route' | 'status_code'>;

  constructor() {
    this.pagosTotal = new Counter({
      name: 'pagos_total',
      help: 'Total de pagos procesados',
      labelNames: ['resultado'] as const,
      registers: [this.register],
    });

    this.httpRequestDuration = new Histogram({
      name: 'http_request_duration_seconds',
      help: 'Duración de las peticiones HTTP en segundos',
      labelNames: ['method', 'route', 'status_code'] as const,
      registers: [this.register],
    });
  }

  onModuleInit() {
    collectDefaultMetrics({ register: this.register });
  }

  observarHttp(
    method: string,
    route: string,
    statusCode: number,
    seconds: number,
  ) {
    this.httpRequestDuration.observe(
      {
        method,
        route,
        status_code: String(statusCode),
      },
      seconds,
    );
  }

  incrementarPago(resultado: 'success' | 'error') {
    this.pagosTotal.inc({ resultado });
  }

  async getMetrics(): Promise<string> {
    return this.register.metrics();
  }
}
