import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CategoryService } from './category.service';
import { Category } from '../entities/category.entity';
import { NotFoundException } from '@nestjs/common';

describe('CategoryService', () => {
  let service: CategoryService;
  let repository: Repository<Category>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CategoryService,
        {
          provide: getRepositoryToken(Category),
          useValue: {
            create: jest.fn(),
            save: jest.fn(),
            update: jest.fn(),
            find: jest.fn(),
            findOne: jest.fn(),
            delete: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<CategoryService>(CategoryService);
    repository = module.get<Repository<Category>>(getRepositoryToken(Category));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  // Test: Create a category
  describe('create', () => {
    it('should create a category', async () => {
      const categoryData = { title: 'Test Category' };
      const mockCategory: Partial<Category> = { id: '1', ...categoryData };

      // Mock the repository methods
      jest.spyOn(repository, 'create').mockReturnValue(mockCategory as Category);
      jest.spyOn(repository, 'save').mockResolvedValue(mockCategory as Category);

      const result = await service.create(categoryData);

      // Assertions
      expect(repository.create).toHaveBeenCalledWith(categoryData);
      expect(repository.save).toHaveBeenCalledWith(mockCategory);
      expect(result).toEqual(mockCategory);
    });
  });

  // Test: Update a category
  describe('update', () => {
    it('should update a category', async () => {
      const id = '1';
      const categoryData = { title: 'Updated Category' };
      const mockUpdateResult = { affected: 1 };
      const mockCategories: Partial<Category>[] = [
        { id, title: 'Updated Category', parent_id: null },
      ];
  
      // Mock the repository methods
      jest.spyOn(repository, 'update').mockResolvedValue(mockUpdateResult as any);
      jest.spyOn(repository, 'find').mockResolvedValue(mockCategories as Category[]);
  
      const result = await service.update(id, categoryData);
  
      // Assertions
      expect(repository.update).toHaveBeenCalledWith(id, categoryData);
      expect(repository.find).toHaveBeenCalledWith({
        where: [{ parent_id: id }, { id }],
        relations: ['subCategories'],
      });
      expect(result).toEqual({
        id: '1',
        title: 'Updated Category',
        parent_id: null,
        subCategories: [],
      });
    });
  
    it('should throw an error if category is not updated', async () => {
      const id = '1';
      const categoryData = { title: 'Updated Category' };
      const mockUpdateResult = { affected: 0 };
  
      // Mock the repository method
      jest.spyOn(repository, 'update').mockResolvedValue(mockUpdateResult as any);
  
      // Assertions
      await expect(service.update(id, categoryData)).rejects.toThrow('Category not updated');
    });
  
    it('should throw an error if category is not found after update', async () => {
      const id = '1';
      const categoryData = { title: 'Updated Category' };
      const mockUpdateResult = { affected: 1 };
  
      // Mock the repository methods
      jest.spyOn(repository, 'update').mockResolvedValue(mockUpdateResult as any);
      jest.spyOn(repository, 'find').mockResolvedValue([]);
  
      // Assertions
      await expect(service.update(id, categoryData)).rejects.toThrow('Category not found');
    });
  });

  // Test: Find all categories with nested subcategories
  describe('findAll', () => {
    it('should return an array of categories with nested subcategories', async () => {
      const mockCategories: Partial<Category>[] = [
        { id: '1', title: 'Parent Category', parent_id: null },
        { id: '2', title: 'Sub Category', parent_id: '1' },
      ];
  
      // Mock the repository method
      jest.spyOn(repository, 'find').mockResolvedValue(mockCategories as Category[]);
  
      const result = await service.findAll();
  
      // Assertions
      expect(repository.find).toHaveBeenCalledWith({ relations: ['subCategories'] });
      expect(result).toEqual([
        {
          id: '1',
          title: 'Parent Category',
          parent_id: null,
          subCategories: [
            {
              id: '2',
              title: 'Sub Category',
              parent_id: '1',
              subCategories: [], // Further nested subcategories (if any)
            },
          ],
        },
      ]);
    });
  });

// Test: Find a category by ID
describe('findOne', () => {
    it('should return a category by id', async () => {
      const id = '1';
      const mockCategories: Partial<Category>[] = [
        { id, title: 'Test Category', parent_id: null },
        { id: '2', title: 'Sub Category', parent_id: id },
      ];
  
      // Mock the repository method
      jest.spyOn(repository, 'find').mockResolvedValue(mockCategories as Category[]);
  
      const result = await service.findOne(id);
  
      // Assertions
      expect(repository.find).toHaveBeenCalledWith({
        where: [{ parent_id: id }, { id }],
        relations: ['subCategories'],
      });
      expect(result).toEqual({
        id: '1',
        title: 'Test Category',
        parent_id: null,
        subCategories: [
          {
            id: '2',
            title: 'Sub Category',
            parent_id: '1',
            subCategories: [], // Further nested subcategories (if any)
          },
        ],
      });
    });
  
    it('should throw an error if category is not found', async () => {
      const id = '1';
  
      // Mock the repository method
      jest.spyOn(repository, 'find').mockResolvedValue([]);
  
      // Assertions
      await expect(service.findOne(id)).rejects.toThrow('Category not found');
    });
  });

  // Test: Delete a category
  describe('remove', () => {
    it('should delete a category', async () => {
      const id = '1';
      const mockDeleteResult = { affected: 1 };

      // Mock the repository method
      jest.spyOn(repository, 'delete').mockResolvedValue(mockDeleteResult as any);

      await service.remove(id);

      // Assertions
      expect(repository.delete).toHaveBeenCalledWith(id);
    });

    it('should throw an error if category is not found', async () => {
      const id = '1';
      const mockDeleteResult = { affected: 0 };

      // Mock the repository method
      jest.spyOn(repository, 'delete').mockResolvedValue(mockDeleteResult as any);

      // Assertions
      await expect(service.remove(id)).rejects.toThrow(NotFoundException);
    });
  });
});