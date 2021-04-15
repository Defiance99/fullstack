import { Body, Controller, Get, Request, Post, UploadedFiles, UseInterceptors, UseGuards, Query, Param, Res } from '@nestjs/common';
import { diskStorage } from 'multer';
import { FilesInterceptor } from '@nestjs/platform-express';
import { CreateProductDto } from './dto/create-product.dto';
import { ProductService } from './product.service';
import { ProductValidationPipe } from './pipes/product-validation.pipe';
import { editFileName, imageFileFilter } from 'src/utils/file-upload.utils';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { join } from 'path';

@Controller('api/product')
export class ProductController {

    constructor(private productService: ProductService) {

    }

    @Post('uploadMultipleFiles')
    @UseGuards(JwtAuthGuard)
    @UseInterceptors(FilesInterceptor('images', 6, {
        storage: diskStorage({
            destination: 'uploads/',
            filename: editFileName,
            filefilter: imageFileFilter,
        }),
    }))
    async uploadedMultipleFile(
        @Body(new ProductValidationPipe()) createProductDto: CreateProductDto, @Request() req,
        @UploadedFiles() images) {
        console.log('IMGS LENGTYH:', images.length)
        let catalogImgs: string[] = [];
        let previewImg: string;
        for (let i = 0; i < images.length; i++) {
            if (i == 0) previewImg = images[i]['path'];
            else catalogImgs.push(images[i]['path']);
        }
        await this.productService.create(catalogImgs, previewImg ,createProductDto, req.user.id);
    }

    @Get('getAll')
    async getAll() {
        return this.productService.getAll();
    }

    @Get('getProducts')
    async getProducts(@Query() query) {
        return this.productService.getProducts(query.limit);
    }

    @Get('getByFilters')
    async getByFilters(@Query() query) {
        return this.productService.findByFilters(query.category, query.day);
    }

    @Get('uploads/:imagename')
    async findImage(@Param('imagename') imagename: string, @Res() res) {
        return res.sendFile(join(process.cwd(), 'uploads/' + imagename));
    }

    @Get('getById/:id')
    async getById(@Param('id') id: string) {
        return this.productService.findById(id);
    }
}
