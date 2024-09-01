import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateUserRequest } from './dto/create-user.request';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  @Post()
  createUser(@Body() request: CreateUserRequest) {
    // return ' You sent a request to the user enpoint';
    return this.usersService.createUser(request);
  }
}
