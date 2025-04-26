import { IsNotEmpty, IsString, IsInt } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Vehicle } from '../vehicle.entity';

export class VehicleDto implements Partial<Vehicle> {
  @ApiProperty({ description: 'Placa do veículo', example: 'ABC1234' })
  @IsNotEmpty({ message: 'O campo "placa" é obrigatório.' })
  @IsString()
  placa: string;

  @ApiProperty({ description: 'Chassi do veículo', example: '9BWZZZ377VT004251' })
  @IsNotEmpty({ message: 'O campo "chassi" é obrigatório.' })
  @IsString()
  chassi: string;

  @ApiProperty({ description: 'Renavam do veículo', example: '12345678901' })
  @IsNotEmpty({ message: 'O campo "renavam" é obrigatório.' })
  @IsString()
  renavam: string;

  @ApiProperty({ description: 'Modelo do veículo', example: 'Palio' })
  @IsNotEmpty({ message: 'O campo "modelo" é obrigatório.' })
  @IsString()
  modelo: string;

  @ApiProperty({ description: 'Marca do veículo', example: 'Fiat' })
  @IsNotEmpty({ message: 'O campo "marca" é obrigatório.' })
  @IsString()
  marca: string;

  @ApiProperty({ description: 'Ano do veículo', example: 2025 })
  @IsNotEmpty({ message: 'O campo "ano" é obrigatório.' })
  @IsInt()
  ano: number;
}