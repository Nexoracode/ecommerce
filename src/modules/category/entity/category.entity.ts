import { CategoryAttribute } from "src/modules/category-attribute/entities/category-attribute.entity";
import { Product } from "src/modules/product/entity/product.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, Tree, TreeChildren, TreeLevelColumn, TreeParent, UpdateDateColumn } from "typeorm";

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
    @JoinColumn({ name: 'parent_id' })
    parent: Category | null

    @OneToMany(() => Product, product => product.category)
    products: Product[]

    @OneToMany(() => CategoryAttribute, ca => ca.category)
    categoryAttributes: CategoryAttribute[];

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date;
}