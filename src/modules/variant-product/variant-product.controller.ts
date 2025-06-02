import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { VariantProductService } from './variant-product.service';
import { CreateVariantProductDto } from './dto/create-variant-product.dto';
import { UpdateVariantProductDto } from './dto/update-variant-product.dto';

@Controller('variant-product')
export class VariantProductController {
  constructor(private readonly variantProductService: VariantProductService) {}

  @Post()
  create(@Body() createVariantProductDto: CreateVariantProductDto) {
    return this.variantProductService.create(createVariantProductDto);
  }

  @Get()
  findAll() {
    return this.variantProductService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.variantProductService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateVariantProductDto: UpdateVariantProductDto) {
    return this.variantProductService.update(+id, updateVariantProductDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.variantProductService.remove(+id);
  }
}
