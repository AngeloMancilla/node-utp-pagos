import { Module } from '@nestjs/common';
import { PrismaModule } from './infrastructure/prisma/prisma.module';
import { PagosModule } from './presentation/pagos/pagos.module';

@Module({
  imports: [PrismaModule, PagosModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
