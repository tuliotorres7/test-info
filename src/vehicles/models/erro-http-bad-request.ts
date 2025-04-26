import { ApiProperty } from '@nestjs/swagger';
import { ValidationError } from 'class-validator';

export class BadRequestExceptionError {
  constructor(message: string, statusCode: number) {
    this.message = message;
    this.statusCode = statusCode;
  }
  @ApiProperty({ example: 'Date invalid!' })
  public message: string | ValidationError[];

  @ApiProperty({ default: 400 })
  public statusCode = 400;

}
