import { Injectable, NotFoundException } from '@nestjs/common';
import { DataSource, TreeRepository } from 'typeorm';
import { Category } from './entity/category.entity';
import { CreateDto } from './dto/create.dto';

@Injectable()
export class CategoryService {
    private treeRepo: TreeRepository<Category>

    constructor(private dataSource: DataSource) {
        this.treeRepo = this.dataSource.getTreeRepository(Category);
    }

    async findAllTree() {
        return this.treeRepo.findTrees();
    }

    async findByIdWithDescendants(id: number) {
        const node = await this.treeRepo.findOne({ where: { id } })
        if (!node) {
            throw new NotFoundException('category not found');
        }
        return this.treeRepo.findDescendantsTree(node);
    }

    async create(createDto: CreateDto) {
        const category = new Category();
        category.name = createDto.name;
        category.slug = createDto.slug;
        if (createDto.parentId) {
            category.parent = await this.treeRepo.findOne({ where: { id: createDto.parentId } });
        }
        return this.treeRepo.save(category);
    }
}
