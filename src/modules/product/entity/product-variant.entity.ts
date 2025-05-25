import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Product } from "./product.entity";
import { AttributeValue } from "src/modules/attribute-value/entities/attribute-value.entity";

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

    @ManyToMany(() => AttributeValue, { eager: true })
    @JoinTable({
        name: 'product_variant_attribute',
        joinColumn: {
            name: 'variant_id',
            referencedColumnName: 'id'
        },
        inverseJoinColumn: {
            name: 'attribute_value_id',
            referencedColumnName: 'id',
        }
    })
    attributeValues: AttributeValue[]
}