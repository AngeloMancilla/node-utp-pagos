export class ActualizarPagoDto {
  estado?: 'PENDIENTE' | 'COMPLETADO' | 'FALLIDO';
  monto?: number;
}
