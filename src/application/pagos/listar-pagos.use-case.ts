import { Inject, Injectable } from '@nestjs/common';
import {
  PAGO_REPOSITORY,
  type PagoRepository,
} from '../../domain/Pago/PagoRepository';

@Injectable()
export class ListarPagosUseCase {
  constructor(
    @Inject(PAGO_REPOSITORY)
    private readonly pagos: PagoRepository,
  ) {}

  execute() {
    return this.pagos.listarConEstudiante();
  }
}
