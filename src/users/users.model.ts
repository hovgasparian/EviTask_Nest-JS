import {
  BelongsToMany,
  Column,
  DataType,
  HasOne,
  Model,
  Table,
} from 'sequelize-typescript';
import { Role } from 'src/roles/roles.model';
import { UserRoleRel } from 'src/roles/user.role.rel';
import { Cart } from 'src/cart/carts.model';

interface UserCreationAttr {
  name: string;
  email: string;
  password: string;
}

@Table({ tableName: 'Users' })
export class User extends Model<User, UserCreationAttr> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name: string;

  @Column({
    type: DataType.STRING,
    unique: true,
    allowNull: false,
  })
  email: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  password: string;

  @BelongsToMany(() => Role, () => UserRoleRel)
  roles: Role[];

  @HasOne(() => Cart, { foreignKey: 'user_id' })
  cart: Cart;
}
