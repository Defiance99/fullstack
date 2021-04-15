import { ArgumentMetadata, BadRequestException, HttpException, HttpStatus, Injectable, ParseIntPipe, PipeTransform } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';

@Injectable() 
export class ProductValidationPipe implements PipeTransform {
    async transform(value: any, {metatype}: ArgumentMetadata) {
        // metatype - is a dto file
        if (!metatype || !this.toValidate(metatype)) {
            return value;
        }

        value.weight = +value.weight;
        value.bonuses = JSON.parse(value.bonuses);
        value.category = JSON.parse(value.category);
        value.chartDays = JSON.parse(value.chartDays);
        value.customFields = JSON.parse(value.customFields);
        
        if (!Number(value.weight)) {
            throw new BadRequestException('Validation Failed');
        }
        
        const object = plainToClass(metatype, value);
        const errors = await validate(object);
        
        if (errors.length > 0) {
            throw new BadRequestException(errors);
        }
        return value;
    }

    private toValidate(metatype: Function): boolean {
        const types: Function[] = [String, Boolean, Number, Array, Object];
        return !types.includes(metatype);
    }
}