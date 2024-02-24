import {
  Table,
  Column,
  DataType,
  Model,
  BelongsTo,
} from 'sequelize-typescript';
import { Product } from 'src/products/products.model';
import { User } from 'src/users/users.model';

interface CartCreationAttr {
  user_id: number;
  product_id: number;
}

@Table({ tableName: 'Carts' })
export class Cart extends Model<Cart, CartCreationAttr> {
  @Column({ type: DataType.INTEGER, allowNull: false })
  user_id: number;
  @Column({ type: DataType.INTEGER, allowNull: false })
  product_id: number;

  @BelongsTo(() => User, { foreignKey: 'user_id' })
  user: User;

  @BelongsTo(() => Product, { foreignKey: 'product_id' })
  product: Product;
}
