import { AttributeValue } from "src/modules/attribute-value/entities/attribute-value.entity";
import { CategoryAttribute } from "src/modules/category-attribute/entities/category-attribute.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Attribute {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    name: string;

    @Column()
    slug: string;

    @OneToMany(() => AttributeValue, value => value.attribute)
    values: AttributeValue[]

    @ManyToOne(() => CategoryAttribute, catAttr => catAttr.attributes)
    @JoinColumn({ name: 'category_attr_id' })
    categoryAttr: CategoryAttribute;
}