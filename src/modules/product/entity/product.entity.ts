import { Category } from "src/modules/category/entity/category.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Attribute } from "./attribute.entity";
import { ProductVariant } from "./product-variant.entity";

@Entity()
export class Product {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column({ type: 'text' })
    description: string;

    @Column({ type: 'decimal' })
    price: number;

    @ManyToOne(() => Category, category => category.products)
    category: Category;

    @OneToMany(() => ProductVariant, variant => variant.product, { cascade: true })
    variants: ProductVariant[];

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date;

}