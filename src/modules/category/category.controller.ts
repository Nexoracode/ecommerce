import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateDto } from './dto/create.dto';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) { }
  @Post()
  async createCategory(@Body() createDto: CreateDto) {
    return this.categoryService.create(createDto);
  }

  @Get(':id')
  async findByIdWithDescendants(@Param('id') id: string) {
    return this.categoryService.findByIdWithDescendants(+id);
  }

  @Get()
  async findAllTree() {
    return this.categoryService.findAllTree();
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.categoryService.delete(+id);
  }
}
