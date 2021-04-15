import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from 'src/product/entity/product.entity';
import { Repository } from 'typeorm';
import { ProductOrderDto } from './dto/product-order.dto';
import { OrderDetails } from './entity/order-details.entity';
import { Order } from './entity/order.entity';

@Injectable()
export class OrderService {

    constructor(
        @InjectRepository(Order) private orderRepository: Repository<Order>,
        @InjectRepository(OrderDetails) private orderDetailsRepositoty: Repository<Order>,
    ) { }

    async addToCart(product: Product, userId: number, quantity: number = 1) {
        let order = {};
        let orderDetails = {
            'products': product.id,
            'quantity': quantity,
        }
        order['ordersDetails'] = [orderDetails];
        order['user'] = userId;
        let currentOrder = await this.findCurrentOrder(userId);
        return currentOrder ? this.updateOrder(orderDetails, currentOrder) : this.createOrder(order);
    }

    async addToCartLocalItems(products: ProductOrderDto[], userId: number) {
        let currentOrder = await this.findCurrentOrder(userId);
        for (let product of products) product['orders'] = currentOrder;
        return this.orderDetailsRepositoty.save(products)
    }

    async findCurrentOrder(userId: number) {
        return this.orderRepository
            .createQueryBuilder('order')
            .leftJoin('order.user', 'user')
            .where('user.id = :id', {
                'id': userId
            })
            .where({
                'completed': false
            })
            .select('order.id')
            .getOne();
    }

    async createOrder(order) {
        return this.orderRepository.save(order);
    }

    async updateOrder(orderDetails, currentOrder) {
        orderDetails['orders'] = currentOrder;
        return this.orderDetailsRepositoty.save(orderDetails);
    }

    async updateOrderProducts(products: ProductOrderDto[], userId) {
        let currentOrder = await this.findCurrentOrder(userId);
        for (let product of products) product['orders'] = currentOrder;
        console.log(products)
        return this.orderDetailsRepositoty.save(products)
    }

    async checkout(userId: number) {
        let date = +(new Date());
        // price ?

        return this.orderRepository
            .createQueryBuilder('order')
            .leftJoin('order.user', 'user')
            .where('user.id = :id', {
                'id': userId
            })
            .where({
                'completed': false
            })
            .update(Order)
            .set({
                'completed': true,
                'finishedAt': date
            })
            .execute();
    }

    async getMyCart(userId: number) {
        let currentOrder = await this.findCurrentOrder(userId);
        
        return this.orderDetailsRepositoty
            .createQueryBuilder('orderDetails')
            .leftJoin('orderDetails.orders', 'order')
            .leftJoin('orderDetails.products', 'product')
            .where('order.id = :id', {
                'completed': false,
                'id': currentOrder.id
            })
            .select('product.id')
            .addSelect('product.name')
            .addSelect('product.price')
            .addSelect('product.currency')
            .addSelect('orderDetails.id')
            .addSelect('orderDetails.quantity')
            .getMany();
    }

    async removeProduct(orderDetailsId: number) {
        return this.orderDetailsRepositoty
            .createQueryBuilder('orderDetails')
            .delete()
            .where({
                'id': orderDetailsId
            })
            .execute();
    }

    async removeAll(userId: number) {
        let currentOrder = await this.findCurrentOrder(userId);

        return this.orderDetailsRepositoty
            .createQueryBuilder('orderDetails')
            .leftJoin('orderDetails.orders', 'order')
            .where('order.id = :id', {
                'id': currentOrder.id
            })
            .getMany()
            .then(items => {
                return this.orderDetailsRepositoty.remove(items)
            })
    }
}
