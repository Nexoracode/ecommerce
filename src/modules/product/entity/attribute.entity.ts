import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { AttributeValue } from "./attribute-value.entity";

@Entity()
export class Attribute {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @OneToMany(() => AttributeValue, value => value.attribute)
    values: AttributeValue[]
}