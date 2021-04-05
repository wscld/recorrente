import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CompanyController } from './controllers/company/company.controller';
import { Company, CompanySchema } from './schemas/company.schema';
import { CompanyService } from './services/company/company.service';

@Module({
    imports: [MongooseModule.forFeature([{ name: Company.name, schema: CompanySchema }])],
    controllers: [CompanyController],
    providers: [CompanyService],
    exports: [CompanyService]
})
export class CompanyModule { }
