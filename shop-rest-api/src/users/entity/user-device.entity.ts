import { Column, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "src/users/entity/users.entity";

@Entity()
export class Device {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: 'text'})
    ip: string

    @Column({type: 'text'})
    browser: string

    @Column({type: 'text'})
    userAgent: string

    @Column({type: 'text'})
    token: string

    @Column({type: 'bigint'})
    expiredAt: number

    @Column({type: 'bigint'})
    createdAt: number

    @ManyToOne(type => User, user => user.devices)
    user: User;
}