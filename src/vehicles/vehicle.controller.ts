import { Controller, Get, Post, Body, Param, Put, Delete, ValidationPipe, UsePipes, Query } from '@nestjs/common';
import { VehicleService } from './vehicle.service';
import { VehicleDto } from './dto/vehicle.dto';
import { Vehicle } from './vehicle.entity';
import { VehicleQueryParams } from './models/utils';

@Controller('vehicles')
export class VehicleController {
  constructor(private readonly vehiclesService: VehicleService) {}

  @Post()
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  create(@Body() vehicle: VehicleDto) {
    return this.vehiclesService.create(vehicle);
  }

  @Get()
  findAll() {
    console.log('asdasd')
    return this.vehiclesService.findAll();
  }

  @Get('find')
  async find(@Query('placa') placa?: string,
  @Query('chassi') chassi?: string,
  @Query('renavam') renavam?: string,
  @Query('modelo') modelo?: string,
  @Query('marca') marca?: string,
  @Query('ano') ano?: number) {
    const filters : VehicleQueryParams = {
      placa,
      chassi,
      renavam,
      modelo,
      marca,
      ano,
    };
    return this.vehiclesService.find(filters);
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