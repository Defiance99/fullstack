import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReviewController } from './review.controller';
import { Review } from './entity/review.entity';
import { ReviewService } from './review.service';

@Module({
    imports: [TypeOrmModule.forFeature([Review])],
    providers: [ReviewService],
    controllers: [ReviewController]
})

export class ReviewModule {
    
}