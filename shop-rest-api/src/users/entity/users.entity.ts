import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Device } from "src/users/entity/user-device.entity";

@Entity()
export class User {
    
    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: 'tinytext'})
    userName: string

    @Column({ unique: true})
    login: string

    @Column({type: 'tinytext'})
    password?: string

    @OneToMany(type => Device, device => device.user)
    devices: Device[]
}