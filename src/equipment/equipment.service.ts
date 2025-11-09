// src/equipment/equipment.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Equipment } from './equipment.entity';
import { CreateEquipmentDto } from './dto/create-equipment.dto';

@Injectable()
export class EquipmentService {
  constructor(
    @InjectRepository(Equipment)
    private readonly equipmentRepository: Repository<Equipment>,
  ) {}

  // Obtener todos los equipos
  async findAll(): Promise<Equipment[]> {
    return this.equipmentRepository.find();
  }

  // Obtener por id
  async findOne(id: number): Promise<Equipment> {
    const item = await this.equipmentRepository.findOneBy({ id });
    if (!item) throw new NotFoundException(`Equipment with id ${id} not found`);
    return item;
  }

// Crear nuevo equipo
 async create(createDto: CreateEquipmentDto): Promise<Equipment> {

  const entity: Equipment = this.equipmentRepository.create(createDto);

  // Se guarda en la base de datos y se espera el resultado
  const savedEntity = await this.equipmentRepository.save(entity);

  // Se retorna el objeto completo ya almacenado
  return savedEntity;
}

  // Actualizar
  async update(id: number, data: Partial<CreateEquipmentDto>): Promise<Equipment> {
    await this.equipmentRepository.update(id, data);
    return this.findOne(id);
  }

  // Eliminar
  async remove(id: number): Promise<void> {
    const result = await this.equipmentRepository.delete(id);
    if (result.affected === 0) throw new NotFoundException(`Equipment with id ${id} not found`);
  }
}
