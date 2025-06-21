import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { DataSource, Repository, TreeRepository } from 'typeorm';
import { Category } from './entities/category.entity';
import { CreateCategoryDto } from './dto/create.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoryMapper } from './mappers/category.mapper';
import { ICategoryResponse } from './interfaces/category.response.interface';
import { ICategoryService } from './interfaces/category.service.interface';

@Injectable()
export class CategoryService implements ICategoryService {
    private treeCatRepo: TreeRepository<Category>
    @InjectRepository(Category)
    private readonly catRepo: Repository<Category>
    constructor(private dataSource: DataSource) {
        this.treeCatRepo = this.dataSource.getTreeRepository(Category);
    }

    async findOne(id: number): Promise<Category> {
        const category = await this.treeCatRepo.findOne({ where: { id } });
        if (!category) {
            throw new NotFoundException(`Category with ID ${id} not found`);
        }
        return category;
    }

    async findAllTree(): Promise<ICategoryResponse[]> {
        const categories = await this.treeCatRepo.findTrees();
        return categories.map((category) => CategoryMapper.toResponse(category));
    }

    async findByIdWithDescendants(id: number): Promise<ICategoryResponse> {
        const node = await this.treeCatRepo.findOne({ where: { id } })
        if (!node) throw new NotFoundException(`دسته مورد نظر یافت نشد.`);
        const category = await this.treeCatRepo.findDescendantsTree(node);
        return CategoryMapper.toResponse(category);
    }

    async create(data: CreateCategoryDto) {
        let level = 0;
        let exists = await this.catRepo.findOne({ where: { title: data.title } });
        if (exists) throw new BadRequestException('نام دسته تکراری می باشد');
        if (data.parentId && data.parentId !== 0) {
            const categoryParent = await this.catRepo.findOne({ where: { id: data.parentId } });
            if (!categoryParent) throw new NotFoundException('دسته مادر یافت نشد');
            level = categoryParent.level;
        }
        const category = this.catRepo.create({
            ...data,
            parent: data.parentId === 0 ? null : { id: data.parentId },
            level: level + 1,
        });
        const saved = await this.catRepo.save(category);
        return CategoryMapper.toResponse(saved);
    }

    async remove(id: number): Promise<Record<string, string | null>> {
        const node = await this.treeCatRepo.findOne({ where: { id } })
        if (!node) throw new NotFoundException(`دسته مورد نظر یافت نشد.`);
        const category = await this.treeCatRepo.findDescendantsTree(node);
        const mapper = CategoryMapper.toResponse(category);
        if (!mapper.isDelete) throw new BadRequestException('حذف امکان پذیر نیست، دسته خالی نمی باشد.');
        const removed = await this.catRepo.delete(id);
        if (removed.affected === 0) throw new BadRequestException('حذف انجام نشد، خطایی یافت شد');
        return {
            message: 'حذف با موفقیت انجام شد',
            data: null,
        }
    }
}
