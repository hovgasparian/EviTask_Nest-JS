import { Controller, Post, Body, Param, Get, UseGuards } from '@nestjs/common';
import { RolesService } from './roles.service';
import { CreateRoleDto } from 'src/dto/create-role.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Roles } from 'src/auth/roles-auth.decorator';
import { RolesGuard } from 'src/auth/roles.guard';

@Controller('roles')
export class RolesController {
  constructor(private roleService: RolesService) {}

  @Post()
  create(@Body() roleDto: CreateRoleDto) {
    return this.roleService.createRole(roleDto);
  }

  @Roles('Admin')
  @UseGuards(RolesGuard)
  @Get()
  getAllRoles() {
    return this.roleService.getAllRoles();
  }

  @Get('/:id')
  getRoleById(@Param('id') id: number) {
    return this.roleService.getRoleById(id);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/:roleName')
  getByRoleName(@Param('roleName') roleName: string) {
    return this.roleService.getRoleByName(roleName);
  }
}
