import { Controller, Get } from '@nestjs/common';
import { EquipmentService } from './equipment.service';
import { Equipment } from './equipment.entity';

@Controller('equipment')
export class EquipmentController {
  constructor(private readonly equipmentService: EquipmentService) {}

  // Endpoint GET para obtener todos los equipos desde la base de datos
  @Get()
  async findAll(): Promise<Equipment[]> {
    return this.equipmentService.findAll();
  }
}
