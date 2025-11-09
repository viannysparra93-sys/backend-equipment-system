import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsInt, Min } from 'class-validator';

export class CreateEquipmentDto {
  @ApiProperty({ example: 'Portátil', description: 'Nombre del equipo' })
  @IsString()
  name: string;

  @ApiProperty({ example: 'HP', description: 'Marca del equipo' })
  @IsString()
  brand: string;

  @ApiProperty({ example: 'Pavilion 15', description: 'Modelo del equipo' })
  @IsString()
  model: string;

  @ApiProperty({ example: 'Computador', description: 'Tipo de equipo' })
  @IsString()
  type: string;

  @ApiProperty({ example: 'Disponible', description: 'Estado actual del equipo' })
  @IsString()
  status: string;

  @ApiProperty({ example: 5, description: 'Cantidad disponible del equipo' })
  @IsInt()
  @Min(1)
  quantity: number;
}
