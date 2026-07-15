import { Inject, Injectable } from '@nestjs/common';
import {
  PAGO_REPOSITORY,
  type PagoRepository,
} from '../../domain/Pago/PagoRepository';

@Injectable()
export class RegistrarPagoUseCase {
  constructor(
    @Inject(PAGO_REPOSITORY)
    private readonly pagos: PagoRepository,
  ) {}

  async execute(pago: { estudianteId: string; monto: number }) {
    if (pago.monto > 500) {
      await new Promise((resolve) => setTimeout(resolve, 2000));
    }

    if (Math.random() < 0.15) {
      throw new Error('Pago fallido');
    }

    return this.pagos.crear({
      estudianteId: pago.estudianteId,
      monto: pago.monto,
      estado: 'COMPLETADO',
    });
  }
}
