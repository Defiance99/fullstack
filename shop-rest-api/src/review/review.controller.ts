import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post } from '@nestjs/common';
import { CreateReviewDto } from './dto/create-review.dto';
import { ReviewDto } from './dto/review.dto';
import { ReviewService } from './review.service';

@Controller('reviews')
export class ReviewController {
    constructor (private reviewService: ReviewService) {}

    @Get()
    async getAll(): Promise<ReviewDto[]> {
        return this.reviewService.getAll();
    }

    //dto - data transfared object

    @Post()
    @HttpCode(HttpStatus.CREATED)
    async create(@Body() createReviewDto: CreateReviewDto) {  // body - мы хотим получить некоторые параметры из тела запроса
        this.reviewService.create(createReviewDto);
    }

    @Delete() 
    remove() {
        
    }

    @Patch() 
    update() {

    }

}
