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
        /* const product = new Product();
        product.name = productDto.name;
        product.cost = productDto.cost;
        product.weight = productDto.weight;
        product.chartDays = productDto.chartDays;
        product.weightUnit = productDto.weightUnit;
        product.bonuses = productDto.bonuses;
        product.category = productDto.category;
        product.currency = productDto.currency;
        product.description = productDto.description;
        product.customFields = productDto.customFields;
        product.images = images;
        console.log(product) */
        //productDto['images'] = images;
        console.log(productDto)

        return await this.productRepository.insert(productDto)
    }

    async createTest(product: CreateProductDto) {
        return await this.productRepository.insert(product)
    }

    async getAll(): Promise<Product[]> {
        return this.productRepository.find(); 
    }
}