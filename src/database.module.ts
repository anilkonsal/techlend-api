import { Module } from '@nestjs/common';
import { databaseProviders } from './common/database.provider';

@Module({
  providers: [...databaseProviders],
  exports: [...databaseProviders],
})
export class DatabaseModule {}
