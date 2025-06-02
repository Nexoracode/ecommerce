import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Product } from "src/modules/product/entities/product.entity";
import { VariantAttributeValue } from "src/modules/attributes/variant-attribute-value/entities/variant-attribute-value.entity";
import { IVariantProduct } from "../interfaces/variant-product.interface";

@Entity('variants-product')
export class VariantProduct implements IVariantProduct {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Product, product => product.variants, { onDelete: 'CASCADE' })
    product: Product;

    @Column('decimal')
    price: number;

    @Column()
    stock: number;

    @Column()
    sku: string;

    @OneToMany(() => VariantAttributeValue, value => value.variant, { cascade: true })
    attributes: VariantAttributeValue[]
}
