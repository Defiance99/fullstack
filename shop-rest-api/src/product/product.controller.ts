import { Body, Controller, Get, HttpCode, HttpStatus, Post, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { FilesInterceptor } from '@nestjs/platform-express';
import { CreateProductDto } from './dto/create-product.dto';
import { ProductService } from './product.service';

@Controller('api/product')
export class ProductController {

    constructor(private productService: ProductService) {

    }

    /* @Post()
    @HttpCode(HttpStatus.CREATED)
    create(@Body() createProductDto: CreateProductDto) {
        this.productService.create(createProductDto);
    } */

    @Post('upload')
    @UseInterceptors(FilesInterceptor('images', 5/* , {
        storage: diskStorage({
            destination: 'uploads/',
            fileName: (req, file, cb) => {
                const randomName = Array(32).fill(null).map(() => (Math.round(Math.random() * 16)).toString(16)).join('');
                cb(null, `${randomName}-${file.originalname}`)
            }
        })
    } */))
    async uploadedFile(@Body() createProductDto: CreateProductDto, @UploadedFiles() images) {
        /* this.productService.create(images, createProductDto) */
        console.log(images)
    }

    @Get()
    async getAll() {
        return this.productService.getAll();
    }
}
