import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { CategoryAttributeService } from './category-attribute.service';
import { CreateCategoryAttributeDto } from './dto/create-category-attribute.dto';
@Controller('category-attribute')
export class CategoryAttributeController {
  constructor(private readonly service: CategoryAttributeService) { }

  @Post()
  create(@Body() dto: CreateCategoryAttributeDto) {
    return this.service.assign(dto);
  }

  @Get(':categoryId')
  findOne(@Param('categoryId', ParseIntPipe) categoryId: number) {
    return this.service.generateAttributeForCategory(categoryId);
  }


  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.service.remove(id);
  }
}
