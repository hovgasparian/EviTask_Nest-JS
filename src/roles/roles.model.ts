import {
  BelongsToMany,
  Column,
  DataType,
  Model,
  Table,
} from 'sequelize-typescript';
import { User } from 'src/users/users.model';
import { UserRoleRel } from './user.role.rel';

interface RoleCreationAttr {
  roleName: string;
}

@Table({ tableName: 'roles' })
export class Role extends Model<Role, RoleCreationAttr> {
  @Column({ type: DataType.STRING, allowNull: false })
  roleName: string;

  @BelongsToMany(() => User, () => UserRoleRel)
  users: User[];
}
