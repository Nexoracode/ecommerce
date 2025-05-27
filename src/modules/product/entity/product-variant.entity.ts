import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Product } from "./product.entity";
import { VariantAttributeValue } from "src/modules/variant-attribute-value/entities/variant-attribute-value.entity";

@Entity()
export class ProductVariant {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Product, product => product.variants, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'product_id' })
    product: Product;

    @Column('int')
    stock: number;

    @Column('decimal')
    price: number;

    @OneToMany(() => VariantAttributeValue, vav => vav.variant, { cascade: true })
    attributes: VariantAttributeValue[]
}