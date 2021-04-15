import { Product } from 'src/product/entity/product.entity';
import { User } from 'src/users/entity/users.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { OrderDetails } from './order-details.entity';

@Entity()
export class Order {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({default: 0})
    orderPrice: number

    @Column({default: false})
    completed: boolean

    @Column({type: 'bigint', nullable: true})
    finishedAt: number

    @ManyToOne(type => User, user => user.orders)
    user: User

    @OneToMany(type => OrderDetails, ordersDetails => ordersDetails.orders, {cascade: true})
    ordersDetails: OrderDetails[]

    /* @ManyToMany(() => OrderDetails, orderDetails => orderDetails.orders)
    ordersDetails: OrderDetails[] */

   /*  @ManyToMany(() => OrderDetails, {cascade: true})
    @JoinTable()
    ordersDetails: OrderDetails[] */
}