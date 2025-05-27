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

    async findOneBy(id: number) {
        const category = await this.treeRepo.findOne({ where: { id } });
        if (!category) {
            throw new NotFoundException(`Category with ID ${id} not found`);
        }
        return category;
    }

    async findAllTree() {
        return this.treeRepo.findTrees();
    }

    async findByIdWithDescendants(id: number) {
        const node = await this.treeRepo.findOne({ where: { id } })
        if (!node) {
            throw new NotFoundException(`Item with ID ${id} not found`);
        }
        return await this.treeRepo.findDescendantsTree(node);
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

    async delete(id: number) {
        const node = await this.treeRepo.findOne({ where: { id } });
        if (!node) {
            throw new NotFoundException(`Item with ID ${id} not found`);
        }
        const tree = await this.treeRepo.findDescendants(node);

        const ordered = tree.sort((a, b) => (b.id || 0) - (a.id || 0));

        for (const item of ordered) {
            await this.treeRepo.delete(item.id);
        }
        return 'Category and its descendants deleted successfully';
    }
}
