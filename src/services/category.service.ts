import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from '../entities/category.entity';
import {
  SingleTreeCategoryNode,
  TreeCategoryCreate,
} from 'src/dto/category.dto';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ) {}

  /**
   * Creates a new category in the database.
   *
   * @param categoryData - The data for the new category.
   *
   * @throws {@link QueryFailedError} - If there is an error executing the database query.
   * @throws {@link Error} - If any other error occurs during the operation.
   *
   * @returns A promise that resolves to a {@link SingleTreeCategoryNode} representing the newly created category.
   */
  async create(
    categoryData: TreeCategoryCreate,
  ): Promise<SingleTreeCategoryNode> {
    const category = this.categoryRepository.create(categoryData);
    return this.categoryRepository.save(category);
  }

  /**
   * Retrieves all categories from the database and builds a hierarchical tree structure.
   *
   * @returns A promise that resolves to an array of {@link SingleTreeCategoryNode} representing the hierarchical tree structure.
   *          Each node in the tree includes its subcategories, if any, in the `subCategories` property.
   *
   * @throws {@link QueryFailedError} - If there is an error executing the database query.
   * @throws {@link Error} - If any other error occurs during the operation.
   */
  async findAll(): Promise<SingleTreeCategoryNode[]> {
    const categories = await this.categoryRepository.find({
      relations: ['subCategories'],
    });

    return this.buildTree(categories);
  }

  /**
   * Retrieves a single category from the database by its ID and builds a hierarchical tree structure.
   *
   * @param id - The unique identifier of the category to retrieve.
   *
   * @throws {@link NotFoundException} - If the category with the given ID is not found.
   *
   * @returns A promise that resolves to a {@link SingleTreeCategoryNode} representing the hierarchical tree structure.
   *          The returned node includes its subcategories, if any, in the `subCategories` property.
   */
  async findOne(id: string): Promise<SingleTreeCategoryNode> {
    const categories = await this.categoryRepository.find({
      where: [{ parent_id: id }, { id }],
      relations: ['subCategories'],
    });

    if (categories.length === 0) {
      throw new NotFoundException('Category not found');
    }
    return this.buildTree(categories)[0];
  }

  /**
   * Updates an existing category in the database.
   *
   * @param id - The unique identifier of the category to update.
   * @param categoryData - The updated data for the category.
   *
   * @throws {@link NotFoundException} - If the category with the given ID is not found.
   * @throws {@link QueryFailedError} - If there is an error executing the database query.
   * @throws {@link Error} - If any other error occurs during the operation.
   *
   * @returns A promise that resolves to a {@link SingleTreeCategoryNode} representing the updated category.
   *          The returned node includes its subcategories, if any, in the `subCategories` property.
   */
  async update(
    id: string,
    categoryData: Partial<TreeCategoryCreate>,
  ): Promise<SingleTreeCategoryNode> {
    const result = await this.categoryRepository.update(id, categoryData);
    const categories = await this.categoryRepository.find({
      where: [{ parent_id: id }, { id }],
      relations: ['subCategories'],
    });

    if (result.affected === 0) {
      throw new NotFoundException('Category not updated');
    }
    if (categories.length === 0) {
      throw new NotFoundException('Category not found');
    }
    return this.buildTree(categories)[0];
  }

  /**
   * Deletes a category from the database.
   *
   * @param id - The unique identifier of the category to delete.
   *
   * @throws {@link NotFoundException} - If the category with the given ID is not found.
   *
   * @returns A promise that resolves to `void` when the category is successfully deleted.
   */
  async remove(id: string): Promise<void> {
    const category = await this.categoryRepository.delete(id);
    if (category.affected === 0) {
      throw new NotFoundException('Category not found');
    }
  }

  private buildTree(
    categories: Category[],
    parentId: string | null = null,
  ): Category[] {
    return categories
      .filter((category) => category.parent_id === parentId)
      .map((category) => ({
        ...category,
        subCategories: this.buildTree(categories, category.id), // Recursively build subcategories
      }));
  }
}
