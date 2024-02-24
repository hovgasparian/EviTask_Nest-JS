import {
  Controller,
  Body,
  Put,
  Post,
  BadRequestException,
  NotFoundException,
  Get,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { CartService } from './cart.service';
import { CreateCartsDto } from 'src/dto/create-cart.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Roles } from 'src/auth/roles-auth.decorator';
import { RolesGuard } from 'src/auth/roles.guard';

@Controller('cart')
export class CartController {
  constructor(private cartsService: CartService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async addToCart(@Body() dto: CreateCartsDto) {
    const { user_id, product_id } = dto;
    try {
      const cart = await this.cartsService.addToCart(user_id, product_id);
      return cart;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Roles('Admin')
  @UseGuards(RolesGuard)
  @Get()
  async getAllCarts() {
    try {
      const carts = await this.cartsService.getAllCarts();
      return carts;
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  @Roles('Admin')
  @UseGuards(RolesGuard)
  @Get(':id')
  async getCartById(@Param('id') id: number) {
    try {
      const cart = await this.cartsService.getCartById(id);
      return cart;
    } catch (error) {
      throw new NotFoundException(
        `Cart with id ${id} not found`,
        error.message,
      );
    }
  }

  @UseGuards(JwtAuthGuard)
  @Delete('/remove/:id')
  async removeProduct(@Param('id') id: number) {
    try {
      const cart = await this.cartsService.remove(id);
      return cart;
    } catch (error) {
      throw new NotFoundException(`Cart with id: ${id} not found`);
    }
  }
}
