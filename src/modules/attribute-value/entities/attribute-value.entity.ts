import { Attribute } from "src/modules/attribute/entities/attribute.entity";
import { BeforeInsert, BeforeUpdate, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class AttributeValue {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    value: string;

    @Column({ unique: true })
    slug: string;

    @ManyToOne(() => Attribute, attribute => attribute.values, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'attribute_id' })
    attribute: Attribute;
}