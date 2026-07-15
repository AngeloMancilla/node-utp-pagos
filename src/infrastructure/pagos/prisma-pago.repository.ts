import { Injectable } from '@nestjs/common';
import {
  ActualizarPago,
  CrearPago,
  EstadoPago,
  PagoEstudiante,
  PagoRepository,
} from '../../domain/Pago/PagoRepository';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class PrismaPagoRepository implements PagoRepository {
  constructor(private readonly prisma: PrismaService) {}

  async listarConEstudiante(): Promise<PagoEstudiante[]> {
    const rows = await this.prisma.pago.findMany({
      include: {
        estudiante: true,
      },
      orderBy: {
        fecha_creacion: 'desc',
      },
    });

    return rows.map((p) => this.toDomain(p));
  }

  async crear(pago: CrearPago): Promise<PagoEstudiante> {
    const row = await this.prisma.pago.create({
      data: {
        monto: pago.monto,
        estado: pago.estado,
        estudiante_id: pago.estudianteId,
      },
      include: {
        estudiante: true,
      },
    });

    return this.toDomain(row);
  }

  async actualizar(id: string, data: ActualizarPago): Promise<PagoEstudiante> {
    const row = await this.prisma.pago.update({
      where: { id },
      data: {
        ...(data.estado !== undefined && { estado: data.estado }),
        ...(data.monto !== undefined && { monto: data.monto }),
      },
      include: {
        estudiante: true,
      },
    });

    return this.toDomain(row);
  }

  async eliminar(id: string): Promise<void> {
    await this.prisma.pago.delete({
      where: { id },
    });
  }

  private toDomain(p: {
    id: string;
    monto: { toNumber(): number } | number;
    estado: string;
    fecha_creacion: Date;
    estudiante: {
      id: string;
      nombre: string;
      apellido: string;
      fecha_creacion: Date;
      codigo: string;
    };
  }): PagoEstudiante {
    return {
      id: p.id,
      monto: typeof p.monto === 'number' ? p.monto : p.monto.toNumber(),
      estado: p.estado as EstadoPago,
      fecha_creacion: p.fecha_creacion,
      estudiante: {
        id: p.estudiante.id,
        nombre: p.estudiante.nombre,
        apellido: p.estudiante.apellido,
        fecha_creacion: p.estudiante.fecha_creacion,
        codigo: p.estudiante.codigo,
      },
    };
  }
}
