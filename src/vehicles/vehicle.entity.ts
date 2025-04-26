import { Table, Column, Model, DataType } from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';

@Table({
  timestamps: true,
  updatedAt: false,
})
export class Vehicle extends Model<Vehicle> {
  @ApiProperty({ description: 'ID Vehicle', example: 1 })
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    unique: true,
  })
  id: number;

  @ApiProperty({ description: 'Vehicle license plate', example: 'ABC1234' })
  @Column({
    type: DataType.STRING,
    unique: true,
    allowNull: false,
  })
  placa: string;

  @ApiProperty({ description: 'Vehicle chassis', example: '9BWZZZ377VT004251' })
  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  chassi: string;

  @ApiProperty({ description: 'Vehicle registration number (Renavam)', example: '12345678901' })
  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  renavam: string;

  @ApiProperty({ description: 'Vehicle model', example: 'Palio' })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  modelo: string;

  @ApiProperty({ description: 'Vehicle brand', example: 'Fiat' })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  marca: string;

  @ApiProperty({ description: 'Vehicle year', example: 2025 })
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  ano: number;
}