import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Product } from './products.model';
import { Product_image } from '../product_images/product_images.model';
import { CreateProductsDto } from 'src/dto/create-product.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product) private productRepository: typeof Product,
    @InjectModel(Product_image)
    private productImageRepository: typeof Product_image,
  ) {}

  async createProduct(productDto: CreateProductsDto) {
    const { img_url, ...productData } = productDto;
    const product = await this.productRepository.create(productData);

    if (img_url) {
      await this.productImageRepository.create({
        product_id: product.id,
        img_url,
      });
    }

    return product;
  }

  async getAllProducts() {
    const products = await this.productRepository.findAll({
      include: {
        model: Product_image,
        attributes: ['img_url'],
      },
    });
    return products;
  }
}
