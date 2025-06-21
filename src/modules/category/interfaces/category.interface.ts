import { Product } from "src/modules/product/entities/product.entity";
import { Category } from "../entities/category.entity";
import { CategoryAttribute } from "src/modules/category-attribute/entities/category-attribute.entity";

export interface ICategory {
    id: number;
    title: string;
    slug: string;
    parent: Category | null;
    products: Product[];
    categoryAttributes: CategoryAttribute[];
    level: number;
    image: string;
    discount: string;
    createdAt: Date;
    updatedAt: Date;
}