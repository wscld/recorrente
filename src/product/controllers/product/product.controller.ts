import { Controller, Get, Param } from '@nestjs/common';
import { ProductService } from 'src/product/services/product/product.service';

@Controller('product')
export class ProductController {
    constructor(private productService: ProductService) { }

    @Get('name/:q')
    findByName(@Param() params) {
        return this.productService.search(params.q);
    }

    @Get('id/:q')
    findById(@Param() params) {
        return this.productService.find(params.q);
    }

    @Get('all')
    findAll() {
        return this.productService.findAll();
    }

    @Get('company/:q')
    findAllFromCompany(@Param() params) {
        return this.productService.findFromCompany(params.q);
    }
}
