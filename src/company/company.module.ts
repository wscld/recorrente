import { Module } from '@nestjs/common';
import { CompanyController } from './controllers/company/company.controller';
import { CompanyService } from './services/company/company.service';

@Module({
    controllers: [CompanyController],
    providers: [CompanyService]
})
export class CompanyModule { }
