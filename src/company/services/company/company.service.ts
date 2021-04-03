import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Company, CompanyDocument } from 'src/company/schemas/company.schema';

@Injectable()
export class CompanyService {
    constructor(@InjectModel(Company.name) private companyModel: Model<CompanyDocument>) { }

    search(name: string) {
        return this.companyModel.find({ name: { $regex: name, $options: 'i' } }).lean().exec();
    }

    find(id: number) {
        return this.companyModel.findOne({ id: id }).lean().exec();
    }

    findAll() {
        return this.companyModel.find().lean().exec();
    }

    create() {
        const newCompany = new this.companyModel({ id: 1, name: 'test', description: 'hello' });
        return newCompany.save();
    }

}
