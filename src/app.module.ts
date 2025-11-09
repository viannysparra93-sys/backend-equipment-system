import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EquipmentModule } from './equipment/equipment.module';
import { Equipment } from './equipment/equipment.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite', // o 'mysql' si usas MySQL
      database: 'database.sqlite', // nombre del archivo de BD
      entities: [Equipment],
      synchronize: true, // crea las tablas automáticamente
    }),
    EquipmentModule,
  ],
})
export class AppModule {}
