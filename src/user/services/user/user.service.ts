import { Injectable, Post } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { CompanyService } from 'src/company/services/company/company.service';
import { ProductService } from 'src/product/services/product/product.service';
import { User, UserDocument } from 'src/user/schemas/user.schema';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class UserService {
    constructor(
        @InjectModel(User.name) private userModel: Model<UserDocument>,
        private productService: ProductService,
        private companyService: CompanyService
    ) { }

    async updateRefreshToken(id: string) {
        const newToken = uuidv4();
        const user = await this.userModel.findById(id).exec();
        user.refreshToken = newToken;
        user.save();

        return newToken;
    }

    async findRefreshToken(id: string) {
        const user = await this.userModel.findById(id).exec();
        return user.refreshToken;
    }

    async findUser(usernameOrEmail: string) {
        return await this.userModel.findOne().or([{ username: usernameOrEmail }, { email: usernameOrEmail }]).lean().exec();
    }

    async findUserById(id: string) {
        return await this.userModel.findById(id).lean().exec();
    }


    async create(user: User) {
        const newUser = new this.userModel(user);
        return newUser.save();
    }

    async findUserProducts(id: string) {
        const products = await (await this.userModel.findById(id).lean().exec()).productIds;
        return await this.productService.findMultiple(products, id);
    }

    async findUserCompanies(id: string) {
        const productIds = (await this.userModel.findById(id).lean().exec()).productIds;
        const products = await this.productService.findMultiple(productIds, id);
        const companyIds = products.map(p => p.companyId);
        return this.companyService.findMultiple(companyIds);
    }

    async addUserProduct(id: string, product: any) {
        const p = await this.productService.create(product, id);
        const user = await this.userModel.findById(id).exec();
        if (user.productIds) {
            user.productIds = [...user.productIds, p._id];
        } else {
            user.productIds = [p._id];
        }
        return user.save();
    }

    async removeUserProduct(id: string, productId: string) {
        const user = await this.userModel.findById(id).exec();
        user.productIds = user.productIds.filter(pid => pid !== productId);
        this.productService.remove(productId, id);
        return user.save();
    }
}
