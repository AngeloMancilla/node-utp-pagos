import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { ListarPagosUseCase } from '../../application/pagos/listar-pagos.use-case';
import { RegistrarPagoUseCase } from '../../application/pagos/registrar-pago.use-case';
import { CrearPagoDto } from './dto/crear-pago.dto';
import { MetricsService } from '../../infrastructure/metrics/metrics.service';
import {
  logError,
  logInfo,
} from '../../infrastructure/observability/app-logger';

@Controller('api/pagos')
export class PagosController {
  constructor(
    private readonly listarPagos: ListarPagosUseCase,
    private readonly registrarPago: RegistrarPagoUseCase,
    private readonly metrics: MetricsService,
  ) {}

  @Get()
  listar() {
    return this.listarPagos.execute();
  }

  @Post()
  async crear(@Body() body: CrearPagoDto) {
    try {
      await this.registrarPago.execute({
        estudianteId: body.estudianteId,
        monto: body.monto,
      });
      this.metrics.incrementarPago('success');
      logInfo('Pago registrado exitosamente', {
        estudianteId: body.estudianteId,
        monto: body.monto,
      });
      return {
        message: 'Pago registrado exitosamente',
      };
    } catch {
      this.metrics.incrementarPago('error');
      logError('Error al procesar el pago', {
        estudianteId: body.estudianteId,
        monto: body.monto,
      });
      throw new HttpException(
        'Error al procesar el pago',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
