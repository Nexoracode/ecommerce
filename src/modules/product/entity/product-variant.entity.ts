import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Product } from "./product.entity";
import { AttributeValue } from "./attribute-value.entity";

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

    @ManyToMany(() => AttributeValue)
    @JoinTable({ name: 'atr' })
    attributeValues: AttributeValue[]
}