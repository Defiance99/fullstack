import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Device } from "src/users/entity/user-device.entity";
import { Product } from "src/product/entity/product.entity";
import { Review } from "src/review/entity/review.entity";
import { Order } from "src/order/entity/order.entity";

@Entity()
export class User {
    
    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: 'tinytext'})
    userName: string

    @Column({type: 'tinytext'})
    email: string

    @Column({ unique: true})
    login: string

    @Column({type: 'tinytext'})
    password?: string

    @OneToMany(type => Device, device => device.user, {cascade: true})
    devices: Device[]

    @OneToMany(type => Review, review => review.user, {cascade: true})
    reviews: Review[]

    @OneToMany(type => Order, order => order.user, {cascade: true})
    orders: Order[]
}