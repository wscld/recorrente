import { Module } from '@nestjs/common';
import { PackagesController } from './controllers/packages/packages.controller';
import { PackagesService } from './services/packages/packages.service';

@Module({
  controllers: [PackagesController],
  providers: [PackagesService]
})
export class PackagesModule {}
