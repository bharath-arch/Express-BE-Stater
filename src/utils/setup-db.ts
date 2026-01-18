import fs from 'fs';
import path from 'path';
import 'dotenv/config';

const schemaPath = path.join(process.cwd(), 'prisma', 'schema.prisma');

export const setupPrismaProvider = () => {
  const databaseUrl = process.env.DATABASE_URL;
  let schemaContent = fs.readFileSync(schemaPath, 'utf-8');

  if (databaseUrl && databaseUrl.startsWith('postgresql')) {
    console.log('Using PostgreSQL provider');
    schemaContent = schemaContent.replace(/provider\s*=\s*"sqlite"/, 'provider = "postgresql"');
  } else {
    console.log('Using SQLite provider (fallback)');
    schemaContent = schemaContent.replace(/provider\s*=\s*"postgresql"/, 'provider = "sqlite"');
    if (!process.env.DATABASE_URL) {
      process.env.DATABASE_URL = 'file:./dev.db';
    }
  }

  fs.writeFileSync(schemaPath, schemaContent);
};

if (require.main === module) {
  setupPrismaProvider();
}
