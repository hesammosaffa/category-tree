// import { Test, TestingModule } from '@nestjs/testing';
// import { INestApplication } from '@nestjs/common';
// import * as request from 'supertest';
// import { TypeOrmModule } from '@nestjs/typeorm';
// import { CategoryController } from '../src/controllers/category.controller';
// import { CategoryService } from '../src/services/category.service';
// import { Category } from '../src/entities/category.entity';

// describe('CategoryController (e2e)', () => {
//   let app: INestApplication;
//   let repository;

//   beforeAll(async () => {
//     const moduleFixture: TestingModule = await Test.createTestingModule({
//       imports: [
//         TypeOrmModule.forRoot({
//           type: 'mysql',
//           host: 'localhost',
//           port: 3306,
//           username: 'root', 
//           password: '1234', 
//           database: 'tree_category', 
//           entities: [Category],
//           synchronize: true, 
//           dropSchema: true, 
//         }),
//         TypeOrmModule.forFeature([Category]),
//       ],
//       controllers: [CategoryController],
//       providers: [CategoryService],
//     }).compile();

//     app = moduleFixture.createNestApplication();
//     await app.init();

//     repository = moduleFixture.get('CategoryRepository');
//   }, 20000); 

//   beforeEach(async () => {
//     await repository.query('DELETE FROM category;'); 
//   });

//   afterAll(async () => {
//     if (app) {
//       await app.close(); 
//     }
//   }, 20000); 

  
//   it('/categories (POST) - should create a category', async () => {
//     const categoryData = { title: 'Test Category' };
//     const response = await request(app.getHttpServer())
//       .post('/categories')
//       .send(categoryData)
//       .expect(201);

//     expect(response.body).toHaveProperty('id');
//     expect(response.body.title).toEqual(categoryData.title);
//   });


//   it('/categories (GET) - should return all categories', async () => {
 
//     const categoryData = { title: 'Test Category' };
//     await request(app.getHttpServer())
//       .post('/categories')
//       .send(categoryData)
//       .expect(201);

//     const response = await request(app.getHttpServer())
//       .get('/categories')
//       .expect(200);

//     expect(Array.isArray(response.body)).toBe(true);
//     expect(response.body.length).toBeGreaterThan(0);
//   });


//   it('/categories/:id (GET) - should return a category by id', async () => {

//     const categoryData = { title: 'Test Category' };
//     const createResponse = await request(app.getHttpServer())
//       .post('/categories')
//       .send(categoryData)
//       .expect(201);

//     const categoryId = createResponse.body.id;

  
//     const response = await request(app.getHttpServer())
//       .get(`/categories/${categoryId}`)
//       .expect(200);

//     expect(response.body.id).toEqual(categoryId);
//     expect(response.body.title).toEqual(categoryData.title);
//   });


//   it('/categories/:id (PUT) - should update a category', async () => {

//     const categoryData = { title: 'Test Category' };
//     const createResponse = await request(app.getHttpServer())
//       .post('/categories')
//       .send(categoryData)
//       .expect(201);

//     const categoryId = createResponse.body.id;

 
//     const updatedData = { title: 'Updated Category' };
//     const updateResponse = await request(app.getHttpServer())
//       .put(`/categories/${categoryId}`)
//       .send(updatedData)
//       .expect(200);

//     expect(updateResponse.body.affected).toEqual(1);


//     const getResponse = await request(app.getHttpServer())
//       .get(`/categories/${categoryId}`)
//       .expect(200);

//     expect(getResponse.body.title).toEqual(updatedData.title);
//   });


//   it('/categories/:id (DELETE) - should delete a category', async () => {
//     const categoryData = { title: 'Test Category' };
//     const createResponse = await request(app.getHttpServer())
//       .post('/categories')
//       .send(categoryData)
//       .expect(201);

//     const categoryId = createResponse.body.id;


//     await request(app.getHttpServer())
//       .delete(`/categories/${categoryId}`)
//       .expect(200);


//     await request(app.getHttpServer())
//       .get(`/categories/${categoryId}`)
//       .expect(404); 
//   });


//   it('/categories/:id (GET) - should return 404 if category not found', async () => {
//     const nonExistentId = 'non-existent-id';
//     await request(app.getHttpServer())
//       .get(`/categories/${nonExistentId}`)
//       .expect(404);
//   });


//   it('/categories/:id (PUT) - should return 404 if category not found', async () => {
//     const nonExistentId = 'non-existent-id';
//     const updatedData = { title: 'Updated Category' };
//     await request(app.getHttpServer())
//       .put(`/categories/${nonExistentId}`)
//       .send(updatedData)
//       .expect(404);
//   });


//   it('/categories/:id (DELETE) - should return 404 if category not found', async () => {
//     const nonExistentId = 'non-existent-id';
//     await request(app.getHttpServer())
//       .delete(`/categories/${nonExistentId}`)
//       .expect(404);
//   });
// });


import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryController } from '../src/controllers/category.controller';
import { CategoryService } from '../src/services/category.service';
import { Category } from '../src/entities/category.entity';

describe('CategoryController (e2e)', () => {
  let app: INestApplication;
  let repository;

  // Setup the testing environment before all tests
  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot({
          type: 'mysql',
          host: 'localhost',
          port: 3306,
          username: 'root', // Database username
          password: '1234', // Database password
          database: 'tree_category', // Database name
          entities: [Category], // Entities to be used
          synchronize: true, // Automatically create database schema
          dropSchema: true, // Drop the schema before each test run (clean database)
        }),
        TypeOrmModule.forFeature([Category]), // Register the Category entity
      ],
      controllers: [CategoryController], // Register the controller
      providers: [CategoryService], // Register the service
    }).compile();

    // Create the Nest application instance
    app = moduleFixture.createNestApplication();
    await app.init();

    // Get the repository instance for Category
    repository = moduleFixture.get('CategoryRepository');
  }, 20000); // Increase timeout to 20 seconds

  // Clean the database before each test
  beforeEach(async () => {
    await repository.query('DELETE FROM category;'); // Clear the category table
  });

  // Close the app after all tests are done
  afterAll(async () => {
    if (app) {
      await app.close(); // Close the app to release resources
    }
  }, 20000); // Increase timeout to 20 seconds

  // Test: Create a new category
  it('/categories (POST) - should create a category', async () => {
    const categoryData = { title: 'Test Category' }; // Test data
    const response = await request(app.getHttpServer())
      .post('/categories')
      .send(categoryData)
      .expect(201); // Expect HTTP 201 (Created)

    // Assertions
    expect(response.body).toHaveProperty('id'); // Check if the response has an ID
    expect(response.body.title).toEqual(categoryData.title); // Check if the title matches
  });

  // Test: Get all categories with nested subcategories (tree structure)
  it('/categories (GET) - should return all categories with nested subcategories', async () => {
    // Create a parent category
    const parentCategoryData = { title: 'Parent Category' };
    const parentResponse = await request(app.getHttpServer())
      .post('/categories')
      .send(parentCategoryData)
      .expect(201);

    // Create a subcategory under the parent category
    const subCategoryData = { title: 'Sub Category', parent_id: parentResponse.body.id };
    await request(app.getHttpServer())
      .post('/categories')
      .send(subCategoryData)
      .expect(201);

    // Fetch all categories
    const response = await request(app.getHttpServer())
      .get('/categories')
      .expect(200); // Expect HTTP 200 (OK)

    // Assertions
    expect(Array.isArray(response.body)).toBe(true); // Check if the response is an array
    expect(response.body.length).toBe(1); // Only one parent category should exist
    expect(response.body[0].subCategories.length).toBe(1); // Check if the subcategory is nested
    expect(response.body[0].subCategories[0].title).toEqual(subCategoryData.title); // Verify subcategory title
  });

  // Test: Get a single category by ID
  it('/categories/:id (GET) - should return a category by id', async () => {
    // Create a category
    const categoryData = { title: 'Test Category' };
    const createResponse = await request(app.getHttpServer())
      .post('/categories')
      .send(categoryData)
      .expect(201);

    const categoryId = createResponse.body.id; // Get the created category ID

    // Fetch the category by ID
    const response = await request(app.getHttpServer())
      .get(`/categories/${categoryId}`)
      .expect(200); // Expect HTTP 200 (OK)

    // Assertions
    expect(response.body.id).toEqual(categoryId); // Check if the IDs match
    expect(response.body.title).toEqual(categoryData.title); // Check if the title matches
  });

  // Test: Update a category
  it('/categories/:id (PUT) - should update a category', async () => {
    // Create a category
    const categoryData = { title: 'Test Category' };
    const createResponse = await request(app.getHttpServer())
      .post('/categories')
      .send(categoryData)
      .expect(201);

    const categoryId = createResponse.body.id; // Get the created category ID

    // Update the category
    const updatedData = { title: 'Updated Category' };
    const updateResponse = await request(app.getHttpServer())
      .put(`/categories/${categoryId}`)
      .send(updatedData)
      .expect(200); // Expect HTTP 200 (OK)

    // Assertions
    expect(updateResponse.body.affected).toEqual(1); // Check if one record was updated

    // Fetch the updated category to verify changes
    const getResponse = await request(app.getHttpServer())
      .get(`/categories/${categoryId}`)
      .expect(200); // Expect HTTP 200 (OK)

    expect(getResponse.body.title).toEqual(updatedData.title); // Check if the title was updated
  });

  // Test: Delete a category
  it('/categories/:id (DELETE) - should delete a category', async () => {
    // Create a category
    const categoryData = { title: 'Test Category' };
    const createResponse = await request(app.getHttpServer())
      .post('/categories')
      .send(categoryData)
      .expect(201);

    const categoryId = createResponse.body.id; // Get the created category ID

    // Delete the category
    await request(app.getHttpServer())
      .delete(`/categories/${categoryId}`)
      .expect(200); // Expect HTTP 200 (OK)

    // Verify that the category no longer exists
    await request(app.getHttpServer())
      .get(`/categories/${categoryId}`)
      .expect(404); // Expect HTTP 404 (Not Found)
  });

  // Test: Get a non-existent category (should return 404)
  it('/categories/:id (GET) - should return 404 if category not found', async () => {
    const nonExistentId = 'non-existent-id'; // Invalid ID
    await request(app.getHttpServer())
      .get(`/categories/${nonExistentId}`)
      .expect(404); // Expect HTTP 404 (Not Found)
  });

  // Test: Update a non-existent category (should return 404)
  it('/categories/:id (PUT) - should return 404 if category not found', async () => {
    const nonExistentId = 'non-existent-id'; // Invalid ID
    const updatedData = { title: 'Updated Category' }; // Update data
    await request(app.getHttpServer())
      .put(`/categories/${nonExistentId}`)
      .send(updatedData)
      .expect(404); // Expect HTTP 404 (Not Found)
  });

  // Test: Delete a non-existent category (should return 404)
  it('/categories/:id (DELETE) - should return 404 if category not found', async () => {
    const nonExistentId = 'non-existent-id'; // Invalid ID
    await request(app.getHttpServer())
      .delete(`/categories/${nonExistentId}`)
      .expect(404); // Expect HTTP 404 (Not Found)
  });
});