import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { AttributeService } from './attribute.service';
import { AttributeValueService } from './attribute-value.service';
import { CreateProductDto } from './dto/create-product.dto';
import { ProductService } from './product.service';
import { UpdateProductDto } from './dto/update-product.dto';
import { CreateProductVariantDto } from './dto/create-product-variant.dto';
import { ProductVariantService } from './product-variant.service';

@Controller('product')
export class ProductController {
    constructor(
        private readonly attributeService: AttributeService,
        private readonly avService: AttributeValueService,
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
    async createAttribute(@Body('name') name: string) {
        return this.attributeService.createAttribute(name);
    }

    @Patch('attribute/update/:id')
    async updateAttribute(@Body('name') name: string, @Param('id') id: string) {
        return this.attributeService.updateAttribute(+id, name);
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
