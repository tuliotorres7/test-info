import { IsNotEmpty, IsString, IsInt } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Vehicle } from '../vehicle.entity';

export class VehicleDto implements Partial<Vehicle> {
  @ApiProperty({ description: 'Vehicle license plate', example: 'ABC1234' })
  @IsNotEmpty({ message: 'The placa field is required.' })
  @IsString()
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
  ano: number;
}