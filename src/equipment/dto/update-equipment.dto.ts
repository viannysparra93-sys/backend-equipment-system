import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional } from 'class-validator';

export class UpdateEquipmentDto {
  @ApiProperty({
    example: 'Portátil Gamer',
    description: 'Nombre del equipo',
    required: false,
  })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiProperty({
    example: 'ABC12345',
    description: 'Serial del equipo',
    required: false,
  })
  @IsOptional()
  @IsString()
  serial?: string;

  @ApiProperty({
    example: 'Lenovo',
    description: 'Marca del equipo',
    required: false,
  })
  @IsOptional()
  @IsString()
  brand?: string;

  @ApiProperty({
    example: 'Legion 5',
    description: 'Modelo del equipo',
    required: false,
  })
  @IsOptional()
  @IsString()
  model?: string;

  @ApiProperty({
    example: 'Laptop para diseño gráfico',
    description: 'Descripción del equipo',
    required: false,
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({
    example: 'OPERATIVO',
    description: 'Estado del equipo',
    required: false,
  })
  @IsOptional()
  @IsString()
  state?: string;

  @ApiProperty({
    example: 'active',
    description: 'Estado del registro',
    required: false,
  })
  @IsOptional()
  @IsString()
  status?: string;
}
