import 'dotenv/config';
import './infrastructure/observability/otel';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpMetricsInterceptor } from './infrastructure/metrics/http-metrics.interceptor';
import { MetricsService } from './infrastructure/metrics/metrics.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: 'http://localhost:3000',
  });
  app.useGlobalInterceptors(
    new HttpMetricsInterceptor(app.get(MetricsService)),
  );
  await app.listen(process.env.PORT ?? 4000);
}

void bootstrap();
