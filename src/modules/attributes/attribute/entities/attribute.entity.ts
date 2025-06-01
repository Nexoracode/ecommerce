import { CategoryAttribute } from "src/modules/category-attribute/entities/category-attribute.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { AttributeGroup } from "../../attribute-group/entities/attribute-group.entity";
import { AttributeValue } from "../../attribute-value/entities/attribute-value.entity";

@Entity()
export class Attribute {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({ name: 'is_public', type: 'boolean', default: false })
    isPublic: boolean;

    @ManyToOne(() => AttributeGroup, group => group.attributes, { nullable: true })
    @JoinColumn({ name: 'group_id' })
    group: AttributeGroup;

    @OneToMany(() => AttributeValue, value => value.attribute, { eager: true })
    values: AttributeValue[]

    @OneToMany(() => CategoryAttribute, catAttr => catAttr.attribute)
    categoryAttributes: CategoryAttribute[];
}