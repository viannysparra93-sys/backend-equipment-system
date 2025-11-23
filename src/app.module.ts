import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma.module';
import { UsersModule } from './users/users.module';
import { EquipmentModule } from './equipment/equipment.module';
import { MaintenanceModule } from './maintenance/maintenance.module';
import { AuthModule } from './auth/auth.module';
import { LocationModule } from './location/location.module';


@Module({
  imports: [
    PrismaModule,
    UsersModule,
    EquipmentModule,
    MaintenanceModule,
    AuthModule, 
    LocationModule,

  ],
})
export class AppModule {}
