import { Body, Controller, Delete, Get, Param, Post, UploadedFile, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create.dto';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiConsumes, ApiParam } from '@nestjs/swagger';
import { File } from 'buffer';
import { UploadService } from '../upload/upload.service';
import { UploadFilesDto } from '../upload/dto/upload-file.dto';

@Controller('category')
export class CategoryController {
  constructor(
    private readonly categoryService: CategoryService,
    private readonly uploadService: UploadService,
  ) { }

  @Post('upload')
  @UseInterceptors(FilesInterceptor('files', 10))
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'List of Category',
    type: UploadFilesDto
  })
  uploadImages(@UploadedFiles() files: Express.Multer.File[]) {
    return this.uploadService.uploadFile(files);
  }


  @Post()
  async createCategory(@Body() createDto: CreateCategoryDto) {
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
    return this.categoryService.remove(+id);
  }
}
