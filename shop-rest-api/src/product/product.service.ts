import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateProductDto } from "./dto/create-product.dto";
import { Product } from "./entity/product.entity";


@Injectable()
export class ProductService {

    constructor(
        @InjectRepository(Product)
        private productRepository: Repository<Product>
    ) {}

    async create(images: [], productDto: CreateProductDto)/* : Promise<Product> */ {
        productDto['images'] = images;
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