import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { User } from './users/users.model';
import { RolesModule } from './roles/roles.module';
import { Role } from './roles/roles.model';
import { UserRoleRel } from './roles/user.role.rel';
import { AuthModule } from './auth/auth.module';
import { ProductsModule } from './products/products.module';
import { Product } from './products/products.model';
import { Product_image } from './product_images/product_images.model';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),

    SequelizeModule.forRoot({
      dialect: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      database: 'Nest_Task',
      models: [User, Role, UserRoleRel, Product, Product_image],
      autoLoadModels: true,
    }),
    UsersModule,
    RolesModule,
    AuthModule,
    ProductsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
