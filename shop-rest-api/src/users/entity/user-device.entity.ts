import { Column, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "src/users/entity/users.entity";

@Entity()
export class Device {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    ip: string

    @Column()
    browser: string

    @Column()
    userAgent: string

    @Column()
    token: string

    @Column()
    expiredAt: Date

    @Column()
    createdAt: Date

    @ManyToOne(type => User, user => user.devices)
    user: User;
}