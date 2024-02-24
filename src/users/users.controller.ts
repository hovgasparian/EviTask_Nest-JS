import {
  Body,
  Controller,
  Get,
  Post,
  Param,
  UseGuards,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from '../dto/create-user.dto';
import { UsersService } from './users.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { AddRoleDto } from 'src/dto/add-role.dto';

@Controller('/users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post()
  async create(@Body() usersDto: CreateUserDto) {
    try {
      const user = await this.usersService.createUser(usersDto);
      return { message: 'User created successfully', user };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async getAll() {
    try {
      const users = await this.usersService.getAllUsers();
      return users;
    } catch (error) {
      throw new NotFoundException(
        {
          message: "Users doesn't found",
        },
        error,
      );
    }
  }

  @Get('/:email')
  async getUsersByEmail(@Param('email') email: string) {
    try {
      const user = await this.usersService.getUsersByEmail(email);
      return user;
    } catch (error) {
      throw new NotFoundException(
        { message: `User with email ${email} not found` },
        error.message,
      );
    }
  }

  @Get('user/:id')
  async findOne(@Param('id') id: number) {
    try {
      const user = await this.usersService.findOne(id);
      return user;
    } catch (error) {
      throw new NotFoundException(
        { message: `User with id ${id} not found` },
        error.message,
      );
    }
  }

  @Post('/role')
  async addRole(@Body() dto: AddRoleDto) {
    try {
      const user = await this.usersService.addRole(dto);
      return user;
    } catch (error) {
      throw new BadRequestException({ message: error.message });
    }
  }
}
