import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Company, CompanyDocument } from 'src/company/schemas/company.schema';

@Injectable()
export class CompanyService {
    constructor(@InjectModel(Company.name) private userModel: Model<CompanyDocument>) { }
}
