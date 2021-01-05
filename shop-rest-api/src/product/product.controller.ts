import { Body, Controller, Get, HttpCode, HttpStatus, Post, UploadedFiles, UseInterceptors, UsePipes } from '@nestjs/common';
import { diskStorage } from 'multer';
import { FilesInterceptor } from '@nestjs/platform-express';
import { CreateProductDto } from './dto/create-product.dto';
import { ProductService } from './product.service';
import { validate } from 'class-validator';
import { CustomValidationPipe } from 'src/common/validation.pipe';

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
    @UseInterceptors(FilesInterceptor('images', 5, {
        storage: diskStorage({
            destination: 'uploads/',
            fileName: (req, file, cb) => {
                const randomName = Array(32).fill(null).map(() => (Math.round(Math.random() * 16)).toString(16)).join('');
                cb(null, `${randomName}-${file.originalname}`)
            }
        })
    }))
    async uploadedFile(@Body() createProductDto: CreateProductDto, @UploadedFiles() images) {
        console.log(createProductDto)
        this.productService.create(images, createProductDto)
    }

    @Post()
    //@UsePipes(new CustomValidationPipe())
    async postSmth(@Body(new CustomValidationPipe()) product: CreateProductDto) {
        /* if (validate(product).then(errors => {
            console.log(errors);
            if (errors.length > 0) {
                console.log('i have errors!', errors);
            }else {
                console.log('i havent erorrs!', errors);
            }
        })) */
        this.productService.createTest(product)
        console.log(product);
    }

    @Get()
    async getAll() {
        return this.productService.getAll();
    }
}
