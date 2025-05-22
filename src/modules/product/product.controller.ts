import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { AttributeService } from './attribute.service';
import { AttributeValueService } from './attribute-value.service';
import { CreateProductDto } from './dto/create-product.dto';
import { ProductService } from './product.service';
import { UpdateProductDto } from './dto/update-product.dto';
import { CreateProductVariantDto } from './dto/create-product-variant.dto';
import { ProductVariantService } from './product-variant.service';
import { CreateCategoryAttributeDto } from './dto/create-category-attr.dto';
import { CategoryAttributeService } from './category-attribute.service';
import { UpdateCategoryAttributeDto } from './dto/update-category-attr.dto';
import { CreateAttributeDto } from './dto/create-attribute.dto';
import { UpdateAttributeDto } from './dto/update-attribute.dto';

@Controller('product')
export class ProductController {
    constructor(
        private readonly attributeService: AttributeService,
        private readonly avService: AttributeValueService,
        private readonly productService: ProductService,
        private readonly pvService: ProductVariantService,
        private readonly catAttrService: CategoryAttributeService
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


    // category attribute method
    @Get('category-attribute')
    async findAllCatAttr() {
        return this.catAttrService.findAllCatAttr();
    }

    @Get('category-attribute/:id')
    async findCatAttrById(@Param('id') id: number) {
        return this.catAttrService.findCatAttrById(+id);
    }

    @Post('category-attribute/add')
    async createCatAttr(@Body() createDto: CreateCategoryAttributeDto) {
        return this.catAttrService.createCatAttr(createDto);
    }

    @Patch('category-attribute/update/:id')
    async updateCatAttr(@Param('id') id: string, @Body() updateDto: UpdateCategoryAttributeDto) {
        return this.catAttrService.updateCatAttr(updateDto, +id);
    }

    // Attribute method
    @Get('attribute')
    async findAllAttribute() {
        return this.attributeService.findAllAttribute();
    }

    @Get('attribute/:id')
    async findAttributeById(@Param('id') id: string) {
        return this.attributeService.findAttributeById(+id);
    }

    @Post('attribute/add')
    async createAttribute(@Body() createDto: CreateAttributeDto) {
        return this.attributeService.createAttribute(createDto);
    }

    @Patch('attribute/update/:id')
    async updateAttribute(@Param('id') id: string, updateDto: UpdateAttributeDto) {
        return this.attributeService.updateAttribute(+id, updateDto);
    }


    //Attribute Value method
    @Get('attribute-value')
    async findAllAValue() {
        return this.avService.findAValue();
    }

    @Get('attribute-value/:id')
    async findAValueById(@Param('id') id: string) {
        return this.avService.findAValueById(+id);
    }

    @Post('attribute-value/add')
    async createAValue(@Body('value') value: string, @Body('attribute_id') atId: string) {
        return this.avService.createAValue(value, +atId);
    }

    @Patch('attribute-value/update/:id')
    async updateAValue(@Body('value') value: string, @Body('attribute_id') atId: string, @Param('id') id: string) {
        return this.avService.updateAValue(value, +atId, +id);
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
