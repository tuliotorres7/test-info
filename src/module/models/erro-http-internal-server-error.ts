import { ApiProperty } from '@nestjs/swagger';
import { ValidationError } from 'class-validator';

export class InternalServerExceptionError {
  constructor(message: string, statusCode: number) {
    this.message = message;
    this.statusCode = statusCode;
  }
  @ApiProperty({ example: 'Internal Server Error' })
  public message: string | ValidationError[];

  @ApiProperty({ default: 500 })
  public statusCode = 500;

}
