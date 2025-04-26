import { ApiProperty } from '@nestjs/swagger';
import { ValidationError } from 'class-validator';

export class NotFoundExceptionError {
  constructor(message: string, statusCode: number) {
    this.message = message;
    this.statusCode = statusCode;
  }
  @ApiProperty({ example: 'Entity not found' })
  public message: string | ValidationError[];

  @ApiProperty({ default: 404 })
  public statusCode = 404;
}
