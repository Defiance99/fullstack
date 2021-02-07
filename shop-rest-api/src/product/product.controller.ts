import { Body, Controller, Get, HttpCode, HttpStatus, ParseIntPipe, Post, UploadedFiles, UseInterceptors, UsePipes } from '@nestjs/common';
import { diskStorage } from 'multer';
import { FilesInterceptor } from '@nestjs/platform-express';
import { CreateProductDto } from './dto/create-product.dto';
import { ProductService } from './product.service';
import { CustomValidationPipe } from 'src/common/validation.pipe';
import { ProductValidationPipe } from './pipes/product-validation.pipe';

@Controller('api/product')
export class ProductController {

    constructor(private productService: ProductService) {

    }

    @Post('upload')
    @UseInterceptors(FilesInterceptor('images', 5, {
        storage: diskStorage({
            destination: 'uploads/',
            fileName: (req, file, cb) => {
                const randomName = Array(32).fill(null).map(() => (Math.round(Math.random() * 16)).toString(16)).join('');
                cb(null, `${randomName}-${file.originalname}`)
            }
        })
    }))
    async uploadedFile(
        @Body(new ProductValidationPipe()) createProductDto: CreateProductDto, 
        @UploadedFiles() images) {
        await this.productService.create(images, createProductDto);
    }

    @Post()
    //@UsePipes(new CustomValidationPipe())
    async postSmth(
        @Body('cost', ParseIntPipe)
        @Body('weight', ParseIntPipe)
        @Body(new CustomValidationPipe()) product: CreateProductDto
        ) {
        this.productService.createTest(product)
        console.log(product);
    }

    @Get('getAll')
    async getAll() {
        return this.productService.getAll();
    }
}
