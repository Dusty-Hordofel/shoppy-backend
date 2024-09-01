import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { CreateUserRequest } from './dto/create-user.request';
import { PrismaService } from 'src/prisma/prisma.service';
import { User } from '@prisma/client';
import * as bcrypt from 'bcrypt';

// export type Usero = any;
@Injectable()
export class UsersService {
  constructor(private prismaService: PrismaService) {}

  private readonly users = [
    {
      userId: 1,
      username: 'john',
      password: 'changeme',
    },
    {
      userId: 2,
      username: 'maria',
      password: 'guess',
    },
  ];

  async findOne(username: string): Promise<any | undefined> {
    return this.users.find((user) => user.username === username);
  }

  async createUser(data: CreateUserRequest): Promise<Omit<User, 'password'>> {
    console.log('🚀 ~ UsersService ~ createUser ~ data:', data);
    // const hashedPassword = await bcrypt.hash(data.password, 10);

    try {
      return await this.prismaService.user.create({
        data: { ...data, password: await bcrypt.hash(data.password, 10) },
        select: {
          id: true,
          email: true,
        },
      });
    } catch (error) {
      console.log('🚀 ~ UsersService ~ createUser ~ error:', error);
      if (error.code === 'P2002') {
        throw new UnprocessableEntityException('Email already exists.');
      }
      throw error;
    }
  }
}
