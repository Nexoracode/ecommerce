import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Attribute } from "../../attribute/entities/attribute.entity";
import { AttributeValue } from "../../attribute-value/entities/attribute-value.entity";
import { VariantProduct } from "src/modules/variant-product/entities/variant-product.entity";

@Entity()
export class VariantAttributeValue {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => VariantProduct, variant => variant.attributes, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'variant_id' })
    variant: VariantProduct;

    @ManyToOne(() => Attribute, { eager: true })
    @JoinColumn({ name: 'attribute_id' })
    attribute: Attribute;

    @ManyToOne(() => AttributeValue, { eager: true })
    @JoinColumn({ name: 'value_id' })
    value: AttributeValue;
}
