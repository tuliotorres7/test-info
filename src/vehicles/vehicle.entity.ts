import { Table, Column, Model, DataType } from 'sequelize-typescript';

@Table
export class Vehicle extends Model<Vehicle> {
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  placa: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  chassi: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  renavam: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  modelo: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  marca: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  ano: number;
}