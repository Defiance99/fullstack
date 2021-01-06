import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class Product {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: 'tinytext'})
    name: string;

    @Column({type: 'mediumint'})
    cost: number;

    @Column({type: 'smallint'})
    weight: number;

    @Column('simple-array')
    bonuses: string[]

    @Column({type: 'tinytext'})
    currency: string

    @Column('simple-array')
    category: string[]

    @Column({type: 'tinytext'})
    weightUnit: string

    @Column('simple-array')
    chartDays: string[]

    @Column({type: 'text'})
    description: string

    @Column('simple-array')
    customFields: object[]

    /* @Column('simple-array')
    images: string[] */
}