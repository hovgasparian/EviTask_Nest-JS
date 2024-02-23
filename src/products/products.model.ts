import { Column, DataType, Model, Table, HasMany } from 'sequelize-typescript';
import { Product_image } from '../product_images/product_images.model';

interface ProductCreationAttr {
  productName: string;
  description: string;
  price: number;
}

@Table({ tableName: 'products' })
export class Product extends Model<Product, ProductCreationAttr> {
  @Column({ type: DataType.STRING, allowNull: false })
  productName: string;

  @Column({ type: DataType.STRING, allowNull: false })
  description: string;

  @Column({ type: DataType.INTEGER, allowNull: false })
  price: number;

  @HasMany(() => Product_image)
  images: Product_image[];
}
