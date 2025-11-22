import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsInt, IsDateString } from 'class-validator';
 
// El DTO me permite controlar qué campos se pueden registrar al crear un mantenimiento.

export class CreateMaintenanceDto {
  @ApiProperty({
    example: 'Cambio de pasta térmica y limpieza interna',
    description: 'Descripción del mantenimiento realizado',
  })
 
  // Valido tipos y valores antes de que lleguen al servicio, evitando errores
  @IsString()
  @IsNotEmpty()
  description: string; // valida string obligatorio 

  @ApiProperty({
    example: '2025-02-10',
    description: 'Fecha del mantenimiento',
  })
  @IsDateString()
  date: string;  // válida en formato ISO

  @ApiProperty({
    example: 'Juan Pérez',
    description: 'Técnico que realizó el mantenimiento',
  })
  @IsString()
  @IsNotEmpty()
  performedBy: string;  // valida string obligatorio 

  @ApiProperty({
    example: 'Completado',
    description: 'Estado del mantenimiento',
  })
  @IsString()
  @IsNotEmpty()
  status: string;  // valida string obligatorio 

  @ApiProperty({
    example: 1,
    description: 'ID del equipo al que pertenece este mantenimiento',
  })
  @IsInt()
  equipmentId: number;  // valida entero obligatorio 
}
