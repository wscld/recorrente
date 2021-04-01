import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CompaniesModule } from './public/companies/companies.module';
import { PackagesModule } from './public/packages/packages.module';

@Module({
  imports: [PackagesModule, CompaniesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
