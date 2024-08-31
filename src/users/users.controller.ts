import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  @Post()
  createUser(@Body() request: CreateUserDto) {
    // return ' You sent a request to the user enpoint';
    return this.usersService.createUser(request);
  }
}
