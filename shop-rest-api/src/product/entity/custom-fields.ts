import {Entity, PrimaryGeneratedColumn, Column} from "typeorm";

@Entity()
export class CustomFields {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    nameCustomFields: string
    
    @Column()
    valueCustomFields: string

} 