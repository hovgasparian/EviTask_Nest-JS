import { Injectable } from '@nestjs/common';
import { User } from './users.model';
import { CreateUserDto } from '../dto/create-user.dto';
import { InjectModel } from '@nestjs/sequelize';
import { RolesService } from 'src/roles/roles.service';
import { Role } from 'src/roles/roles.model';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User) private userRepository: typeof User,
    private rolesService: RolesService,
  ) {}

  async createUser(dto: CreateUserDto) {
    const user = await this.userRepository.create(dto);

    const role = await this.rolesService.getRoleByName('Admin');
    await user.$set('roles', [role.id]);

    user.roles = [role];
    return user;
  }

  async getAllUsers() {
    const users = await this.userRepository.findAll({
      include: {
        model: Role,
        attributes: ['id', 'roleName'],
      },
    });
    return users;
  }

  async getUsersByEmail(email: string) {
    const user = await this.userRepository.findOne({
      where: { email },
      include: {
        model: Role,
        attributes: ['id', 'roleName'],
      },
    });
    return user;
  }
}
