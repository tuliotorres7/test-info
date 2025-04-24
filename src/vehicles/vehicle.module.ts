import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { VehicleService } from './vehicle.service';
import { VehicleController } from './vehicle.controller';
import { Vehicle } from './vehicle.entity';

@Module({
  imports: [SequelizeModule.forFeature([Vehicle])],
  controllers: [VehicleController],
  providers: [VehicleService],
})
export class VehicleModule {}
