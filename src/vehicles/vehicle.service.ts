import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Vehicle } from './vehicle.entity';
import { VehicleDto } from './dto/vehicle.dto';
import { VehicleQueryParams } from './models/utils';
import { now, Where } from 'sequelize/types/utils';
import { Op } from 'sequelize';
import { FiltersVehicles } from './models/filterFindVehicles';

@Injectable()
export class VehicleService {
 
  constructor(
    @InjectModel(Vehicle)
    private readonly vehicleModel: typeof Vehicle,
  ) {}

  async create(vehicle: VehicleDto): Promise<Vehicle> {
    try {
      const vehicleCreated = await Vehicle.create(vehicle as Vehicle);
      return vehicleCreated;
    } catch (error) {
      console.error('Error creating vehicle:', error);
      throw new HttpException(
        'Failed to create vehicle: ' + (error instanceof Error ? error.message : 'Unknown error'),
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findAll(): Promise<Vehicle[]> {
    try {
      return await this.vehicleModel.findAll();
    } catch (error) {
      console.error('Error fetching all vehicles:', error);
      throw new HttpException(
        'Failed to fetch vehicles',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findOne(id: string): Promise<Vehicle | null> {
    try {
      const vehicle = await this.vehicleModel.findByPk(id);
      if (!vehicle) {
        throw new HttpException('Vehicle not found', HttpStatus.NOT_FOUND);
      }
      return vehicle;
    } catch (error) {
      console.error(`Error fetching vehicle with ID ${id}:`, error);
      throw new HttpException(
        'Failed to fetch vehicle',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async update(id: string, vehicleUpdate: Vehicle): Promise<Vehicle | null> {
    try {
      const vehicle = await this.vehicleModel.findByPk(id);
      if (!vehicle) {
        throw new HttpException('Vehicle not found', HttpStatus.NOT_FOUND);
      }
      return await vehicle.update(vehicleUpdate);
    } catch (error) {
      console.error(`Error updating vehicle with ID ${id}:`, error);
      throw new HttpException(
        'Failed to update vehicle',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async remove(id: string): Promise<void> {
    try {
      const vehicle = await this.vehicleModel.findByPk(id);
      if (!vehicle) {
        throw new HttpException('Vehicle not found', HttpStatus.NOT_FOUND);
      }
      await vehicle.destroy();
    } catch (error) {
      console.error(`Error deleting vehicle with ID ${id}:`, error);
      throw new HttpException(
        'Failed to delete vehicle',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async find(fields: VehicleQueryParams): Promise<Vehicle[]> {
    try {
      // Remove undefined properties
      const where = JSON.parse(JSON.stringify(fields));
      console.log('where', where);
      return await Vehicle.findAll({ where });
    } catch (error) {
      console.error('Error fetching vehicles with filters:', error);
      throw new HttpException(
        'Failed to fetch vehicles',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async list(filters: FiltersVehicles): Promise<Vehicle[]> {
    try {
      let where;
        where = {[Op.and]:{
              ano: { 
                  [Op.lte]: filters.producedBeforeTheYear ? filters.producedBeforeTheYear : Date.now(),
                  [Op.gte]: filters.producedAfterTheYear ? filters.producedAfterTheYear : 0,
                }
             }
      }
      return await Vehicle.findAll({ where });
    } catch (error) {
      console.error('Error fetching vehicles with filters:', error);
      throw new HttpException(
        'Failed to fetch vehicles',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}