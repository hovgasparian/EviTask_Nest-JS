import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/users/home')
  // getHello(): string {
  //   return this.appService.getHello();
  // }
  getUsers(): Array<any> {
    return this.appService.getUsers();
  }
}
