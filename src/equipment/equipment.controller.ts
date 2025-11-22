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
  UseGuards,
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
  ApiBearerAuth,
} from '@nestjs/swagger';

import { AuthGuard } from '@nestjs/passport';

@ApiTags('equipment')
@ApiBearerAuth() // Indica a Swagger que usa Bearer Token
@Controller('equipment')
@UseGuards(AuthGuard('jwt')) // Protege **todas** las rutas del módulo
export class EquipmentController {
  constructor(private readonly equipmentService: EquipmentService) {}

  // ---------------------------------------------------------
  // GET ALL - LISTAR TODOS LOS EQUIPOS
  // ---------------------------------------------------------
  @Get()
  @ApiOperation({ summary: 'Listar todos los equipos' })
  @ApiResponse({
    status: 200,
    description: 'Lista completa de equipos registrados',
  })
  findAll() {
    return this.equipmentService.getAll();
  }

  // ---------------------------------------------------------
  // GET BY ID - OBTENER EQUIPO POR ID
  // ---------------------------------------------------------
  @Get(':id')
  @ApiOperation({ summary: 'Obtener un equipo por su ID' })
  @ApiParam({ name: 'id', type: Number, description: 'ID del equipo' })
  @ApiResponse({
    status: 200,
    description: 'Equipo encontrado correctamente',
  })
  @ApiResponse({ status: 404, description: 'Equipo no encontrado' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.equipmentService.getById(id);
  }

  // ---------------------------------------------------------
  // CREATE EQUIPMENT - CREAR NUEVO EQUIPO
  // ---------------------------------------------------------
  @Post()
  @ApiOperation({ summary: 'Registrar un nuevo equipo' })
  @ApiResponse({
    status: 201,
    description: 'Equipo creado exitosamente',
  })
  @ApiBody({
    description: 'Datos necesarios para crear un equipo',
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
  // DELETE - ELIMINAR EQUIPO
  // ---------------------------------------------------------
  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar un equipo por su ID' })
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
