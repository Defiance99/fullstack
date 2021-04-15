import { Body, Controller, Delete, Get, Param, Post, Query, Request, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { ProductOrderDto } from './dto/product-order.dto';
import { OrderService } from './order.service';

@Controller('/api/order')
export class OrderController {

    constructor(
        private orderService: OrderService, 
    ) {}

    @Post('addToCart')
    @UseGuards(JwtAuthGuard)
    async addToCart (@Body() productDto, @Request() req) {
        return this.orderService.addToCart(productDto, req.user.id, productDto.quantity);
    }

    @Post('addToCartLocalItems')
    @UseGuards(JwtAuthGuard)
    async addToCartLocalItems(@Body() productsOrderDto: ProductOrderDto[], @Request() req) {
        return this.orderService.addToCartLocalItems(productsOrderDto, req.user.id);
    }

    @Post('updateMyOrder')
    @UseGuards(JwtAuthGuard)
    async updateMyOrder(@Body() productOrderDto: ProductOrderDto[], @Request() req) {
        return this.orderService.updateOrderProducts(productOrderDto, req.user.id)
    }

    @Get('checkout')
    @UseGuards(JwtAuthGuard)
    async checkout(@Request() req) {
        return this.orderService.checkout(req.user.id);
    }

    @Get('myCart')
    @UseGuards(JwtAuthGuard)
    async getMyCart(@Request() req) {
        return this.orderService.getMyCart(req.user.id);
    }

    @Delete('/product/:id')
    @UseGuards(JwtAuthGuard)
    async removeProduct(@Param() params) {
        console.log(params)
        return this.orderService.removeProduct(params.id)
    }

    @Delete('/products')
    @UseGuards(JwtAuthGuard)
    async removeAll(@Request() req) {
        return this.orderService.removeAll(req.user.id)
    }
}
