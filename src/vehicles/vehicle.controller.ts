import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  ValidationPipe,
  UsePipes,
  Query,
  HttpStatus,
  HttpException,
  ParseIntPipe,
  InternalServerErrorException,
} from '@nestjs/common';
import { VehicleService } from './vehicle.service';
import { VehicleDto } from './dto/vehicle.dto';
import { Vehicle } from './vehicle.entity';
import { VehicleQueryParams } from '../module/models/utils';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiParam,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { FiltersVehicles } from '../module/models/filterFindVehicles';
import { BadRequestExceptionError } from '../module/models/erro-http-bad-request';
import { NotFoundExceptionError } from '../module/models/erro-http-not-found';
import { InternalServerExceptionError } from '../module/models/erro-http-internal-server-error';

@ApiTags('vehicles')
@Controller('vehicles')
export class VehicleController {
  constructor(private readonly vehiclesService: VehicleService) {}

  @ApiCreatedResponse({
    description: 'Vehicle created successfully',
    type: Vehicle,
    isArray: false,
  })
  @ApiBadRequestResponse({ type: BadRequestExceptionError })
  @ApiNotFoundResponse({ type: NotFoundExceptionError })
  @ApiInternalServerErrorResponse({ type: InternalServerExceptionError })
  @Post()
  @ApiBody({ type: VehicleDto, description: 'Dados para criar um veículo' })
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  create(@Body() vehicle: VehicleDto) {
    try {
      return this.vehiclesService.create(vehicle);
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new InternalServerErrorException('Error creating vehicle');
    }
  }

  @ApiOkResponse({
    description: 'List all vehicles sucessfully',
    type: Vehicle,
    isArray: true,
  })
  @ApiBadRequestResponse({ type: BadRequestExceptionError })
  @ApiNotFoundResponse({ type: NotFoundExceptionError })
  @ApiInternalServerErrorResponse({ type: InternalServerExceptionError })
  @Get()
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  findAll() {
    try {
      return this.vehiclesService.findAll();
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new InternalServerErrorException('Error finding all vehicles');
    }
  }

  @ApiOkResponse({
    description: 'List vehicles by year successfully',
    type: Vehicle,
    isArray: true,
  })
  @ApiBadRequestResponse({ type: BadRequestExceptionError })
  @ApiNotFoundResponse({ type: NotFoundExceptionError })
  @ApiInternalServerErrorResponse({ type: InternalServerExceptionError })
  @Get('find')
  @ApiQuery({ name: 'placa', required: false, description: 'Placa do veículo' })
  @ApiQuery({
    name: 'chassi',
    required: false,
    description: 'Chassi do veículo',
  })
  @ApiQuery({
    name: 'renavam',
    required: false,
    description: 'Renavam do veículo',
  })
  @ApiQuery({
    name: 'modelo',
    required: false,
    description: 'Modelo do veículo',
  })
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
    try {
      const filters: VehicleQueryParams = {
        placa,
        chassi,
        renavam,
        modelo,
        marca,
        ano,
      };
      return this.vehiclesService.find(filters);
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new InternalServerErrorException('Error finding vehicles');
    }
  }

  @ApiOkResponse({
    description: 'List vehicles by year successfully',
    type: Vehicle,
    isArray: true,
  })
  @ApiBadRequestResponse({ type: BadRequestExceptionError })
  @ApiNotFoundResponse({ type: NotFoundExceptionError })
  @ApiInternalServerErrorResponse({ type: InternalServerExceptionError })
  @Get('list')
  @ApiBody({
    type: FiltersVehicles,
    description: 'data for list vehicles by year',
  })
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  @ApiQuery({
    name: 'page',
    description: 'Page for returne',
    required: true,
  })
  @ApiQuery({
    name: 'limit',
    description: 'limit for returne',
    required: true,
  })
  async list(
    @Body() body: FiltersVehicles,
    @Query('page', ParseIntPipe) page: number = 1,
    @Query('limit', ParseIntPipe) limit: number = 10,
  ) {
    limit = limit ? limit : 10;
    page = page ? page : 1;
    if (!body) {
      throw new HttpException('No date given!', HttpStatus.BAD_REQUEST);
    }
    const { producedBeforeTheYear, producedAfterTheYear } = body;
    if (
      (!producedBeforeTheYear && !producedAfterTheYear) ||
      (producedBeforeTheYear &&
        producedAfterTheYear &&
        producedAfterTheYear > producedBeforeTheYear)
    ) {
      throw new HttpException('Date invalid!', HttpStatus.BAD_REQUEST);
    }
    try {
      return this.vehiclesService.list(body, page, limit);
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new InternalServerErrorException('Error listing vehicles');
    }
  }

  @ApiOkResponse({
    description: 'successfully searched for vehicle by id',
    type: Vehicle,
    isArray: false,
  })
  @ApiBadRequestResponse({ type: BadRequestExceptionError })
  @ApiNotFoundResponse({ type: NotFoundExceptionError })
  @ApiInternalServerErrorResponse({ type: InternalServerExceptionError })
  @Get(':id')
  @ApiParam({ name: 'id', description: 'ID do veículo' })
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  findOne(@Param('id') id: string) {
    try {
      return this.vehiclesService.findOne(id);
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new InternalServerErrorException('Error finding vehicle by ID');
    }
  }

  @ApiOkResponse({
    description: 'Update vehicles successfully',
  })
  @ApiBadRequestResponse({ type: BadRequestExceptionError })
  @ApiNotFoundResponse({ type: NotFoundExceptionError })
  @ApiInternalServerErrorResponse({ type: InternalServerExceptionError })
  @Put(':id')
  @ApiParam({ name: 'id', description: 'ID vehicle' })
  @ApiBody({ type: VehicleDto, description: 'Data for update vehicle' })
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  update(@Param('id') id: string, @Body() vehicle: Vehicle) {
    try {
      return this.vehiclesService.update(id, vehicle);
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new InternalServerErrorException('Error updating vehicle');
    }
  }

  @ApiOkResponse({
    description: 'vehicle deleted successfully',
  })
  @ApiBadRequestResponse({ type: BadRequestExceptionError })
  @ApiNotFoundResponse({ type: NotFoundExceptionError })
  @ApiInternalServerErrorResponse({ type: InternalServerExceptionError })
  @Delete(':id')
  @ApiParam({ name: 'id', description: 'ID vehicle' })
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  remove(@Param('id') id: string) {
    try {
      return this.vehiclesService.remove(id);
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new InternalServerErrorException('Error deleting vehicle');
    }
  }
}
