import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Product, ProductDocument } from 'src/product/schemas/product.schema';

@Injectable()
export class ProductService {
    constructor(@InjectModel(Product.name) private productModel: Model<ProductDocument>) { }

    search(name: string) {
        return this.productModel.find({ name: { $regex: name, $options: 'i' } }).lean().exec();
    }

    find(id: string) {
        const idObj = new Types.ObjectId(id);
        return this.productModel.findOne({ _id: idObj }).lean().exec();
    }

    findFromCompany(id: string) {
        const idObj = new Types.ObjectId(id);
        return this.productModel.find({ companyId: idObj }).lean().exec();
    }

    findAll() {
        return this.productModel.find().lean().exec();
    }
}
