import { Module } from '@nestjs/common';
import { PrismaModule } from './infrastructure/prisma/prisma.module';
import { PagosModule } from './presentation/pagos/pagos.module';
import { MetricsModule } from './infrastructure/metrics/metrics.module';

@Module({
  imports: [PrismaModule, PagosModule, MetricsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
