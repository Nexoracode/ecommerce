import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateVariantProductDto } from './dto/create-variant-product.dto';
import { UpdateVariantProductDto } from './dto/update-variant-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { VariantProduct } from './entities/variant-product.entity';
import { Repository } from 'typeorm';
import { IVariantProductService } from './interfaces/variant-product.service.interface';
import { VariantProductMapper } from './mappers/variant-product.mapper';
import { IVariantProductGroupedResponse } from './interfaces/variant-product.response.interface';

@Injectable()
export class VariantProductService implements IVariantProductService {
  constructor(
    @InjectRepository(VariantProduct)
    private readonly varRepo: Repository<VariantProduct>
  ) { }
  findAll(): Promise<IVariantProductGroupedResponse[]> {
    throw new Error('Method not implemented.');
  }
  findOne(id: number): Promise<IVariantProductGroupedResponse> {
    throw new Error('Method not implemented.');
  }
  remove(id: number): Promise<string> {
    throw new Error('Method not implemented.');
  }
  update(id: number, data: UpdateVariantProductDto): Promise<IVariantProductGroupedResponse> {
    throw new Error('Method not implemented.');
  }

  async create(data: CreateVariantProductDto): Promise<IVariantProductGroupedResponse> {
    const variant = this.varRepo.create(data);
    await this.varRepo.save(variant);

    const loaded = await this.varRepo.findOne({
      where: { id: variant.id },
      relations: [
        'attributes',
        'attributes.attribute',
        'attributes.attribute.group',
        'attributes.value',
        'product',
      ]
    });

    if (!loaded) {
      throw new NotFoundException('Variant product not found');
    }

    return VariantProductMapper.toGroupedResponse(loaded);
  }

  // async findAll() {
  //   return `This action returns all variantProduct`;
  // }

  // async findOne(id: number) {
  //   return `This action returns a #${id} variantProduct`;
  // }

  // async update(id: number, updateVariantProductDto: UpdateVariantProductDto) {
  //   return `This action updates a #${id} variantProduct`;
  // }

  // async remove(id: number) {
  //   return `This action removes a #${id} variantProduct`;
  // }
}
