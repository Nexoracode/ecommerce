import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Attribute } from "./attribute.entity";

@Entity()
export class AttributeValue {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    value: string;

    @ManyToOne(() => Attribute, attribute => attribute.values, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'attribute_id' })
    attribute: Attribute;
}