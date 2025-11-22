import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateMaintenanceDto } from './dto/create-maintenance.dto';
import { UpdateMaintenanceDto } from './dto/update-maintenance.dto';

@Injectable()
export class MaintenanceService {
  constructor(private prisma: PrismaService) {}

  private normalizeDate(dateValue: string | Date | undefined): Date | undefined {
    if (!dateValue) return undefined;

    // Si ya es Date, la regresamos
    if (dateValue instanceof Date) return dateValue;

    // Si es string normal YYYY-MM-DD → lo convertimos a Date ISO
    return new Date(`${dateValue}T00:00:00.000Z`);// objeto date valido para prisma (automaticamente)
  }

  // logica que controla el crud de mantenimientos, validando existencia, manejo de errores y normalización de datos

  create(data: CreateMaintenanceDto) {
    const normalizedDate = this.normalizeDate(data.date);

    return this.prisma.maintenance.create({
      data: {
        ...data,
        date: normalizedDate, // Prisma recibe Date real, no string
      },
      include: { equipment: true },
    });
  }

  findAll() {
    return this.prisma.maintenance.findMany({
      include: { equipment: true },
    });
  }

  async findOne(id: number) {
    const item = await this.prisma.maintenance.findUnique({
      where: { id },
      include: { equipment: true },
    });

    if (!item) {
      throw new NotFoundException(`Maintenance con id ${id} no existe`);
    }

    return item;
  }

  async update(id: number, data: UpdateMaintenanceDto) {
    const exists = await this.prisma.maintenance.findUnique({
      where: { id },
    });

    if (!exists) {
      throw new NotFoundException(`Maintenance con id ${id} no existe`);
    }

    const normalizedDate = this.normalizeDate(data.date);

    return this.prisma.maintenance.update({
      where: { id },
      data: {
        ...data,
        date: normalizedDate ?? exists.date, // Si no mandan fecha, no se cambia
      },
      include: { equipment: true },
    });
  }

  async remove(id: number) {
    const exists = await this.prisma.maintenance.findUnique({
      where: { id },
    });

    if (!exists) {
      throw new NotFoundException(`Maintenance with id ${id} not found`);
    }

    return this.prisma.maintenance.delete({
      where: { id },
    });
  }
}
