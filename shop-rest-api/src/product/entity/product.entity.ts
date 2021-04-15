import { OrderDetails } from "src/order/entity/order-details.entity";
import { Order } from "src/order/entity/order.entity";
import { User } from "src/users/entity/users.entity";
import { Column, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { CustomField } from "./customFields";

@Entity()
export class Product {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: 'tinytext'})
    name: string;

    @Column({type: 'tinytext'})
    price: string;

    @Column({type: 'smallint'})
    weight: number;

    @Column('simple-array')
    bonuses: string[];

    @Column({type: 'tinytext'})
    currency: string;

    @Column('simple-array')
    category: string[];

    @Column('simple-array')
    chartDays: string[];

    @Column({type: 'text'})
    description: string;

    @Column({type: 'json'})
    customFields: object[];

    @Column({type: 'json', nullable: true})
    images: object[];

    @Column()
    previewImage: string;

    @Column()
    userId: number;

    @OneToMany(type => OrderDetails, orderDetails => orderDetails.products)
    orderDetails: OrderDetails
}