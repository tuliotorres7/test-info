import { Controller, Get, Post, Body, Param, Put, Delete, ValidationPipe, UsePipes, Query, HttpStatus, HttpException } from '@nestjs/common';
import { VehicleService } from './vehicle.service';
import { VehicleDto } from './dto/vehicle.dto';
import { Vehicle } from './vehicle.entity';
import { VehicleQueryParams } from './models/utils';
import { ApiBadRequestResponse, ApiBody, ApiNotFoundResponse, ApiOkResponse, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';
import { FiltersVehicles } from './models/filterFindVehicles';
import { BadRequestExceptionError } from './models/erro-http-bad-request';
import { NotFoundExceptionError } from './models/erro-http-not-found';

@ApiTags('vehicles') // Adiciona uma tag para agrupar os endpoints no Swagger
@Controller('vehicles')
export class VehicleController {
  constructor(private readonly vehiclesService: VehicleService) {}

  @ApiOkResponse({
    description: 'List vehicles by year successfully',
    isArray: true
  })
  @ApiBadRequestResponse({ type: BadRequestExceptionError })
  @ApiNotFoundResponse({ type: NotFoundExceptionError })
  @Post()
  @ApiBody({ type: VehicleDto, description: 'Dados para criar um veículo' })
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  create(@Body() vehicle: VehicleDto) {
    try{
    return this.vehiclesService.create(vehicle);
    }catch (error) {
      console.error('Error creating vehicle:', error);
      throw new Error('Error creating vehicle'); // Re-throw the error to be handled by NestJS
    }
  }
  
  @ApiOkResponse({
    description: 'List all vehicles sucessfully',
    type: Vehicle,
    isArray: true
  })
  @ApiBadRequestResponse({ type: BadRequestExceptionError })
  @ApiNotFoundResponse({ type: NotFoundExceptionError })
  @Get()
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  findAll() {
    try{
      return this.vehiclesService.findAll();
    }catch (error) {
      throw new Error; 
    }
  }

  
  @ApiOkResponse({
    description: 'List vehicles by year successfully',
    type: Vehicle,
    isArray: true
  })
  @ApiBadRequestResponse({ type: BadRequestExceptionError })
  @ApiNotFoundResponse({ type: NotFoundExceptionError })
  @Get('find')
  @ApiQuery({ name: 'placa', required: false, description: 'Placa do veículo' })
  @ApiQuery({ name: 'chassi', required: false, description: 'Chassi do veículo' })
  @ApiQuery({ name: 'renavam', required: false, description: 'Renavam do veículo' })
  @ApiQuery({ name: 'modelo', required: false, description: 'Modelo do veículo' })
  @ApiQuery({ name: 'marca', required: false, description: 'Marca do veículo' })
  @ApiQuery({ name: 'ano', required: false, description: 'Ano do veículo' })
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  async find(
    @Query('placa') placa?: string,
    @Query('chassi') chassi?: string,
    @Query('renavam') renavam?: string,
    @Query('modelo') modelo?: string,
    @Query('marca') marca?: string,
    @Query('ano') ano?: number,
  ) {
    try{
    const filters: VehicleQueryParams = { placa, chassi, renavam, modelo, marca, ano };
    return this.vehiclesService.find(filters);
  }catch (error) {
      console.log('Error finding vehicles:', error);
      throw new Error;
  }
  }


  @ApiOkResponse({
    description: 'List vehicles by year successfully',
    type: Vehicle,
    isArray: true
  })
  @ApiBadRequestResponse({ type: BadRequestExceptionError })
  @ApiNotFoundResponse({ type: NotFoundExceptionError })
  @Get('list')
  @ApiBody({ type: FiltersVehicles, description: 'data for list vehicles by year' })
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  async list(
    @Body() body: FiltersVehicles,
  ) {
    const {producedBeforeTheYear,producedAfterTheYear} = body;
    if((!producedBeforeTheYear && !producedAfterTheYear)||(producedBeforeTheYear && producedAfterTheYear && producedAfterTheYear > producedBeforeTheYear )){
      throw new HttpException(
        'Date invalid!',
        HttpStatus.BAD_REQUEST,
      );
    }
    try{
    return this.vehiclesService.list(body);
  }catch (error) {
      console.log('Error finding vehicles:', error);
      throw new Error;
  }
  }

  
  @ApiOkResponse({
    description: 'successfully searched for vehicle by id',
    type: Vehicle,
    isArray: false
  })
  @ApiBadRequestResponse({ type: BadRequestExceptionError })
  @ApiNotFoundResponse({ type: NotFoundExceptionError })
  @Get(':id')
  @ApiParam({ name: 'id', description: 'ID do veículo' })
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  findOne(@Param('id') id: string) {
    try{
    return this.vehiclesService.findOne(id);
    }catch (error) {
      throw new Error; 
    } 
  }

  @ApiOkResponse({
    description: 'Update vehicles successfully',
  })
  @ApiBadRequestResponse({ type: BadRequestExceptionError })
  @ApiNotFoundResponse({ type: NotFoundExceptionError })
  @Put(':id')
  @ApiParam({ name: 'id', description: 'ID vehicle' })
  @ApiBody({ type: VehicleDto, description: 'Data for update vehicle' })
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  update(@Param('id') id: string, @Body() vehicle: Vehicle) {
    try{
      return this.vehiclesService.update(id, vehicle);
    }catch (error) {
      throw new Error; // Re-throw the error to be handled by NestJS
    }
  }

  @ApiOkResponse({
    description: 'vehicle deleted successfully',
  })
  @ApiBadRequestResponse({ type: BadRequestExceptionError })
  @ApiNotFoundResponse({ type: NotFoundExceptionError })
  @Delete(':id')
  @ApiParam({ name: 'id', description: 'ID vehicle' })
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  remove(@Param('id') id: string) {
    try{
      return this.vehiclesService.remove(id);
      
    }catch (error) {
      throw new Error; // Re-throw the error to be handled by NestJS
    }
  }

}