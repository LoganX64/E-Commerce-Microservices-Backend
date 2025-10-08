import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateProductDto {
  @ApiProperty({ description: 'Product code' })
  @IsOptional()
  @IsString()
  code: string;

  @ApiProperty({ description: 'Product name' })
  @IsOptional()
  @IsString()
  name: string;

  @ApiProperty({ description: 'Product description' })
  @IsOptional()
  @IsString()
  description: string;

  @ApiProperty({ description: 'Product price' })
  @IsOptional()
  @IsNumber()
  price: number;

  @ApiProperty({ description: 'Product image URL', required: false })
  @IsOptional()
  @IsString()
  image: string;
}
