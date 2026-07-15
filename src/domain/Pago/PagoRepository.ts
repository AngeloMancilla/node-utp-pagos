export type EstadoPago = 'PENDIENTE' | 'COMPLETADO' | 'FALLIDO';

export interface PagoEstudiante {
  id: string;
  monto: number;
  estado: EstadoPago;
  fecha_creacion: Date;
  estudiante: {
    id: string;
    nombre: string;
    apellido: string;
    fecha_creacion: Date;
    codigo: string;
  };
}

export interface CrearPago {
  estudianteId: string;
  monto: number;
  estado: EstadoPago;
}

export interface PagoRepository {
  listarConEstudiante(): Promise<PagoEstudiante[]>;
  crear(pago: CrearPago): Promise<PagoEstudiante>;
}

export const PAGO_REPOSITORY = Symbol('PAGO_REPOSITORY');
