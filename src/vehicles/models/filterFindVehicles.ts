import { ApiProperty } from "@nestjs/swagger";
import { IsNumberString, IsOptional } from "class-validator";

export class FiltersVehicles {
    @ApiProperty({
      description: 'Year to search for vehicles produced after this year or in year',
      example: 2020,
      required: false
    })
    @IsOptional()
    // @IsNumberString({
    //   message: mensagemValidacaoTipoFabrica('numberString')
    // })
    
    producedAfterTheYear?: number;
    @ApiProperty({
      description: 'Year to search for vehicles produced before this year or in year',
      example: 2025,
      required: false
    })
    @IsOptional()
    // @IsNumberString({
    //   message: mensagemValidacaoTipoFabrica('numberString')
    // })
    producedBeforeTheYear?: number;
  }
  
  
  