import { Product } from 'src/product/entity/product.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, PrimaryColumn, ManyToMany, JoinTable } from 'typeorm';
import { Order } from './order.entity';

@Entity()
export class OrderDetails {

    @PrimaryGeneratedColumn()
    id: number

    @ManyToOne(type => Order, order => order.ordersDetails )
    orders: Order

    /* @ManyToMany(() => Order, order => order.ordersDetails, {cascade: true})
    @JoinTable()
    orders: Order[] */

    @ManyToOne(type => Product, product => product.orderDetails)
    products: Product

    @Column('smallint', {default: 1})
    quantity: number
}