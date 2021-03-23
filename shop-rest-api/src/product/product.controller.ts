import { Body, Controller, Get, Request, HttpCode, HttpStatus, ParseIntPipe, Post, UploadedFiles, UseInterceptors, UsePipes } from '@nestjs/common';
import { diskStorage } from 'multer';
import { FilesInterceptor } from '@nestjs/platform-express';
import { CreateProductDto } from './dto/create-product.dto';
import { ProductService } from './product.service';
import { ValidationPipe } from 'src/common/validation.pipe';
import { ProductValidationPipe } from './pipes/product-validation.pipe';
import { editFileName, imageFileFilter } from 'src/utils/file-upload.utils';

@Controller('api/product')
export class ProductController {

    constructor(private productService: ProductService) {

    }

    @Post('uploadMultipleFiles')
    @UseInterceptors(FilesInterceptor('images', 6, {
        storage: diskStorage({
            destination: 'uploads/',
            fileName: editFileName,
            fileFilter: imageFileFilter,
        }),
    }))
    async uploadedMultipleFile(
        @Body(new ProductValidationPipe()) createProductDto: CreateProductDto, @Request() req,
        @UploadedFiles() images) {
        await this.productService.create(images, createProductDto);
    }

    @Post()
    //@UsePipes(new CustomValidationPipe())
    async postSmth(
        @Body('cost', ParseIntPipe)
        @Body('weight', ParseIntPipe)
        @Body(new ValidationPipe()) product: CreateProductDto
        ) {
        this.productService.createTest(product)
        console.log(product);
    }

    @Get('getAll')
    async getAll() {
        return this.productService.getAll();
    }
}
