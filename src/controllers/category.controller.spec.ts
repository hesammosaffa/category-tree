import { Test, TestingModule } from '@nestjs/testing';
import { CategoryController } from './category.controller';
import { CategoryService } from '../services/category.service';
import { Category } from '../entities/category.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

// Describe block for the CategoryController test suite
describe('CategoryController', () => {
  let controller: CategoryController; // Instance of the CategoryController
  let service: CategoryService; // Instance of the CategoryService

  // Before each test, initialize the testing module
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CategoryController], // Register the controller
      providers: [
        CategoryService, // Register the service
        {
          provide: getRepositoryToken(Category), // Mock the repository for Category entity
          useClass: Repository, // Use the TypeORM Repository class as a mock
        },
      ],
    }).compile();

    // Get instances of the controller and service from the testing module
    controller = module.get<CategoryController>(CategoryController);
    service = module.get<CategoryService>(CategoryService);
  });

  // Test case: Check if the controller is defined
  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  // Describe block for the 'create' method
  describe('create', () => {
    // Test case: Should create a category
    it('should create a category', async () => {
      const categoryData = { title: 'Test Category' }; // Mock category data
      const mockCategory: Partial<Category> = { id: '1', ...categoryData }; // Mock created category

      // Mock the 'create' method of the service to return the mock category
      jest.spyOn(service, 'create').mockResolvedValue(mockCategory as Category);

      // Call the 'create' method of the controller and assert the result
      const result = await controller.create(categoryData);
      expect(result).toEqual(mockCategory); // Check if the result matches the mock category
      expect(service.create).toHaveBeenCalledWith(categoryData); // Check if the service method was called with the correct data
    });
  });

  // Describe block for the 'findAll' method
  describe('findAll', () => {
    // Test case: Should return an array of categories
    it('should return an array of categories', async () => {
      const mockCategories: Partial<Category>[] = [
        { id: '1', title: 'Test Category 1' },
        { id: '2', title: 'Test Category 2' },
      ]; // Mock array of categories

      // Mock the 'findAll' method of the service to return the mock categories
      jest.spyOn(service, 'findAll').mockResolvedValue(mockCategories as Category[]);

      // Call the 'findAll' method of the controller and assert the result
      const result = await controller.findAll();
      expect(result).toEqual(mockCategories); // Check if the result matches the mock categories
      expect(service.findAll).toHaveBeenCalled(); // Check if the service method was called
    });
  });

  // Describe block for the 'findOne' method
  describe('findOne', () => {
    // Test case: Should return a category by ID
    it('should return a category by id', async () => {
      const id = '1'; // Mock category ID
      const mockCategory: Partial<Category> = { id, title: 'Test Category' }; // Mock category

      // Mock the 'findOne' method of the service to return the mock category
      jest.spyOn(service, 'findOne').mockResolvedValue(mockCategory as Category);

      // Call the 'findOne' method of the controller and assert the result
      const result = await controller.findOne(id);
      expect(result).toEqual(mockCategory); // Check if the result matches the mock category
      expect(service.findOne).toHaveBeenCalledWith(id); // Check if the service method was called with the correct ID
    });

    // Test case: Should throw an error if the category is not found
    it('should throw an error if category not found', async () => {
      const id = '1'; // Mock category ID

      // Mock the 'findOne' method of the service to throw an error
      jest.spyOn(service, 'findOne').mockRejectedValue(new Error('Category not found'));

      // Assert that the 'findOne' method of the controller throws an error
      await expect(controller.findOne(id)).rejects.toThrow('Category not found');
    });
  });

  // Describe block for the 'update' method
  describe('update', () => {
    // Test case: Should update a category
    it('should update a category', async () => {
      const id = '1'; // Mock category ID
      const categoryData = { title: 'Updated Category' }; // Mock update data
      const mockUpdateResult = { affected: 1 }; // Mock update result

      // Mock the 'update' method of the service to return the mock update result
      jest.spyOn(service, 'update').mockResolvedValue(mockUpdateResult as any);

      // Call the 'update' method of the controller and assert the result
      const result = await controller.update(id, categoryData);
      expect(result).toEqual(mockUpdateResult); // Check if the result matches the mock update result
      expect(service.update).toHaveBeenCalledWith(id, categoryData); // Check if the service method was called with the correct data
    });

    // Test case: Should throw an error if the category is not updated
    it('should throw an error if category not updated', async () => {
      const id = '1'; // Mock category ID
      const categoryData = { title: 'Updated Category' }; // Mock update data
      const mockUpdateResult = { affected: 0 }; // Mock update result

      // Mock the 'update' method of the service to throw an error
      jest.spyOn(service, 'update').mockRejectedValue(new Error('Category not updated'));

      // Assert that the 'update' method of the controller throws an error
      await expect(controller.update(id, categoryData)).rejects.toThrow('Category not updated');
    });
  });

  // Describe block for the 'remove' method
  describe('remove', () => {
    // Test case: Should delete a category
    it('should delete a category', async () => {
      const id = '1'; // Mock category ID

      // Mock the 'remove' method of the service to resolve successfully
      jest.spyOn(service, 'remove').mockResolvedValue(undefined);

      // Call the 'remove' method of the controller
      await controller.remove(id);
      expect(service.remove).toHaveBeenCalledWith(id); // Check if the service method was called with the correct ID
    });

    // Test case: Should throw an error if the category is not found
    it('should throw an error if category not found', async () => {
      const id = '1'; // Mock category ID

      // Mock the 'remove' method of the service to throw an error
      jest.spyOn(service, 'remove').mockRejectedValue(new Error('Category not found'));

      // Assert that the 'remove' method of the controller throws an error
      await expect(controller.remove(id)).rejects.toThrow('Category not found');
    });
  });
});