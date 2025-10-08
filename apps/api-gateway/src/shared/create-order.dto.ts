import {
  IsNotEmpty,
  IsNumber,
  IsArray,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class CustomerDto {
  @ApiProperty({ description: 'Customer name' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ description: 'Customer phone number' })
  @IsString()
  @IsNotEmpty()
  phone: string;
}

export class ProductDto {
  @ApiProperty({ description: 'Product ID' })
  @IsNumber()
  id: number;

  @ApiProperty({ description: 'Product name' })
  @IsString()
  name: string;

  @ApiProperty({ description: 'Product rate' })
  @IsNumber()
  rate: number;

  @ApiProperty({ description: 'Product quantity' })
  @IsNumber()
  qty: number;
}

export class CreateOrderDto {
  @ApiProperty({ description: 'Customer details' })
  @ValidateNested()
  @Type(() => CustomerDto)
  customer: CustomerDto;

  @ApiProperty({ description: 'List of products' })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ProductDto)
  products: ProductDto[];

  @ApiProperty({ description: 'Total amount of the order' })
  @IsNumber()
  totalAmount: number;
}
