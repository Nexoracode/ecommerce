import { ProductVariant } from "src/modules/product/entities/product-variant.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Attribute } from "../../attribute/entities/attribute.entity";
import { AttributeValue } from "../../attribute-value/entities/attribute-value.entity";

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
