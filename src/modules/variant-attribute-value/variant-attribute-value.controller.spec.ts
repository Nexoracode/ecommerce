import { Test, TestingModule } from '@nestjs/testing';
import { VariantAttributeValueController } from './variant-attribute-value.controller';
import { VariantAttributeValueService } from './variant-attribute-value.service';

describe('VariantAttributeValueController', () => {
  let controller: VariantAttributeValueController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [VariantAttributeValueController],
      providers: [VariantAttributeValueService],
    }).compile();

    controller = module.get<VariantAttributeValueController>(VariantAttributeValueController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
