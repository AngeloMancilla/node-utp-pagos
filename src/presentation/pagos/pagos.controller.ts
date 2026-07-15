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

@Controller('api/pagos')
export class PagosController {
  constructor(
    private readonly listarPagos: ListarPagosUseCase,
    private readonly registrarPago: RegistrarPagoUseCase,
  ) {}

  @Get()
  listar() {
    return this.listarPagos.execute();
  }

  @Post()
  async crear(@Body() body: CrearPagoDto) {
    try {
      return await this.registrarPago.execute({
        estudianteId: body.estudianteId,
        monto: body.monto,
      });
    } catch {
      throw new HttpException(
        'Error al procesar el pago',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
