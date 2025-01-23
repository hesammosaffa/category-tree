import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Create 70 regular categories (without a parent)
  for (let i = 1; i <= 70; i++) {
    await prisma.category.create({
      data: {
        title: `Category ${i}`,
      },
    });
  }

  // Create 30 subcategories (with a parent)
  const parentCategories = await prisma.category.findMany({
    take: 30, // Select 30 categories as parents
  });

  for (let i = 0; i < 30; i++) {
    await prisma.category.create({
      data: {
        title: `Subcategory ${i + 1}`,
        parent_id: parentCategories[i].id, // Set the parent
      },
    });
  }

  console.log('Seeder executed successfully! 100 categories created.');
}

main()
  .catch((e) => {
    console.error('Error during seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });