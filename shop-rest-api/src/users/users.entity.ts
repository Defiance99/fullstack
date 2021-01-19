import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class User {
    
    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: 'tinytext'})
    userName: string

    @Column({ unique: true})
    login: string

    @Column({type: 'tinytext'})
    password: string
}