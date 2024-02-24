import {
  Controller,
  Post,
  Body,
  Param,
  Get,
  UseGuards,
  BadRequestException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { RolesService } from './roles.service';
import { CreateRoleDto } from 'src/dto/create-role.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Roles } from 'src/auth/roles-auth.decorator';
import { RolesGuard } from 'src/auth/roles.guard';

@Controller('roles')
export class RolesController {
  constructor(private roleService: RolesService) {}

  @Post()
  async create(@Body() roleDto: CreateRoleDto) {
    try {
      const role = await this.roleService.createRole(roleDto);
      return role;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Roles('Admin')
  @UseGuards(RolesGuard)
  @Get()
  async getAllRoles() {
    try {
      const roles = this.roleService.getAllRoles();
      return roles;
    } catch (error) {
      throw new UnauthorizedException('No access');
    }
  }

  @Get('/:id')
  async getRoleById(@Param('id') id: number) {
    try {
      const role = this.roleService.getRoleById(id);
      return role;
    } catch (error) {
      throw new NotFoundException(`Role with id: ${id} not found`);
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get('/name/:roleName')
  async getByRoleName(@Param('roleName') roleName: string) {
    try {
      const role = this.roleService.getRoleByName(roleName);
      return role;
    } catch (error) {
      throw new NotFoundException(`Role ${roleName} not found`);
    }
  }
}
