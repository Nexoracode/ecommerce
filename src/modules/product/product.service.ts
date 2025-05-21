import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entity/product.entity';
import { Repository } from 'typeorm';
import { CategoryService } from '../category/category.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductService {
    constructor(
        @InjectRepository(Product)
        private readonly productRepo: Repository<Product>,
        private readonly categoryService: CategoryService,
    ) { }

    async findAllProduct() {
        return await this.productRepo.find({ relations: ['category'] });
    }

    async findProductById(id: number) {
        const product = await this.productRepo.findOne({ where: { id }, relations: ['category'] })
        if (!product) throw new NotFoundException('product not found');
        return product;
    }

    async findProductByCategoryId(categoryId: number) {
        const product = await this.productRepo.find({ where: { category: { id: categoryId } }, relations: ['category'] });
        return product;
    }

    async createProduct(createDto: CreateProductDto) {
        const category = await this.categoryService.findByIdWithDescendants(createDto.categoryId);
        const product = this.productRepo.create({
            title: createDto.title,
            description: createDto.description,
            category,
        })
        return await this.productRepo.save(product);
    }

    async updateProduct(updateDto: UpdateProductDto, id: number) {
        const category = await this.categoryService.findByIdWithDescendants(updateDto.categoryId);
        const product = await this.findProductById(id);
        product.title = updateDto.title;
        product.description = updateDto.description!;
        product.category = category
        return await this.productRepo.save(product);
    }
}
