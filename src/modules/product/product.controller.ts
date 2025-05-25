import { BadRequestException, Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
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
    @Get()
    async findAllProduct() {
        return this.productService.findAllProduct();
    }

    @Get(':id')
    async findProductById(@Param('id') id: string) {
        return this.productService.findProductById(+id);
    }

    @Get('category/:id')
    async findProductByCategoryId(@Param('id') id: string) {
        const categoryId = Number(id);
        if (isNaN(categoryId)) {
            throw new BadRequestException('invalid category ID')
        }
        return this.productService.findProductByCategoryId(+id);
    }

    @Post('add')
    async createProduct(@Body() createDto: CreateProductDto) {
        return this.productService.createProduct(createDto);
    }

    @Patch('update/:id')
    async updateProduct(@Body() updateDto: UpdateProductDto, @Param('id') id: string) {
        return this.productService.updateProduct(updateDto, +id);
    }

    //product variant method

    @Get('variant')
    async findAllPV() {
        return this.pvService.findAllProductVariant();
    }

    @Post('variant/add')
    async createPV(@Body() createDto: CreateProductVariantDto) {
        return this.pvService.createPV(createDto);
    }
}
