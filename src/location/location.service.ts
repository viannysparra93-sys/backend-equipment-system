import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateLocationDto } from './dto/create-location.dto';
import { UpdateLocationDto } from './dto/update-location.dto';

@Injectable()
export class LocationService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateLocationDto) {
    const newLocation = await this.prisma.location.create({ data });

    return {
      message: 'La ubicación fue creada correctamente',
      data: newLocation,
    };
  }

  findAll() {
    return this.prisma.location.findMany();
  }

  async findOne(id: number) {
    const location = await this.prisma.location.findUnique({
      where: { id },
    });

    if (!location) {
      throw new NotFoundException(`Location with ID ${id} not found`);
    }

    return location;
  }

  async update(id: number, data: UpdateLocationDto) {
    await this.findOne(id);

    const updatedLocation = await this.prisma.location.update({
      where: { id },
      data,
    });

    return {
      message: 'La ubicación fue actualizada correctamente',
      data: updatedLocation,
    };
  }

  async remove(id: number) {
    await this.findOne(id);

    await this.prisma.location.delete({
      where: { id },
    });

    return {
      message: 'La ubicación fue eliminada correctamente',
    };
  }
}
