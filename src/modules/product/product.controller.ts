import { BadRequestException, Body, Controller, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { ProductService } from './product.service';
import { UpdateProductDto } from './dto/update-product.dto';
import { CreateProductVariantDto } from './dto/create-product-variant.dto';
import { ProductVariantService } from './product-variant.service';

@Controller('product')
export class ProductController {
    constructor(
        private readonly productService: ProductService,
        private readonly pvService: ProductVariantService,
    ) { }
    //product method

    @Post()
    async createProduct(@Body() createDto: CreateProductDto) {
        return this.productService.createProduct(createDto);
    }

    @Get()
    async findAllProduct() {
        return this.productService.findAllProduct();
    }

    @Get(':id')
    async findProductById(@Param('id') id: string) {
        return this.productService.findProductById(+id);
    }

    @Get('by-category/:id')
    async findProductByCategoryId(@Param('id') id: string) {
        const categoryId = Number(id);
        if (isNaN(categoryId)) {
            throw new BadRequestException('invalid category ID')
        }
        return this.productService.findProductByCategoryId(+id);
    }

    @Patch(':id')
    async updateProduct(@Body() updateDto: UpdateProductDto, @Param('id') id: string) {
        return this.productService.updateProduct(updateDto, +id);
    }

    //product variant method

    @Get('dkp-:id/variant')
    async findAllPV(@Param('id', ParseIntPipe) id: number) {
        return this.pvService.findVariantByProduct(id);
    }
}
