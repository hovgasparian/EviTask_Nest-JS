import { Module, forwardRef } from '@nestjs/common';
import { CartService } from './cart.service';
import { CartController } from './cart.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Cart } from './carts.model';
import { UsersModule } from 'src/users/users.module';
import { ProductsModule } from 'src/products/products.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  providers: [CartService],
  controllers: [CartController],
  imports: [
    SequelizeModule.forFeature([Cart]),
    //UsersModule,
    ProductsModule,
    forwardRef(() => AuthModule),
    forwardRef(() => UsersModule)
  ],
  exports: [CartService],
})
export class CartModule {}
