import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  //   public createUser() {
  //     return 'Olivier';
  //   }
  public createUser(data: CreateUserDto) {
    console.log('🚀 ~ UsersService ~ createUser ~ data:', data);
    // return data;
  }
}
