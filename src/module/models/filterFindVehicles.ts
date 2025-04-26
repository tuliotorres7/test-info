import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsNumberString, IsOptional } from 'class-validator';
import { messageValidationTypeFactory } from '../../validators/validation-message';

export class FiltersVehicles {
  @ApiProperty({
    description:
      'Year to search for vehicles produced after this year or in year',
    example: 2020,
    required: false,
  })
  @IsOptional()
  @IsNumber()
  producedAfterTheYear?: number;

  @ApiProperty({
    description:
      'Year to search for vehicles produced before this year or in year',
    example: 2025,
    required: false,
  })
  @IsOptional()
  @IsNumber()
  producedBeforeTheYear?: number;
}
