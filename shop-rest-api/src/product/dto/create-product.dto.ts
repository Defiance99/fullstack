import {
    IsInt,
    Length,
    IsNotEmpty,
    IsString,
    IsArray,
    IsIn,
    Matches
  } from 'class-validator';

export class CreateProductDto {
    @IsNotEmpty()
    @IsString()
    @Length(4,55)
    name: string   
    
    @IsNotEmpty()
    @Matches(/^([1-9][0-9]*)+(.[0-9]{1,2})?$/)
    price: string
    
    @IsNotEmpty()
    @IsInt()
    weight: number
    
    @IsArray()
    bonuses: string[]

    @IsNotEmpty()
    @IsString()
    @IsIn(['RUB', 'EUR', 'USD'])
    currency: string

    @IsNotEmpty()
    @IsArray()
    @IsString({
        each: true
    })
    category: string[]
    
    @IsNotEmpty()
    @IsArray()
    @IsString({
        each: true
    })
    chartDays: string[]

    @IsString()
    description: string

    @IsArray()
    customFields: object[]
}