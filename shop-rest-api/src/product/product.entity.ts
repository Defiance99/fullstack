import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { CustomFields } from "./entity/custom-fields";

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
    bonuses: string[];

    @Column({type: 'tinytext'})
    currency: string;

    @Column('simple-array')
    category: string[];

    @Column({type: 'tinytext'})
    weightUnit: string;

    @Column('simple-array')
    chartDays: string[];

    @Column({type: 'text'})
    description: string;

    /* @ManyToMany(type => CustomFields, {cascade: true})
    @JoinTable()
    customFields: CustomFields[]; */
    @Column('simple-array')
    customFields: object[];

    @Column({type: 'json'})
    images: object[];
}