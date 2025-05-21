import { Product } from "src/modules/product/entity/product.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, Tree, TreeChildren, TreeParent, UpdateDateColumn } from "typeorm";

@Tree('closure-table')
@Entity('categories')
export class Category {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 100 })
    name: string;

    @Column({ unique: true })
    slug: string;

    @TreeChildren({ cascade: true })
    children: Category[]

    @TreeParent()
    parent: Category | null

    @ManyToOne(() => Product, product => product.category)
    products: Product[]

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date;
}