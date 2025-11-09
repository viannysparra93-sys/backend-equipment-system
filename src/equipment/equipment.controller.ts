import { 
  Controller, Get, Post, Put, Delete, Param, Body, ParseIntPipe 
} from '@nestjs/common';
import { EquipmentService } from './equipment.service';
import { CreateEquipmentDto } from './dto/create-equipment.dto';
import { Equipment } from './equipment.entity';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
} from '@nestjs/swagger';

@ApiTags('equipment')
@Controller('equipment')
export class EquipmentController {
  constructor(private readonly equipmentService: EquipmentService) {}

  @Get()
  @ApiOperation({ summary: 'Listar todos los equipos' })
  @ApiResponse({
    status: 200,
    description: 'Lista de equipos',
    type: [Equipment],
  })
  findAll(): Promise<Equipment[]> {
    return this.equipmentService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un equipo por ID' })
  @ApiParam({ name: 'id', type: Number, description: 'ID del equipo' })
  @ApiResponse({
    status: 200,
    description: 'Equipo encontrado',
    type: Equipment,
  })
  @ApiResponse({ status: 404, description: 'Equipo no encontrado' })
  findOne(@Param('id', ParseIntPipe) id: number): Promise<Equipment> {
    return this.equipmentService.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: 'Crear un nuevo equipo' })
  @ApiResponse({
    status: 201,
    description: 'Equipo creado correctamente',
    type: Equipment,
  })
  @ApiBody({
    description: 'Datos para crear un nuevo equipo',
    type: CreateEquipmentDto,
  })
  create(@Body() createDto: CreateEquipmentDto): Promise<Equipment> {
    return this.equipmentService.create(createDto);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Actualizar un equipo por ID' })
  @ApiParam({ name: 'id', type: Number, description: 'ID del equipo a actualizar' })
  @ApiResponse({
    status: 200,
    description: 'Equipo actualizado correctamente',
    type: Equipment,
  })
  @ApiResponse({ status: 404, description: 'Equipo no encontrado' })
  @ApiBody({
    description: 'Datos a actualizar del equipo',
    schema: {
      example: {
        name: 'Portátil Lenovo',
        brand: 'Lenovo',
        model: 'ThinkPad E15',
        type: 'Computador',
        status: 'En mantenimiento',
        quantity: 3,
      },
    },
  })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateDto: Partial<CreateEquipmentDto>,
  ): Promise<Equipment> {
    return this.equipmentService.update(id, updateDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar un equipo por ID' })
  @ApiParam({ name: 'id', type: Number, description: 'ID del equipo a eliminar' })
  @ApiResponse({ status: 200, description: 'Equipo eliminado correctamente' })
  @ApiResponse({ status: 404, description: 'Equipo no encontrado' })
  remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.equipmentService.remove(id);
  }
}