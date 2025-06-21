import { CreateCategoryDto } from "../dto/create.dto";
import { Category } from "../entities/category.entity";
import { ICategoryResponse } from "./category.response.interface";

export interface ICategoryService {
    findOne(id: number): Promise<Category>;
    findAllTree(): Promise<ICategoryResponse[]>;
    remove(id: number): Promise<Record<string, string | null>>;
    findByIdWithDescendants(id: number): Promise<ICategoryResponse>;
    create(data: CreateCategoryDto): Promise<ICategoryResponse>;
}