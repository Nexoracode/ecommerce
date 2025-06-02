import { CreateVariantProductDto } from "../dto/create-variant-product.dto";
import { UpdateVariantProductDto } from "../dto/update-variant-product.dto";
import { IVariantProductGroupedResponse, IVariantProductResponse } from "./variant-product.interface";

export interface IVariantProductService {
    create(data: CreateVariantProductDto): Promise<IVariantProductGroupedResponse>;
    findAll(): Promise<IVariantProductGroupedResponse[]>;
    findOne(id: number): Promise<IVariantProductGroupedResponse>;
    remove(id: number): Promise<string>;
    update(id: number, data: UpdateVariantProductDto): Promise<IVariantProductGroupedResponse>;
}