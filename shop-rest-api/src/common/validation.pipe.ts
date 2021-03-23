import { ArgumentMetadata, BadRequestException, HttpException, HttpStatus, Injectable, ParseIntPipe, PipeTransform } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';

@Injectable() 
export class ValidationPipe implements PipeTransform {
    async transform(value: any, {metatype}: ArgumentMetadata) {
        console.log(metatype, 'validation', value);
        // metatype - is a dto file
        if (!metatype || !this.toValidate(metatype)) {
            return value;
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