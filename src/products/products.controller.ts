import {
  Controller,
  Post,
  Body,
  Get,
  BadRequestException,
  Param,
  NotFoundException,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductsDto } from '../dto/create-product.dto';

@Controller('/products')
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  @Post()
  async create(@Body() productDto: CreateProductsDto) {
    try {
      const product = await this.productsService.createProduct(productDto);
      return { message: 'Product created successfully', product };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Get()
  async getAll() {
    try {
      const products = await this.productsService.getAllProducts();
      return products;
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    try {
      const product = await this.productsService.findOne(id);
      return product;
    } catch (error) {
      throw new NotFoundException(
        `Product with id: ${id} not found`,
        error.message,
      );
    }
  }
}
