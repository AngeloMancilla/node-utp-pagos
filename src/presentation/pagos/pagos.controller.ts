import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ListarPagosUseCase } from '../../application/pagos/listar-pagos.use-case';
import { RegistrarPagoUseCase } from '../../application/pagos/registrar-pago.use-case';
import { CrearPagoDto } from './dto/crear-pago.dto';
import { MetricsService } from '../../infrastructure/metrics/metrics.service';
import { ActualizarPagoDto } from './dto/actualizar-pago.dto';
import { EliminarPagoUseCase } from '../../application/pagos/eliminar-pago.use-case';
import { ActualizarPagosUseCase } from '../../application/pagos/actualizar-pagos.use-case';

@Controller('api/pagos')
export class PagosController {
  constructor(
    private readonly listarPagos: ListarPagosUseCase,
    private readonly registrarPago: RegistrarPagoUseCase,
    private readonly actualizarPago: ActualizarPagosUseCase,
    private readonly eliminarPago: EliminarPagoUseCase,
    private readonly metrics: MetricsService,
  ) {}

  @Get()
  listar() {
    return this.listarPagos.execute();
  }

  @Post()
  async crear(@Body() body: CrearPagoDto) {
    try {
      this.metrics.incrementarPago('success');
      return await this.registrarPago.execute({
        estudianteId: body.estudianteId,
        monto: body.monto,
      });
    } catch {
      this.metrics.incrementarPago('error');
      throw new HttpException(
        'Error al procesar el pago',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Patch(':id')
  async actualizar(@Param('id') id: string, @Body() body: ActualizarPagoDto) {
    try {
      const pago = await this.actualizarPago.execute(id, body);
      return pago;
    } catch {
      throw new HttpException(
        'Error al actualizar el pago',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Delete(':id')
  async eliminar(@Param('id') id: string) {
    try {
      await this.eliminarPago.execute(id);
      return {
        message: 'Pago eliminado correctamente',
        data: { pagoId: id },
      };
    } catch {
      throw new HttpException(
        'Error al eliminar el pago',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
