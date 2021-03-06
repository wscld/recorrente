import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config/dist';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CompanyModule } from './company/company.module';
import { ProductModule } from './product/product.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot('mongodb+srv://' + process.env.DB_USER + ':' + process.env.DB_PASS + '@cluster0.xemwb.mongodb.net/main-db?retryWrites=true&w=majority'),
    ProductModule,
    UserModule,
    CompanyModule,
    ProductModule,
    AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
