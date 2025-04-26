import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Vehicle } from './vehicle.entity';
import { VehicleDto } from './dto/vehicle.dto';
import { VehicleQueryParams } from './models/utils';

@Injectable()
export class VehicleService {
  constructor(
    @InjectModel(Vehicle)
    private readonly vehicleModel: typeof Vehicle,
  ) {}

  async create(vehicle: VehicleDto): Promise<Vehicle> {
    const vehicleCreated = await Vehicle.create(vehicle as Vehicle);
    return vehicleCreated;
  }

  async findAll(): Promise<Vehicle[]> {
    return this.vehicleModel.findAll();
  }

  async findOne(id: string): Promise<Vehicle | null> {
    return this.vehicleModel.findByPk(id);
  }

  async update(id: string, vehicleUpdate: Vehicle): Promise<Vehicle | null> {
    const vehicle = await this.vehicleModel.findByPk(id);
    console.log('vehicle1111111', vehicle);
    if (!vehicle) {
      return null;
    }
    return vehicle.update(vehicleUpdate);
  }

async remove(id: string): Promise<void> {
    const vehicle = await this.vehicleModel.findByPk(id);
    if (vehicle) {
      //await Vehicle.destroy({ where: { id: vehicle.id } });
      await vehicle.destroy();
    }
  }

  async find(fields: VehicleQueryParams): Promise<Vehicle[]> {
    // Remove undefined properties
    const where = JSON.parse(JSON.stringify(fields));
    console.log('where', where);
    return Vehicle.findAll({ where });
  }
}