import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Review } from './review.entity';

@Injectable()
export class ReviewService {
    constructor(
        @InjectRepository(Review)
        private readonly reviewRepository: Repository<Review>,
    ) {}

    async getAll(): Promise<Review[]> {
        return this.reviewRepository.find();
    }

    async create(review: Review) {
        return this.reviewRepository.insert(review);
    }

}