import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  await prisma.shipment.create({
    data: {
      title: 'Misc',
      items: {
        createMany: {
          data: [
            { cost: 10, description: 'lorem ipsum', title: 'title ipsum' },
            { cost: 10, description: 'lorem ipsum', title: 'title ipsum' },
            { cost: 10, description: 'lorem ipsum', title: 'title ipsum' },
            { cost: 10, description: 'lorem ipsum', title: 'title ipsum' },
          ],
        },
      },
    },
  });
  await prisma.shipment.create({
    data: {
      title: 'Main shipment',
      items: {
        createMany: {
          data: [
            { cost: 10, description: 'lorem ipsum', title: 'title ipsum' },
            { cost: 10, description: 'lorem ipsum', title: 'title ipsum' },
            { cost: 10, description: 'lorem ipsum', title: 'title ipsum' },
            { cost: 10, description: 'lorem ipsum', title: 'title ipsum' },
            { cost: 10, description: 'lorem ipsum', title: 'title ipsum' },
            { cost: 10, description: 'lorem ipsum', title: 'title ipsum' },
            { cost: 10, description: 'lorem ipsum', title: 'title ipsum' },
            { cost: 10, description: 'lorem ipsum', title: 'title ipsum' },
            { cost: 10, description: 'lorem ipsum', title: 'title ipsum' },
          ],
        },
      },
    },
  });
  await prisma.item.create({
    data: {
      cost: 1000,
      title: 'Boujee item 1',
      description: 'Create an expensive shipment and add me',
    },
  });
  await prisma.item.create({
    data: {
      cost: 10000,
      title: 'Boujee item 2',
      description: 'Create an expensive shipment and add me',
    },
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
