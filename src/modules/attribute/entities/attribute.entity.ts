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

    @Column({ name: 'is_public', type: 'boolean', default: false })
    isPublic: boolean;

    @OneToMany(() => AttributeValue, value => value.attribute)
    values: AttributeValue[]

    @OneToMany(() => CategoryAttribute, catAttr => catAttr.attribute)
    categoryAttributes: CategoryAttribute[];
}