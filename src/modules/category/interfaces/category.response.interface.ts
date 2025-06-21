import { Category } from "../entities/category.entity";

export interface ICategoryResponse {
    children: ICategoryResponse[];
    discount: string;
    id: number;
    image: string;
    level: number;
    parent?: number | null;
    isDelete: boolean;
    title: string;
    slug: string;
}