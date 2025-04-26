import { Table, Column, Model, DataType } from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';

@Table({
  timestamps: true, // Habilita timestamps
  updatedAt: false, // Desabilita apenas o updatedAt
})
export class Vehicle extends Model<Vehicle> {
  @ApiProperty({ description: 'ID do veículo', example: 1 })
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    unique: true,
  })
  id: number;

  @ApiProperty({ description: 'Placa do veículo', example: 'ABC1234' })
  @Column({
    type: DataType.STRING,
    unique: true,
    allowNull: false,
  })
  placa: string;

  @ApiProperty({ description: 'Chassi do veículo', example: '9BWZZZ377VT004251' })
  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  chassi: string;

  @ApiProperty({ description: 'Renavam do veículo', example: '12345678901' })
  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  renavam: string;

  @ApiProperty({ description: 'Modelo do veículo', example: 'Palio' })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  modelo: string;

  @ApiProperty({ description: 'Marca do veículo', example: 'Fiat' })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  marca: string;

  @ApiProperty({ description: 'Ano do veículo', example: 2025 })
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  ano: number;
}