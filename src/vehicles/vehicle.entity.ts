import { Table, Column, Model, DataType, PrimaryKey, AutoIncrement } from 'sequelize-typescript';

@Table
export class Vehicle extends Model<Vehicle> {
  
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    unique: true,
  })
  id: number;

  @Column({
    type: DataType.STRING,
    unique: true,
    allowNull: false,
  })
  placa: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  chassi: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
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