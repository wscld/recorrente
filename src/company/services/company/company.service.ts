import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Company, CompanyDocument } from 'src/company/schemas/company.schema';

@Injectable()
export class CompanyService {
    constructor(@InjectModel(Company.name) private companyModel: Model<CompanyDocument>) { }

    search(name: string) {
        return this.companyModel.find({ name: { $regex: name, $options: 'i' } }).lean().exec();
    }

    find(id: string) {
        return this.companyModel.findOne({ _id: id }).lean().exec();
    }

    findAll() {
        return this.companyModel.find().lean().exec();
    }

    findMultiple(ids: string[]) {
        return this.companyModel.find({ $and: [{ _id: { $in: ids } }] }).lean().exec();
    }
}
