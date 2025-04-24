import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { VehicleService } from './vehicle.service';
import { VehicleDto } from './dto/vehicle.dto';
import { Vehicle } from './vehicle.entity';

@Controller('Vehicles')
export class VehicleController {
  constructor(private readonly vehiclesService: VehicleService) {}

  @Post()
  create(@Body() vehicle: Vehicle) {
    return this.vehiclesService.create(vehicle);
  }

  @Get()
  findAll() {
    return this.vehiclesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.vehiclesService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() vehicle: Vehicle) {
    return this.vehiclesService.update(id, vehicle);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.vehiclesService.remove(id);
  }
}