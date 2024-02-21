import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/dto/create-user.dto';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcryptjs';
import { User } from 'src/users/users.model';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async login(userDto: CreateUserDto) {
    const user = await this.validateUser(userDto);
    return this.generateToken(user);
  }

  async registration(userDto: CreateUserDto) {
    const condidate = await this.usersService.getUsersByEmail(userDto.email);
    if (condidate) {
      throw new HttpException('User already exist', HttpStatus.BAD_REQUEST);
    }
    const hashPassword = await bcrypt.hash(userDto.password, 7);
    const user = await this.usersService.createUser({
      ...userDto,
      password: hashPassword,
    });
    return this.generateToken(user);
  }

  private async generateToken(user: User) {
    const payLoad = { email: user.email, id: user.id, roles: user.roles };
    return {
      token: this.jwtService.sign(payLoad),
    };
  }

  private async validateUser(userDto: CreateUserDto) {
    const user = await this.usersService.getUsersByEmail(userDto.email);
    const passwordsEqual = await bcrypt.compare(
      userDto.password,
      user.password,
    );
    if (user && passwordsEqual) {
      return user;
    }
    throw new UnauthorizedException({ message: 'Incorrect email or password' });
  }
}
