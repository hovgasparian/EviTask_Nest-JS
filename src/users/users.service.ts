import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { User } from './users.model';
import { CreateUserDto } from '../dto/create-user.dto';
import { InjectModel } from '@nestjs/sequelize';
import { RolesService } from 'src/roles/roles.service';
import { Role } from 'src/roles/roles.model';
import { AddRoleDto } from 'src/dto/add-role.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User) private userRepository: typeof User,
    private rolesService: RolesService,
  ) {}

  async createUser(dto: CreateUserDto) {
    const user = await this.userRepository.create(dto);

    const role = await this.rolesService.getRoleByName('Customer');
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

  async findOne(id: number) {
    const user = await this.userRepository.findOne({
      where: { id },
      include: {
        model: Role,
        attributes: ['id', 'roleName'],
      },
    });
    return user;
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

  async addRole(dto: AddRoleDto) {
    const user = await this.userRepository.findByPk(dto.userId);
    const role = await this.rolesService.getRoleByName(dto.roleName);
    if (user && role) {
      await user.$add('roles', role.id);
      return dto;
    }
    throw new HttpException('User or role was not found', HttpStatus.NOT_FOUND);
  }
}
