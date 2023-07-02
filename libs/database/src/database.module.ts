import { Module } from '@nestjs/common';
import { DatabaseService } from './database.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppDataSource } from './datasource';
import { entities } from './entities';
import { repositories } from './repositories';

@Module({
  imports: [
    TypeOrmModule.forRoot(AppDataSource.options),
    TypeOrmModule.forFeature([...entities])
  ],
  providers: [...entities,...repositories],
  exports: [...repositories],
})
export class DatabaseModule {}
