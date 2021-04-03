import { Injectable, Post } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from 'src/user/schemas/user.schema';

@Injectable()
export class UserService {
    constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) { }
    async validate(usernameOrEmail: string, password: string) {
        const user = await this.userModel.findOne().or([{ username: usernameOrEmail }, { email: usernameOrEmail }]).lean().exec();
        if (user && user.password === password) {
            return true;
        }
        return false;
    }
}
