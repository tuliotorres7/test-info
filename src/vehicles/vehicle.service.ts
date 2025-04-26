import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Vehicle } from './vehicle.entity';
import { VehicleDto } from './dto/vehicle.dto';
import { VehicleQueryParams } from '../module/models/utils';
import { now, Where } from 'sequelize/types/utils';
import { Op } from 'sequelize';
import { FiltersVehicles } from '../module/models/filterFindVehicles';

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
    } catch (error: any) {
      if (error.name === 'SequelizeUniqueConstraintError') {
        const uniqueError = error;
        const messages = uniqueError.errors.map(
          (err: any) => `${err.path} must be unique: ${err.value}`,
        );
        throw new HttpException(
          {
            message: 'Validation error',
            error: messages,
            statusCode: HttpStatus.BAD_REQUEST,
          },
          HttpStatus.BAD_REQUEST,
        );
      }

      throw new HttpException(
        'Failed to create vehicle',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findAll(): Promise<Vehicle[]> {
    try {
      return await this.vehicleModel.findAll();
    } catch (error) {
      throw new HttpException(
        'Failed to fetch vehicles',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findOne(id: number): Promise<Vehicle | null> {
    try {
      const vehicle = await this.vehicleModel.findByPk(id);
      if (!vehicle) {
        throw new HttpException('Vehicle not found', HttpStatus.NOT_FOUND);
      }
      return vehicle;
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(
        'Failed to fetch vehicle',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async update(id: number, vehicleUpdate: Vehicle): Promise<Vehicle | null> {
    try {
      const vehicle = await this.vehicleModel.findByPk(id);
      if (!vehicle) {
        throw new HttpException('Vehicle not found', HttpStatus.NOT_FOUND);
      }
      return await vehicle.update(vehicleUpdate);
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(
        'Failed to update vehicle',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async remove(id: number): Promise<void> {
    try {
      console.log(id,'idasdasdasda')
      const vehicle = await this.vehicleModel.findByPk(id);
      if (!vehicle) {
        console.log(  'nao existe')
        throw new HttpException('Vehicle not found', HttpStatus.NOT_FOUND);
      }
      await vehicle.destroy();
      console.log('destruiu')
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(
        'Failed to delete vehicle',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async find(fields: VehicleQueryParams): Promise<Vehicle[]> {
    try {
      const where = Object.fromEntries(
        Object.entries(fields).filter(([_, value]) => value !== undefined),
      );
      return await Vehicle.findAll({ where });
    } catch (error) {
      throw new HttpException(
        'Failed to fetch vehicles',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async list(
    filters: FiltersVehicles,
    page = 1,
    limit = 1,
  ): Promise<Vehicle[]> {
    try {
      let where;
      where = {
        [Op.and]: {
          ano: {
            [Op.lte]: filters.producedBeforeTheYear
              ? filters.producedBeforeTheYear
              : Date.now(),
            [Op.gte]: filters.producedAfterTheYear
              ? filters.producedAfterTheYear
              : 0,
          },
        },
      };
      return await Vehicle.findAll({
        where,
        limit,
        offset: limit * (Math.trunc(page) - 1),
      });
    } catch (error) {
      throw new HttpException(
        'Failed to fetch vehicles',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
