import { Inject, Injectable } from '@nestjs/common';
import {
  PAGO_REPOSITORY,
  type PagoRepository,
} from '../../domain/Pago/PagoRepository';

@Injectable()
export class EliminarPagoUseCase {
  constructor(
    @Inject(PAGO_REPOSITORY)
    private readonly pagos: PagoRepository,
  ) {}

  execute(id: string) {
    return this.pagos.eliminar(id);
  }
}
