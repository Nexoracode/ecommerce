import { AttributeValue } from "src/modules/attribute-value/entities/attribute-value.entity";
import { Attribute } from "src/modules/attribute/entities/attribute.entity";
import { ProductVariant } from "src/modules/product/entity/product-variant.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class VariantAttributeValue {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => ProductVariant, variant => variant.attributes, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'variant_id' })
    variant: ProductVariant;

    @ManyToOne(() => Attribute, { eager: true })
    @JoinColumn({ name: 'attribute_id' })
    attribute: Attribute;

    @ManyToOne(() => AttributeValue, { eager: true })
    @JoinColumn({ name: 'value_id' })
    value: AttributeValue;
}
