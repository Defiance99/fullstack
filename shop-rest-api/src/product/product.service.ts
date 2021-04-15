import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { In, Like, Repository } from "typeorm";
import { CreateProductDto } from "./dto/create-product.dto";
import { Product } from "./entity/product.entity";


@Injectable()
export class ProductService {

    constructor(
        @InjectRepository(Product)
        private productRepository: Repository<Product>
    ) {}

    async create(images: string[], previewImg: string = 'uploads\\bfdde66d388696e4d18dfb42d4d795a4-no_image.jpg', productDto: CreateProductDto, userId: number)/* : Promise<Product> */ {
        productDto['images'] = images;
        productDto['previewImage'] = previewImg;
        productDto['userId'] = userId;
        console.log(productDto)
        return await this.productRepository.save(productDto);
    }

    async getAll(): Promise<Product[]> {
        return this.productRepository.find();
    }
    
    async getProducts(limit: number): Promise<Product[]> {
        return await this.productRepository
            .createQueryBuilder('product')
            .orderBy('product.id', 'DESC')
            .limit(limit)
            .getMany()
    }

    async findByFilters(category: string, day: string) {
        return await this.productRepository
            .createQueryBuilder('product')
            .where({
                'chartDays': Like(`%${day}%`),
                'category': Like(`%${category}%`),
            })
            .select('product.id')
            .addSelect('product.name')
            .addSelect('product.price')
            .addSelect('product.currency')
            .addSelect('product.weight')
            .addSelect('product.bonuses')
            .addSelect('product.previewImage')
            .orderBy('product.id', 'DESC')
            .limit(4)
            .getMany()
    }

    async findById(id: string) {
        return await this.productRepository
            .createQueryBuilder('product')
            .where({
                'id': id
            })
            .getOne()
    }
}