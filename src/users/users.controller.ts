import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { NoFilesInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { TokenPayload } from 'src/auth/token-payload.interface';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @UseInterceptors(NoFilesInterceptor())
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.createUser(createUserDto);
  }

  @Get('me')
  @UseGuards(JwtAuthGuard)
  getMe(@CurrentUser() user: TokenPayload) {
    return user;
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Post('find')
  getUser(filter: any) {
    return this.usersService.findOne(filter);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
