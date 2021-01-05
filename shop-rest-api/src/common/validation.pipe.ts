import { ArgumentMetadata, BadRequestException, HttpException, HttpStatus, Injectable, ParseIntPipe, PipeTransform } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';

@Injectable() 
export class CustomValidationPipe implements PipeTransform {
    async transform(value: any, {metatype}: ArgumentMetadata) {
        console.log(metatype, 'validation', value);
        if (!metatype || !this.toValidate(metatype)) {
            return value;
        }

        value.cost = +value.cost;
        if (!Number(value.cost)) {
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


    /* async transform(value: any, metaData: ArgumentMetadata) {
        const { metatype } = metaData;
        if (this.isEmpty(value)) {
            throw new HttpException('Validation failed: no payload provided', HttpStatus.BAD_REQUEST);
        }

        const object = plainToClass(metatype, value);
    
        const errors = await validate(object);

        if (errors.length > 0) {
            throw new HttpException(`Validation failed: ${this.formatErrors(errors)}`, HttpStatus.BAD_REQUEST);
        }
    }

    private isEmpty(value: any) {
        if (Object.keys(value).length < 1) {
            return true
        }
        return false
    }
    private formatErrors(errors: any[]) {
        return errors.map( error => {
            for (let key in error.constraints) {
                return error.constraints[key]
            }
        }).join(', ');
    }  */
}