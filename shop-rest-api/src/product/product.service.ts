import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateProductDto } from "./dto/create-product.dto";
import { Product } from "./product.entity";


@Injectable()
export class ProductService {

    constructor(
        @InjectRepository(Product)
        private productRepository: Repository<Product>
    ) {}

    /* async create(productDto: CreateProductDto) {
        return this.productRepository.insert(productDto);
    } */

    async create(images: [], productDto: CreateProductDto) {
        productDto['images'] = images;
        console.log(images);
        console.log(productDto);

        return await this.productRepository.save(productDto);
    }

    async createTest(product: CreateProductDto) {
        console.log('i am Service');
        /* return await this.productRepository.insert(product) */
    }

    async getAll(): Promise<Product[]> {
        return this.productRepository.find(); 
    }
}