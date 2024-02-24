import { BadRequestException, Body, Controller, Post } from '@nestjs/common';
import { CreateUserDto } from 'src/dto/create-user.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/login')
  async login(@Body() usersDto: CreateUserDto) {
    try {
      const result = await this.authService.login(usersDto);
      return result;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Post('/registration')
  async registration(@Body() userDto: CreateUserDto) {
    try {
      const result = await this.authService.registration(userDto);
      return result;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
