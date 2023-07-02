import { ConfigModule } from '@nestjs/config';
import { DataSource } from 'typeorm';
import { entities } from './entities';
import { migrations } from './migrations';

ConfigModule.forRoot();

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DATABASE_HOST,
  port: +process.env.DATABASE_PORT,
  database: process.env.DATABASE_NAME,
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  entities: [ ...entities],
  migrations: [ ...migrations ],
  migrationsTableName: 'typeorm_migrations',
  logger: 'advanced-console',
  logging: true,
  
  synchronize: false, // never use TRUE in production!
  // migrationsRun: true
});
