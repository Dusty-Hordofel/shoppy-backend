import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { CreateUserRequest } from './dto/create-user.request';
import { PrismaService } from 'src/prisma/prisma.service';
import { User } from '@prisma/client';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(private prismaService: PrismaService) {}

  async createUser(data: CreateUserRequest): Promise<Omit<User, 'password'>> {
    console.log('🚀 ~ UsersService ~ createUser ~ data:', data);

    const hashedPassword = await bcrypt.hash(data.password, 10);

    try {
      const user = this.prismaService.user.create({
        data: { ...data, password: hashedPassword },
        select: {
          id: true,
          email: true,
        },
      });

      return user;
    } catch (error) {
      console.log('🚀 ~ UsersService ~ createUser ~ error:', error);
      if (error.code === 'P2002') {
        throw new UnprocessableEntityException('Email already exists.');
      }
      throw error;
    }
  }
}
