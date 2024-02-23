import {
  Body,
  Controller,
  Get,
  Post,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { CreateUserDto } from '../dto/create-user.dto';
import { UsersService } from './users.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { AddRoleDto } from 'src/dto/add-role.dto';

@Controller('/users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  // @Post()
  // create(@Body() userDto: CreateUserDto) {
  //   return this.usersService.createUser(userDto);
  // }

  @Post()
  async create(@Body() usersDto: CreateUserDto) {
    try {
      const user = await this.usersService.createUser(usersDto);
      return { message: 'Product created successfully', user };
    } catch (error) {
      throw new UnauthorizedException(error.message);
    }
  }




  @UseGuards(JwtAuthGuard)
  @Get()
  getAll() {
    return this.usersService.getAllUsers();
  }

  @Post('/role')
  addRole(@Body() dto: AddRoleDto) {
    return this.usersService.addRole(dto);
  }
}
