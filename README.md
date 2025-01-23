<p align="center">
  <a href="https://www.gravatar.com/avatar/c6c195181e5f932711f11ef2663ffcdd">
    <img src="https://www.gravatar.com/avatar/c6c195181e5f932711f11ef2663ffcdd?s=200&d=identicon" alt="Gravatar Image" width="100" height="100" style="border-radius: 50%;">
  </a>
</p>



  <p align="center">Tree Category Management System using NestJS, TypeScript, and MySQL.</p>

  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description
<p align="left"> To design and implement a tree-based category management system using **NestJS**, **TypeScript**, **MySQL**, and **TypeORM** or **Prisma**, the development environment will first be set up. Using NestJS, the required modules and services will be defined. For category management, **TypeORM** or **Prisma** will be utilized to define data models and perform CRUD operations.
The primary services include:

Creating categories
Editing categories
Listing all categories
Retrieving a specific category
Deleting categories
Unit and end-to-end (e2e) tests will be implemented for each service to ensure functionality and reliability. Finally, the project will be created as a private repository in GitLab, with access provided to the necessary users.

GitHub: https://github.com/hesammosaffa/coinoverse-tasck.git

</p>

## Project setup


```bash
$ npm install @prisma/client
$ npm install prisma --save-dev
```

```bash
$ npx prisma init
```

```bash
$ npm run seed
```


## Compile and run the project

```bash
# development
$ npm run start
```

```bash
# watch mode
$ npm run start:dev
```

## Run tests

```bash
# unit tests
$ npm run test
```

```bash
# e2e tests
$ npm run test:e2e
```

## Deployment

When you're ready to deploy your NestJS application to production, there are some key steps you can take to ensure it runs as efficiently as possible. Check out the [deployment documentation](https://docs.nestjs.com/deployment) for more information.

If you are looking for a cloud-based platform to deploy your NestJS application, check out [Mau](https://mau.nestjs.com), our official platform for deploying NestJS applications on AWS. Mau makes deployment straightforward and fast, requiring just a few simple steps:

```bash
$ npm install -g mau
$ mau deploy
```

## Stay in touch

- Author - [Hesameddin Mosaffa](www.linkedin.com/in/hesameddin-mosaffa)


## API cURL

### save category
```bash
$ curl --location 'http://localhost:3000/categories' \
--header 'Content-Type: application/json' \
--data '{
  "title": "test",
  "parent_id" : "7937ae3a-aabd-4776-90ee-eae9048e88c4"
  
}'
```
### find all categories
```bash
$ curl --location 'http://localhost:3000/categories'
```

### find a category
```bash
$ curl --location 'http://localhost:3000/categories/0148905b-8a2d-493f-b42f-cfb889ca9567'
```

### update a category
```bash
$ curl --location --request PUT 'http://localhost:3000/categories/0148905b-8a2d-493f-b42f-cfb889ca9567' \
--header 'Content-Type: application/json' \
--data '{
    "title":"test12"
}'
```

delete a category
```bash
$ curl --location --request DELETE 'http://localhost:3000/categories/0148905b-8a2d-493f-b42f-cfb889ca9567'
```