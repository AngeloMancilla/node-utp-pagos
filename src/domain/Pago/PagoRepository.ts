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
export interface ActualizarPago {
  estado?: EstadoPago;
  monto?: number;
}

export interface PagoRepository {
  listarConEstudiante(): Promise<PagoEstudiante[]>;
  crear(pago: CrearPago): Promise<PagoEstudiante>;
  actualizar(id: string, data: ActualizarPago): Promise<PagoEstudiante>;
  eliminar(id: string): Promise<void>;
}

export const PAGO_REPOSITORY = Symbol('PAGO_REPOSITORY');
