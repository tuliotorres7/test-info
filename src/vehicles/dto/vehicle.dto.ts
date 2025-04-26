import { IsNotEmpty, IsString, IsInt, Min, Max } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Vehicle } from '../vehicle.entity';
import { IsLicensePlate } from '../../validators/license-plate.validator';

export class VehicleDto implements Partial<Vehicle> {
  @ApiProperty({ description: 'Vehicle license plate', example: 'ABC-1234 (BR) or ABC1A23 (mercosul)' })
  @IsNotEmpty({ message: 'The placa field is required.' })
  @IsString()
  @IsLicensePlate({ message: 'The "license plate" must be in the format "ABC-1234" or "ABC1A23".' })
  placa: string;

  @ApiProperty({ description: 'Vehicle chassis', example: '9BWZZZ377VT004251' })
  @IsNotEmpty({ message: 'The "chassis" field is required.' })
  @IsString()
  chassi: string;

  @ApiProperty({ description: 'Vehicle registration number (Renavam)', example: '12345678901' })
  @IsNotEmpty({ message: 'The "registration number" field is required.' })
  @IsString()
  renavam: string;

  @ApiProperty({ description: 'Vehicle model', example: 'Palio' })
  @IsNotEmpty({ message: 'The "model" field is required.' })
  @IsString()
  modelo: string;

  @ApiProperty({ description: 'Vehicle brand', example: 'Fiat' })
  @IsNotEmpty({ message: 'The "brand" field is required.' })
  @IsString()
  marca: string;

  @ApiProperty({ description: 'Vehicle year', example: 2025 })
  @IsNotEmpty({ message: 'The "year" field is required.' })
  @IsInt()
  @Min(1900)
  @Max(new Date().getFullYear())
  ano: number;
}