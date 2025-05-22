import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Attribute } from "./attribute.entity";

@Entity()
export class CategoryAttribute {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    name: string;

    @Column({ unique: true })
    slug: string;

    @OneToMany(() => Attribute, attribute => attribute.categoryAttr)
    attributes: Attribute[]
}