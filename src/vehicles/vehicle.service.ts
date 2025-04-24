import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Vehicle } from './vehicle.entity';

@Injectable()
export class VehicleService {
  constructor(
    @InjectModel(Vehicle)
    private readonly vehicleModel: typeof Vehicle,
  ) {}

  async create(vehicle: Vehicle): Promise<Vehicle> {
    return this.vehicleModel.create(vehicle);
  }

  async findAll(): Promise<Vehicle[]> {
    return this.vehicleModel.findAll();
  }

  async findOne(id: string): Promise<Vehicle | null> {
    return this.vehicleModel.findByPk(id);
  }

  async update(id: string, vehicleUpdate: Vehicle): Promise<Vehicle | null> {
    const vehicle = await this.vehicleModel.findByPk(id);
    if (!vehicle) {
      return null;
    }
    return vehicle.update(vehicleUpdate);
  }

async remove(id: string): Promise<void> {
    const vehicle = await this.vehicleModel.findByPk(id);
    if (vehicle) {
      await vehicle.destroy();
    }
  }
}