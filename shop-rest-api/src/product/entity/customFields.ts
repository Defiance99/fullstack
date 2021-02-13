import { Column, Entity, } from "typeorm";

@Entity()
export class CustomField {
    
    @Column("tinytext")
    nameCustomField: string;

    @Column("tinytext")
    valueCustomField: string;
    
}