import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post, Query, Request, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CreateReviewDto } from './dto/create-review.dto';
import { ReviewDto } from './dto/review.dto';
import { ReviewService } from './review.service';

@Controller('/api/review')
export class ReviewController {
    constructor(private reviewService: ReviewService) { }

    /* @Get()
    async getAll(): Promise<ReviewDto[]> {
        return this.reviewService.getAll();
    } */

    @Post('create')
    @UseGuards(JwtAuthGuard)
    @HttpCode(HttpStatus.CREATED)
    async create(@Body() createReviewDto: CreateReviewDto, @Request() req) {
        return this.reviewService.create(createReviewDto, req.user.id);
    }

    @Delete()
    remove() {

    }

    @Patch()
    update() {

    }

    @Get('getById')
    @UseGuards(JwtAuthGuard)
    async getById(@Request() req) {
        return this.reviewService.getById(req.user.id);
    }

    @Get('getAll')
    async getAll() {
        return this.reviewService.getAll();
    }

    @Get('getByLimit')
    async getByLimit(@Query() query) {
        return this.reviewService.getByLimit(query.limit);
    }

}
