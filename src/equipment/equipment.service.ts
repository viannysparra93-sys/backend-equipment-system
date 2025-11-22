import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';


@Injectable()
export class EquipmentService {
  constructor(private prisma: PrismaService) {}

  // Obtener todos los equipos
  async getAll() {
    return this.prisma.equipment.findMany();
  }

  // Obtener un equipo por ID
  async getById(id: number) {
    return this.prisma.equipment.findUnique({
      where: { id },
    });
  }

  // Crear un equipo
  async create(data: any) {
    return this.prisma.equipment.create({
      data,
    });
  }

  // Actualizar un equipo
  async update(id: number, data: any) {
    return this.prisma.equipment.update({
      where: { id },
      data,
    });
  }

  // Eliminar un equipo
  async delete(id: number) {
    return this.prisma.equipment.delete({
      where: { id },
    });
  }
}
