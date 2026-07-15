import { Module } from '@nestjs/common';
import { RegistrarPagoUseCase } from '../../application/pagos/registrar-pago.use-case';
import { PrismaPagoRepository } from '../../infrastructure/pagos/prisma-pago.repository';
import { PAGO_REPOSITORY } from '../../domain/Pago/PagoRepository';
import { ListarPagosUseCase } from '../../application/pagos/listar-pagos.use-case';
import { PagosController } from './pagos.controller';
import { ActualizarPagosUseCase } from '../../application/pagos/actualizar-pagos.use-case';
import { EliminarPagoUseCase } from '../../application/pagos/eliminar-pago.use-case';

@Module({
  controllers: [PagosController],
  providers: [
    ListarPagosUseCase,
    RegistrarPagoUseCase,
    ActualizarPagosUseCase,
    EliminarPagoUseCase,
    { provide: PAGO_REPOSITORY, useClass: PrismaPagoRepository },
  ],
  exports: [ListarPagosUseCase, RegistrarPagoUseCase],
})
export class PagosModule {}
