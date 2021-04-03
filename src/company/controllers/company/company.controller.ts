import { Controller, Get, Param } from '@nestjs/common';
import { CompanyService } from 'src/company/services/company/company.service';

@Controller('company')
export class CompanyController {
    constructor(private companyService: CompanyService) { }

    @Get('name/:q')
    findByName(@Param() params) {
        return this.companyService.search(params.q);
    }

    @Get('id/:q')
    findById(@Param() params) {
        return this.companyService.find(params.q);
    }

    @Get('all')
    findAll() {
        return this.companyService.findAll();
    }

    @Get('create')
    createTest() {
        return this.companyService.create();
    }
}