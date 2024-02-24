import {
  DataType,
  Column,
  Table,
  Model,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { Product } from '../products/products.model';

interface ProductImageCreationAttr {
  product_id: number;
  img_url: string;
}

@Table({ tableName: 'Product_images' })
export class Product_image extends Model<
  Product_image,
  ProductImageCreationAttr
> {
  @ForeignKey(() => Product)
  @Column({ type: DataType.INTEGER, allowNull: false })
  product_id: number;

  @Column({ type: DataType.STRING, allowNull: false })
  img_url: string;

  @BelongsTo(() => Product)
  product: Product;
}
