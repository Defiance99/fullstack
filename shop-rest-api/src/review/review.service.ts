import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateReviewDto } from './dto/create-review.dto';
import { Review } from './entity/review.entity';

@Injectable()
export class ReviewService {
    constructor(
        @InjectRepository(Review)
        private readonly reviewRepository: Repository<Review>,
    ) {}

    async getAll(): Promise<Review[]> {
        return this.reviewRepository
            .createQueryBuilder('review')
            .leftJoin('review.user', 'user')
            .select('review.theme')
            .addSelect('review.message')
            .addSelect('review.rating')
            .addSelect('review.maxRating')
            .addSelect('user.userName')
            .getMany()
    }

    async create(review: CreateReviewDto, userId: number) {
        review['user'] = userId;
        return this.reviewRepository.insert(review);
    }

    async getById(userId: number): Promise<Review[]> {
        return this.reviewRepository
            .createQueryBuilder('review')
            .leftJoin('review.user', 'user')
            .where('user.id = :id', {
                'id': userId
            })
            .getMany()
    }

    async getByLimit(limit: number): Promise<Review[]> {
        return this.reviewRepository
            .createQueryBuilder('review')
            .leftJoin('review.user', 'user')
            .select('review.theme')
            .addSelect('review.message')
            .addSelect('review.rating')
            .addSelect('review.maxRating')
            .addSelect('user.userName')
            .limit(limit)
            .orderBy('review.id', 'DESC')
            .getMany()
    }
}