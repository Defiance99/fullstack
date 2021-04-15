import { User } from 'src/users/entity/users.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

@Entity()
export class Review {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    theme: string

    @Column()
    message: string

    @Column()
    rating: number

    @Column({default: 5})
    maxRating: number

    @ManyToOne(type => User, user => user.reviews)
    user: User
}