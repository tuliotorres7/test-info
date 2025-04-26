import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, ValidationError } from 'class-validator';

export class BadRequestExceptionError {
  constructor(message: string, statusCode: number, error: string) {
    this.message = message;
    this.statusCode = statusCode;
    this.error = error;
  }
  @ApiProperty({ example: 'property name should not exist!', isArray: true })
  public message: string | ValidationError[];

  @ApiProperty({ example: 'Date invalid!' })
  @IsOptional()
  public error: string;

  @ApiProperty({ default: 400 })
  public statusCode = 400;
}
