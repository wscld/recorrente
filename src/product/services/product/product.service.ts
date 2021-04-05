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
        return this.productModel.findOne({ _id: id }).lean().exec();
    }

    findMultiple(ids: string[], userId: string) {
        return this.productModel.find({ $and: [{ _id: { $in: ids } }, { $or: [{ userId: userId }, { userId: null }] }] }).lean().exec();
    }

    findFromCompany(id: string) {
        return this.productModel.find({ companyId: id }).lean().exec();
    }

    findAll() {
        return this.productModel.find().lean().exec();
    }

    async create(product: any, userId: string) {
        if (product._id) {
            const p = await this.productModel.findOne({ _id: product._id }).exec();
            return p;
        } else {
            const p = new this.productModel(product);
            p.userId = userId;
            return p.save();
        }
    }

    async update(product: any, userId: string) {
        const p = await this.productModel.findOne({ _id: product._id }).exec();
        if (p.userId === userId) {
            p.name = product.name;
            p.value = product.value;
            return p.save();
        }
    }

    async remove(id: string, userId: string) {
        const p = await this.productModel.findOne({ _id: id }).exec();
        if (p.userId === userId) {
            return p.delete();
        }
    }
}
