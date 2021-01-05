import {
    IsInt,
    Length,
    IsNotEmpty,
    IsString,
    IsArray
  } from 'class-validator';

export class CreateProductDto {
    @IsNotEmpty()
    @IsString()
    @Length(4,20)
    name: string   
    
    @IsNotEmpty()
    @IsInt()
    cost: number
    
    @IsNotEmpty()
    @IsInt()
    weight: number
    
    @IsArray()
    @IsString({
        each: true
    })
    bonuses: string[]

    @IsNotEmpty()
    @IsString()
    currency: string

    @IsNotEmpty()
    @IsString()
    weightUnit: string

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