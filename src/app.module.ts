import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EquipmentModule } from './equipment/equipment.module';
import { Equipment } from './equipment/equipment.entity';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    // Configuración de la conexión a MySQL mediante TypeORM
    TypeOrmModule.forRoot({
      type: 'mysql',              // Especificamos el tipo de base de datos
      host: 'localhost',          // Servidor local (XAMPP)
      port: 3306,                 // Puerto por defecto de MySQL
      username: 'root',           // Usuario predeterminado de MySQL
      password: '',               // Vacío porque no uso contraseña
      database: 'equipment_db',   // Nombre exacto de tu base de datos
      entities: [Equipment],      // Registramos la entidad que representa la tabla
      synchronize: true,          // Crea o actualiza tablas automáticamente (solo en desarrollo)
    }),

    // Módulo que gestiona las operaciones del equipo
    EquipmentModule,
  ],

  // Controlador y servicio base de la aplicación
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
