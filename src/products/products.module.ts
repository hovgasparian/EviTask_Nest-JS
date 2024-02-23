import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Product } from './products.model';
import { Product_image } from '../product_images/product_images.model';

@Module({
  controllers: [ProductsController],
  providers: [ProductsService],
  imports: [
    SequelizeModule.forFeature([Product, Product_image]),

  ],
})
export class ProductsModule {}
