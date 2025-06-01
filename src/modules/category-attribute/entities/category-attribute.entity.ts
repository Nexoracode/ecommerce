import { Attribute } from "src/modules/attributes/attribute/entities/attribute.entity";
import { Category } from "src/modules/category/entity/category.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class CategoryAttribute {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Category, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'category_id' })
    category: Category;

    @ManyToOne(() => Attribute, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'attribute_id' })
    attribute: Attribute;
} 