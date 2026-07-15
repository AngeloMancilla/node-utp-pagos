import 'dotenv/config';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '../src/generated/prisma/client';

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error('DATABASE_URL is not set');
}

const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });

async function main() {
  const angelo = await prisma.estudiante.upsert({
    where: { codigo: 'ANG123' },
    update: {},
    create: {
      apellido: 'Mancilla',
      nombre: 'Angelo',
      codigo: 'ANG123',
    },
  });

  const flavio = await prisma.estudiante.upsert({
    where: { codigo: 'FLA123' },
    update: {},
    create: {
      apellido: 'Mancilla',
      nombre: 'Flavio',
      codigo: 'FLA123',
    },
  });

  console.log({ angelo, flavio });
}

main()
  .catch((e) => {
    console.error(e);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
