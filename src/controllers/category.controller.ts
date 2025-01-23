// // src/controllers/category.controller.ts
// import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
// import { CategoryService } from '../services/category.service';
// import { Category } from '../entities/category.entity';

// @Controller('categories')
// export class CategoryController {
//   constructor(private readonly categoryService: CategoryService) {}

//   @Post()
//   create(@Body() categoryData: { title: string; parent_id?: string }): Promise<Category> {
//     return this.categoryService.create(categoryData);
//   }

//   @Get()
//   findAll(): Promise<Category[]> {
//     return this.categoryService.findAll();
//   }

//   @Get(':id')
//   findOne(@Param('id') id: string) {
//     return this.categoryService.findOne(id);
//   }

//   @Put(':id')
//   update(@Param('id') id: string, @Body() categoryData: { title?: string; parent_id?: string}) {
//     return this.categoryService.update(id, categoryData);
//   }

//   @Delete(':id')
//   remove(@Param('id') id: string): Promise<void> {
//     return this.categoryService.remove(id);
//   }
// }


import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { CategoryService } from '../services/category.service';
import { SingleTreeCategoryNode, TreeCategoryCreate } from 'src/dto/category.dto';


@Controller('categories')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  create(@Body() categoryData: TreeCategoryCreate): Promise<SingleTreeCategoryNode> {
    return this.categoryService.create(categoryData);
  }

  @Get()
  findAll(): Promise<SingleTreeCategoryNode[]> {
    return this.categoryService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<SingleTreeCategoryNode> {
    return this.categoryService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() categoryData: Partial<TreeCategoryCreate>) {
    return this.categoryService.update(id, categoryData);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.categoryService.remove(id);
  }
}