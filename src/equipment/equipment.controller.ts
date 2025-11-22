import {
  Controller,
  Get,
  Post,
  Put,
  Patch,
  Delete,
  Param,
  Body,
  ParseIntPipe,
} from '@nestjs/common';

import { EquipmentService } from './equipment.service';
import { CreateEquipmentDto } from './dto/create-equipment.dto';
import { UpdateEquipmentDto } from './dto/update-equipment.dto';

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

  // ---------------------------------------------------------
  // GET ALL
  // ---------------------------------------------------------
  @Get()
  @ApiOperation({ summary: 'Listar todos los equipos' })
  @ApiResponse({
    status: 200,
    description: 'Lista de equipos',
  })
  findAll() {
    return this.equipmentService.getAll();
  }

  // ---------------------------------------------------------
  // GET BY ID
  // ---------------------------------------------------------
  @Get(':id')
  @ApiOperation({ summary: 'Obtener un equipo por ID' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({
    status: 200,
    description: 'Equipo encontrado',
  })
  @ApiResponse({ status: 404, description: 'Equipo no encontrado' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.equipmentService.getById(id);
  }

  // ---------------------------------------------------------
  // CREATE EQUIPMENT
  // ---------------------------------------------------------
  @Post()
  @ApiOperation({ summary: 'Crear un nuevo equipo' })
  @ApiResponse({
    status: 201,
    description: 'Equipo creado correctamente',
  })
  @ApiBody({
    description: 'Datos para crear un nuevo equipo',
    type: CreateEquipmentDto,
  })
  create(@Body() createDto: CreateEquipmentDto) {
    return this.equipmentService.create(createDto);
  }

  // ---------------------------------------------------------
  // PUT - ACTUALIZACIÓN COMPLETA
  // ---------------------------------------------------------
  @Put(':id')
  @ApiOperation({ summary: 'Actualizar completamente un equipo por ID' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({
    status: 200,
    description: 'Equipo actualizado correctamente (PUT)',
  })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateEquipmentDto: UpdateEquipmentDto,
  ) {
    return this.equipmentService.update(id, updateEquipmentDto);
  }

  // ---------------------------------------------------------
  // PATCH - ACTUALIZACIÓN PARCIAL
  // ---------------------------------------------------------
  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar parcialmente un equipo por ID' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({
    status: 200,
    description: 'Equipo actualizado parcialmente (PATCH)',
  })
  updatePartial(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateEquipmentDto: UpdateEquipmentDto,
  ) {
    return this.equipmentService.update(id, updateEquipmentDto);
  }

  // ---------------------------------------------------------
  // DELETE
  // ---------------------------------------------------------
  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar un equipo por ID' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({
    status: 200,
    description: 'Equipo eliminado correctamente',
  })
  @ApiResponse({ status: 404, description: 'Equipo no encontrado' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.equipmentService.delete(id);
  }
}
