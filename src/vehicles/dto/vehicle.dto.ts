import { IsNotEmpty, IsString, IsInt } from 'class-validator';
import { Vehicle } from '../vehicle.entity';

export class VehicleDto implements Partial<Vehicle> {

  @IsNotEmpty({ message: 'O campo "placa" é obrigatório.' })
  @IsString()
  placa: string;

  @IsNotEmpty({ message: 'O campo "chassi" é obrigatório.' })
  @IsString()
  chassi: string;

  @IsNotEmpty({ message: 'O campo "renavam" é obrigatório.' })
  @IsString()
  renavam: string;

  @IsNotEmpty({ message: 'O campo "modelo" é obrigatório.' })
  @IsString()
  modelo: string;

  @IsNotEmpty({ message: 'O campo "marca" é obrigatório.' })
  @IsString()
  marca: string;

  @IsNotEmpty({ message: 'O campo "ano" é obrigatório.' })
  @IsInt()
  ano: number;
}