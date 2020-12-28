import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Review {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    email: string;

    @Column()
    theme: string;

    @Column()
    comment: string;

    @Column()
    rating: number;
}