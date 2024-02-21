import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  // getHello(): string {
  //   return 'Hello World!';
  // }
  getUsers(): Array<any> {
    return [{ id: 1, name: 'User_1' }];
  }
}
