import { Inject, Injectable } from '@nestjs/common';
import {
  ActualizarPago,
  PAGO_REPOSITORY,
  type PagoRepository,
} from '../../domain/Pago/PagoRepository';

@Injectable()
export class ActualizarPagosUseCase {
  constructor(
    @Inject(PAGO_REPOSITORY)
    private readonly pagos: PagoRepository,
  ) {}

  execute(id: string, data: ActualizarPago) {
    return this.pagos.actualizar(id, data);
  }
}
