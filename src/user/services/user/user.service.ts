import { Injectable, Post } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { User, UserDocument } from 'src/user/schemas/user.schema';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class UserService {
    constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) { }

    async updateRefreshToken(id: string) {
        const newToken = uuidv4();
        const user = await this.userModel.findById(id).exec();
        user.refreshToken = newToken;
        user.save();

        return newToken;
    }

    async findRefreshToken(id: Types.ObjectId) {
        const user = await this.userModel.findById(id).exec();
        return user.refreshToken;
    }

    async findUser(usernameOrEmail: string) {
        return await this.userModel.findOne().or([{ username: usernameOrEmail }, { email: usernameOrEmail }]).lean().exec();
    }

    async findUserById(id: string) {
        return await this.userModel.findById(id).lean().exec();
    }
}
