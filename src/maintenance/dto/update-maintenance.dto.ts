import { PartialType } from '@nestjs/mapped-types';
import { CreateMaintenanceDto } from './create-maintenance.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, IsDateString, IsInt } from 'class-validator';
 
// para actualizar un mantenimiento usé PartialType, así no es obligatorio reenviar todos los campos (API mas flexible)

export class UpdateMaintenanceDto extends PartialType(CreateMaintenanceDto) {

  @ApiProperty({
    example: 'Cambio de pasta térmica y limpieza interna',
    required: false,
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({
    example: '2025-02-10',
    required: false,
  })
  @IsOptional()
  @IsDateString()
  date?: string;   

  @ApiProperty({
    example: 'Juan Pérez',
    required: false,
  })
  @IsOptional()
  @IsString()
  performedBy?: string;

  @ApiProperty({
    example: 'Completado',
    required: false,
  })
  @IsOptional()
  @IsString()
  status?: string;

  @ApiProperty({
    example: 1,
    required: false,
  })
  @IsOptional()
  @IsInt()
  equipmentId?: number;
}
