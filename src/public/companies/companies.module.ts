import { Module } from '@nestjs/common';
import { CompaniesController } from './controllers/companies/companies.controller';
import { CompaniesService } from './services/companies/companies.service';

@Module({
  controllers: [CompaniesController],
  providers: [CompaniesService]
})
export class CompaniesModule {}
