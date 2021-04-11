import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductController } from './controllers/product/product.controller';
import { Product, ProductSchama } from './schemas/product.schema';
import { ProductService } from './services/product/product.service';

@Module({
    imports: [MongooseModule.forFeature([{ name: Product.name, schema: ProductSchama }])],
    controllers: [ProductController],
    providers: [ProductService],
    exports: [ProductService]
})

export class ProductModule { }
