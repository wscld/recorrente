import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CompanyModule } from 'src/company/company.module';
import { ProductModule } from 'src/product/product.module';
import { UserController } from './controllers/user/user.controller';
import { User, UserSchema } from './schemas/user.schema';
import { UserService } from './services/user/user.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]), ProductModule, CompanyModule],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService]
})
export class UserModule { }
