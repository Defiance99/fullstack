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

    async create(images: File[], productDto: CreateProductDto) {
        return this.productRepository.insert
    }

    async getAll(): Promise<Product[]> {
        return this.productRepository.find(); 
    }
}