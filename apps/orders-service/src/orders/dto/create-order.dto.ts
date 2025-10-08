import {
  IsNotEmpty,
  IsNumber,
  IsArray,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

export class CustomerDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  phone: string;
}

export class ProductDto {
  @IsNumber()
  id: number;

  @IsString()
  name: string;

  @IsNumber()
  rate: number;

  @IsNumber()
  qty: number;
}

export class CreateOrderDto {
  @ValidateNested()
  @Type(() => CustomerDto)
  customer: CustomerDto;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ProductDto)
  products: ProductDto[];

  @IsNumber()
  totalAmount: number;
}
