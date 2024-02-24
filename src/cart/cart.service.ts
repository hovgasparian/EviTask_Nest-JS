import { Injectable, NotFoundException } from '@nestjs/common';
import { Cart } from './carts.model';
import { UsersService } from 'src/users/users.service';
import { ProductsService } from 'src/products/products.service';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class CartService {
  constructor(
    @InjectModel(Cart) private cartsRepository: typeof Cart,
    private usersService: UsersService,
    private productsService: ProductsService,
  ) {}

  async addToCart(user_id: number, product_id: number) {
    const user = await this.usersService.findOne(user_id);
    const product = await this.productsService.findOne(product_id);

    if (!user && !product) {
      throw new NotFoundException({
        message: "User or product doesn't dound",
      });
    }
    const cartItem = await this.cartsRepository.create({ user_id, product_id });
    return cartItem;
  }

  async getAllCarts() {
    const carts = await this.cartsRepository.findAll();
    return carts;
  }

  async getCartById(id: number) {
    const cart = await this.cartsRepository.findOne({ where: { id } });
    return cart;
  }

  async remove(id: number){
    const cart = await this.cartsRepository.destroy({where: {id}})
    return cart
  }
}
