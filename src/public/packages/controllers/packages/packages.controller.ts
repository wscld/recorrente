import { Controller, Get } from '@nestjs/common';

@Controller('packages')
export class PackagesController {

    @Get('')
    getAll() {
        return '';
    }

    @Get(':id')
    getById() {
        return '';
    }

    @Get('search/:name')
    searchByName() {
        return '';
    }
}
