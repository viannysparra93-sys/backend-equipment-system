import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional } from 'class-validator';

export class CreateEquipmentDto {
  @ApiProperty({ example: 'Portátil', description: 'Nombre del equipo' })
  @IsString()
  name: string;

  @ApiProperty({ example: 'ABC12345', description: 'Número serial único' })
  @IsString()
  serial: string;

  @ApiProperty({ example: 'HP', description: 'Marca del equipo', required: false })
  @IsOptional()
  @IsString()
  brand?: string;

  @ApiProperty({ example: 'Pavilion 15', description: 'Modelo del equipo', required: false })
  @IsOptional()
  @IsString()
  model?: string;

  @ApiProperty({ example: 'Computador portátil para oficina', description: 'Descripción del equipo', required: false })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({
    example: 'OPERATIVO',
    description: 'Estado del equipo',
    default: 'OPERATIVO',
    required: false,
  })
  @IsOptional()
  @IsString()
  state?: string;

  @ApiProperty({
    example: 'active',
    description: 'Estatus del equipo',
    default: 'active',
    required: false,
  })
  @IsOptional()
  @IsString()
  status?: string;
}
