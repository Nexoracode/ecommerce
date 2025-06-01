import { Category } from "src/modules/category/entities/category.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Attribute } from "../../attribute/entities/attribute.entity";

@Entity()
export class AttributeGroup {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 200, unique: true })
    name: string;

    @ManyToOne(() => Category, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'category_id' })
    category: Category;

    @OneToMany(() => Attribute, attribute => attribute.group, { eager: true })
    attributes: Attribute[]
}
